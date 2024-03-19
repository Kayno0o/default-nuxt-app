<script setup lang="ts">
import type { Player } from '~/types/game';

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

const { data: bomberman, send, status, user } = useWsRoom<WsBombermanGame>('bomberman')

function scale(e: Explosion) {
  if (!e.start || e.end)
    return e.dir === 'h' ? 'scale-x-0' : 'scale-y-0'

  return e.dir === 'h' ? 'scale-x-100' : 'scale-y-100'
}

const keys = ref(new Set<string>())
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

onMounted(() => {
  useEventListener(document, 'keyup', (e) => {
    if (!keys.value.has(e.key))
      return

    keys.value.delete(e.key)
    getDirection()
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
  Status: {{ status }}

  <GameGrid
    v-if="bomberman.data?.board"
    :board="bomberman.data.board"
    class="size-full max-size-150 b-[1,light] rounded mx-auto"
  >
    <template #item="{ props: itemProps, item, x, y }">
      <div v-bind="itemProps" class="size-full relative aspect-square grid">
        <svg
          v-if="item === 2"
          class="absolute inset-0"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="10"
            y="10"
            width="80"
            height="80"
            rx="10"
            ry="10"
            stroke-width="2"
            stroke="rgba(251, 146, 60, 1)"
            fill="rgba(251, 146, 60, 0.2)"
          />
          <rect
            x="-3"
            y="50"
            width="106"
            height="1"
            transform="rotate(-45 50 50)"
            fill="rgba(251, 146, 60, 1)"
          />
          <rect
            x="-3"
            y="50"
            width="106"
            height="1"
            transform="rotate(45 50 50)"
            fill="rgba(251, 146, 60, 1)"
          />
        </svg>
        <div v-else-if="item === 1" class="absolute inset-0 m-0.5 b-[2,solid,gray-4] rounded bg-gray-5" />
        <div v-else-if="item === 3" class="absolute inset-0 ph:train size-full m-0.5 text-blue-2" />
        <div v-else-if="item === 4" class="absolute inset-0 ph:plus-circle-duotone size-full m-0.5 text-green-2" />
        <div v-else-if="item === 5" class="absolute inset-0 ph:flame size-full m-0.5 text-red-2" />

        <template v-if="x === 0 && y === 0">
          <div
            v-for="(bomb, i) in bomberman.data.bombs"
            :key="`bomb-${i}`"
            class="absolute inset-0 ph:circle-dashed-duotone size-full"
            :style="[
              `transform: translateX(${bomb.pos.x * 100}%) translateY(${bomb.pos.y * 100}%)`,
            ]"
          />

          <div
            v-for="(e, ei) in bomberman.data.explosions"
            :key="`${e.pos.x}-${e.pos.y}-${ei}`"
            class="absolute z-100 size-full top-0"
            :class="[
              e.dir === 'v' ? 'translate-x-1/2' : 'translate-y-1/2',
            ]"
          >
            <div
              class="absolute z-100 round transition-transform-300 z-0"
              :class="[
                e.dir === 'v' ? '-translate-x-1/2' : '-translate-y-1/2',
                scale(e),
              ]"
              :style="[
                `left: ${100 * e.pos.x + (e.dir === 'h' ? 20 : 0)}%`,
                `top: ${100 * e.pos.y + (e.dir === 'v' ? 20 : 0)}%`,
                `width: ${e.dir === 'h' ? 100 * e.size - 40 : 40}%`,
                `height: ${e.dir === 'v' ? 100 * e.size - 40 : 40}%`,
                `transform-origin: ${e.dir === 'h' ? (100 / (e.size - 1)) * e.from : 50}% ${e.dir === 'v' ? (100 / (e.size - 1)) * e.from : 50}%`,
              ]"
            >
              <div class="absolute -inset-1 bg-red-6 round" />
              <div class="absolute z-10 inset-0 bg-orange-5 round" />
              <div class="absolute z-20 inset-1.5 bg-orange-3 round" />
            </div>
          </div>

          <div
            v-for="(p, i) in bomberman.data.players"
            :key="p.id + i"
            class="absolute inset-0 size-full z-100 transition-all ease-linear"
            :class="[
              p.id === user.id ? 'ph:map-pin-line-fill' : 'ph:map-pin',
            ]"
            :style="[
              `color: ${p.color}`,
              `transform: translateX(${100 * p.pos.x}%) translateY(${100 * p.pos.y}%) scale(${p.dead ? 0 : 100}%)`,
              `transition-duration: ${Number(p.speed) + 25}ms`,
            ]"
          />
        </template>
      </div>
    </template>
  </GameGrid>

  <Click class="btn-accent" @click="() => send('join')">
    join
  </Click>
</template>
