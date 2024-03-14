import { useWebSocket } from '@vueuse/core'
import useWsPlayer from '~/composables/useWsPlayer'
import type { WsRoom } from '~/types/game'

interface WsEvent {
  type: 'update' | 'request' | 'push' | 'remove' | 'update-user'
  path: string
  content: any
}

export default function useWsRoom<U, T extends WsRoom<U> = WsRoom<U>>(
  name: string,
  onMessage?: (ws: WebSocket, event: MessageEvent<any>) => void,
) {
  const route = useRoute()
  const config = useRuntimeConfig()

  const room = ref<T>()
  const user = useWsPlayer()

  const { resume, pause } = useIntervalFn(() => send('heartbeat', 'ping'), 10000, { immediate: false })

  const { status, send: sendData, open } = useWebSocket(
    () => `${config.public.wsUrl}/${name}/${route.params.room}?token=${user.value.token}&uid=${user.value.id}`,
    {
      onMessage(ws, event) {
        const data: WsEvent = JSON.parse(event.data)
        switch (data.type) {
          case 'update':
          case 'push':
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
            if (typeof onMessage === 'function')
              onMessage(ws, event)

            break
        }
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
        if (type === 'update')
          obj[parts[i]] = content
        else if (type === 'push')
          obj[parts[i]].push(content)
      }
    }
  }

  onMounted(open)

  return { data: room, update, user, send, status }
}
