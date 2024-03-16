<script setup lang="ts">
const grid = ref([
  '  ccccc  ',
  ' scscscs ',
  'cc cccbcc',
  'cs scs sc',
  'ccccccccc',
  'cs scs sc',
  'cc ccc cc',
  ' scscscs ',
  '  ccccc  ',
].map(s => s.split('')))

const players = ref([
  { pos: [0, 0], color: '#f0f', dead: false, id: 'ac00486b6407037a6de6b3f801f7b0eae77e6c5e' },
  { pos: [0, 8], color: '#00f', dead: false, id: '' },
  { pos: [8, 0], color: '#0ff', dead: false, id: '' },
  { pos: [8, 8], color: '#fff', dead: false, id: '' },
])

interface Explosion { pos: [number, number], dir: 'h' | 'v', from: number, size: number, start: boolean, end: boolean }

const explosions = ref<Explosion[]>([
  { pos: [2, 5], dir: 'v', from: 1, size: 3, start: false, end: false },
])

const index = ref(0)

function scale(e: Explosion) {
  if (!e.start || e.end)
    return e.dir === 'h' ? 'scale-x-0' : 'scale-y-0'

  return e.dir === 'h' ? 'scale-x-100' : 'scale-y-100'
}

const user = useWsPlayer()
</script>

<template>
  <GameGrid
    :board="grid"
    class="size-full max-size-150 b-[1,light] rounded"
  >
    <template #item="{ props: itemProps, item, x, y }">
      <div v-bind="itemProps" class="size-full relative aspect-square grid">
        <div v-if="item === 'c'" class="b-[2,solid,orange] bg-orange/20 rounded m-0.5 relative around:no-content,top-1/2,left-1/2,h-0.5,-translate-x-1/2,-translate-y-1/2,round,w-140%,bg-orange,absolute,m-auto,round after:rotate-45 before:-rotate-45" />
        <div v-else-if="item === 's'" class="m-0 b-[2,solid,gray-4] rounded m-0.5 bg-gray-5" />
        <div v-else-if="item === 'b'" class="ph:circle-dashed-duotone  text-light size-full" />
        <div v-else>
          {{ item }}
        </div>

        <template v-if="x === 0 && y === 0">
          <div
            v-for="(p, i) in players"
            :key="p.color + i"
            class="absolute inset-0 size-full z-100 transition-all-500 ease-linear"
            :class="[
              p.dead ? 'scale-0' : 'scale-100',
              p.id === user.id ? 'ph:map-pin-line-fill' : 'ph:map-pin',
            ]"
            :style="[
              `color: ${p.color}`,
              `transform: translateX(${100 * p.pos[0]}%) translateY(${100 * p.pos[1]}%)`,
            ]"
          />

          <div
            v-for="(e, i) in explosions"
            :key="e.pos.join('') + i"
            class="absolute z-100 size-full"
            :class="[
              e.dir === 'v' ? 'translate-x-1/2' : 'translate-y-1/2',
            ]"
          >
            <div
              class="absolute z-100 round transition-transform-300"
              :class="[
                e.dir === 'v' ? '-translate-x-1/2' : '-translate-y-1/2',
                scale(e),
              ]"
              :style="[
                `left: ${100 * e.pos[0] + (e.dir === 'h' ? 20 : 0)}%`,
                `top: ${100 * e.pos[1] + (e.dir === 'v' ? 20 : 0)}%`,
                `width: ${e.dir === 'h' ? 100 * e.size - 40 : 40}%`,
                `height: ${e.dir === 'v' ? 100 * e.size - 40 : 40}%`,
                `transform-origin: ${e.dir === 'h' ? (100 / e.size) * e.from : 50}% ${e.dir === 'v' ? (100 / e.size) * e.from : 50}%`,
              ]"
            >
              <div class="absolute -inset-1 bg-red-6 round" />
              <div class="absolute inset-0 bg-orange-5 round" />
              <div class="absolute inset-1.5 bg-orange-3 round" />
            </div>
          </div>
        </template>
      </div>
    </template>
  </GameGrid>

  <Click class="btn-accent" @click="() => { explosions[index].start = true ; index++ }">
    boom
  </Click>
</template>
