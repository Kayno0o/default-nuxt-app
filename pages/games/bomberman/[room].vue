<script setup lang="ts">
import type { UseDrawKeysAndArgs } from '~/composables/useCanvasObject';
import type { Player } from '~/types/game';
import type { RecursivePartial } from '~/types/types';
import removeObjectByKey from '~/utils/removeObjectByKey';

interface Position {
  x: number
  y: number
}

interface Explosion {
  pos: Position
  dir: 'h' | 'v'
  from: number
  size: number
  start: boolean
  end: boolean
}

interface Bomb {
  pos: Position
}

interface WsBombermanGame {
  board: number[][]
  players: ({ pos: Position, speed: number, dead: boolean } & Player)[]
  bombs: Bomb[]
  explosions: Explosion[]
}

const { data: bomberman, send, status, user, onUpdate: onWsUpdate } = useWsRoom<WsBombermanGame>('bomberman')

const game = ref<HTMLCanvasElement>()

const { draw, loop, onKeyDown, onKeyUp, keys } = useCanvas(game)
const { objects, drawObjects, set: setObject, get: getObject, addAnimations } = useCanvasObject(draw)

const [height, width] = [600, 600]

const direction = ref<'up' | 'down' | 'left' | 'right' | null>(null)

function getDirection() {
  const previousValue = direction.value
  try {
    const entries = [...keys.value.values()].reverse()
    for (const i in entries) {
      const key = entries[i]
      switch (key) {
        case 'ArrowUp':
        case 'w':
        case 'z':
          direction.value = 'up'
          return
        case 'ArrowRight':
        case 'd':
          direction.value = 'right'
          return
        case 'ArrowDown':
        case 's':
          direction.value = 'down'
          return
        case 'ArrowLeft':
        case 'a':
        case 'q':
          direction.value = 'left'
          return
      }
    }
    direction.value = null
  }
  finally {
    if (previousValue !== direction.value)
      send('direction', direction.value)
  }
}

const image = ref<HTMLImageElement>()
onMounted(() => {
  image.value = new Image()
  image.value.src = '/assets/blue_slime.png'
})

onWsUpdate(() => {
  if (!bomberman.value.data?.board)
    return

  const data = bomberman.value.data
  const [sx, sy] = [height / data.board.length, width / data.board[0].length]

  data.board.forEach((col, x) => {
    col.forEach((item, y) => {
      let color = 'transparent'

      if (item === 1)
        color = 'gray'
      if (item === 2)
        color = 'orange'

      setObject(`${x}-${y}`, {
        props: {
          height: sx,
          width: sy,
          pos: [x * sx, y * sy],
          fillColor: color,
        },
        animations: [],
        type: 'rect',
      })
    })
  })

  removeObjectByKey(objects.value, key => key.startsWith('bomb-'))

  data.bombs.forEach((b) => {
    setObject(`bomb-${b.pos.x}-${b.pos.y}`, {
      type: 'rect',
      animations: [],
      props: {
        height: sx,
        width: sx,
        pos: [b.pos.x * sx, b.pos.y * sy],
        fillColor: 'black',
      },
    })
  })

  data.players.forEach((p) => {
    const key = `player-${p.id}`
    const obj = getObject<'image'>(key)
    if (obj) {
      if (obj.props.pos[0] !== p.pos.x * sx || obj.props.pos[1] !== p.pos.y * sy) {
        addAnimations<'image'>(key, {
          frames: generateFrames<Partial<UseDrawKeysAndArgs['image']>>({
            pos: obj.props.pos,
          }, {
            pos: [p.pos.x * sx, p.pos.y * sy],
          }, 5),
          background: true,
          duration: p.speed,
          type: 'edit',
          order: 0,
          startedAt: Date.now(),
        })
      }
    }
    else {
      if (image.value) {
        const frames: RecursivePartial<UseDrawKeysAndArgs['image']>[] = [
          { crop: { start: [0, 0] } },
          { crop: { start: [160, 0] } },
        ]
        setObject(key, {
          type: 'image',
          animations: [{
            frames,
            background: true,
            duration: 400,
            type: 'infinite',
            order: 1,
            startedAt: Date.now(),
          }],
          props: {
            image: upscaleImage(image.value, 10),
            height: sx,
            width: sx,
            crop: {
              size: [160, 160],
              start: [0, 0],
            },
            pos: [p.pos.x * sx, p.pos.y * sy],
          },
        })
      }
    }
  })
})

loop((secPercent: number, width: number, height: number) => {
  draw.rect({
    height,
    width,
    pos: [0, 0],
    fillColor: [34, 34, 34],
    strokeColor: 'white',
    weight: 1,
  })

  drawObjects()
})

onKeyDown((key: string, isNew: boolean) => {
  if (key === ' ')
    send('bomb')
  if (!isNew)
    return

  getDirection()
})

onKeyUp(() => {
  getDirection()
})

onMounted(() => {
  useEventListener(document, 'keyup', (e) => {
    keys.value.delete(e.key)
  })

  useEventListener(document, 'keydown', (e) => {
    if (keys.value.has(e.key))
      return

    keys.value.add(e.key)
    getDirection()

    if (e.key === ' ')
      send('bomb')
  })
})
</script>

<template>
  Status: {{ status }} - {{ direction }}

  <canvas
    ref="game"
    :width="width"
    :height="height"
    class="mx-auto"
    style="image-rendering: pixelated; image-rendering: crisp-edges;"
  />

  <Click class="btn-accent" @click="() => send('join')">
    join
  </Click>
</template>~/composables/useGenerateCanvasAnimation~/composables/generateFrames
