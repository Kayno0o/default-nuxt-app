import { useWebSocket } from '@vueuse/core'
import useWsPlayer from '~/composables/useWsPlayer'
import type { WsRoom } from '~/types/game'

interface WsEvent {
  type: 'update' | 'request' | 'push' | 'remove' | 'update-user' | 'delete'
  path: string
  content: any
}

export default function useWsRoom<U extends object>(name: string) {
  const route = useRoute()
  const config = useRuntimeConfig()

  const room = ref<WsRoom<U>>({ users: [], data: {} as any, messages: [] })
  const user = useWsPlayer()

  const { resume, pause } = useIntervalFn(() => send('heartbeat', 'ping'), 30000, { immediate: false })

  function handleData(data: WsEvent) {
    switch (data.type) {
      case 'update':
      case 'push':
      case 'delete':
        if (data.path === 'user') {
          if (data.content.username)
            user.value.username = data.content.username
          if (data.content.color)
            user.value.color = data.content.color

          break
        }
        update(data)
        break
      case 'request':
        switch (data.path) {
          case 'user':
            send('user', { username: user.value.username, color: user.value.color })
            break
        }
        break
      default:
        console.log('Unknown data:', data)
        break
    }
  }

  const { status, send: sendData, open } = useWebSocket(
    () => `${config.public.wsUrl}/${name}/${route.params.room}?token=${user.value.token}&uid=${user.value.id}`,
    {
      onMessage(ws, event) {
        const data: WsEvent | WsEvent[] = JSON.parse(event.data)
        if (Array.isArray(data))
          data.forEach(handleData)

        else handleData(data)
      },
      onConnected() {
        resume()
      },
      onError() {
        pause()
      },
      autoReconnect: true,
      immediate: false,
    },
  )

  function send(type: string, val?: any) {
    sendData(JSON.stringify({ type, content: typeof val === 'string' ? val : JSON.stringify(val) }))
  }

  function update({ type, path, content }: WsEvent) {
    if (path === '*')
      return room.value = content

    const parts = path.split('.')
    let obj: any = room.value
    for (let max = parts.length, i = 0; i < max; i++) {
      if (i !== max - 1) {
        obj = obj[parts[i]]
      }
      else {
        const part = parts[i]
        if (type === 'update') {
          obj[part] = content
        }
        else if (type === 'push') {
          obj[part].push(content)
        }
        else if (type === 'delete') {
          if (Array.isArray(obj) && !Number.isNaN(Number(part)))
            obj.splice(Number(part), 1)
          else delete obj[part]
        }
      }
    }
  }

  onMounted(open)
  watch([user, () => user.value.color, () => user.value.username], () => {
    send('user', {
      color: user.value.color,
      username: user.value.username,
    })
  })

  return { data: room, update, user, send, status }
}
