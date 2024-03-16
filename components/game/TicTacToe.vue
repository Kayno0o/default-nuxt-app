<script setup lang="ts">
import useWsPlayer from '~/composables/useWsPlayer';
import type { TicTacToeState, WsTicTacToeGame } from '~/types/game';

const props = defineProps<{
  game: WsTicTacToeGame
}>()

const emit = defineEmits<{
  (e: 'send', type: string, value?: any): void
}>()

const wrapper = ref<HTMLDivElement>()

const texts = computed<{ [key in TicTacToeState]: string }>(() => ({
  pending: `Player ${props.game.currentPlayer} turn`,
  tie: 'It\'s a tie !',
  p1: 'Player 1 won',
  p2: 'Player 2 won',
}))

const player = useWsPlayer()
</script>

<template>
  <div
    ref="wrapper"
    class="grid h-fit w-full place-items-center gap-4 max-w-72 px-2"
    :style="[
      `--color-p1: ${props.game.p1?.color}`,
      `--color-p2: ${props.game.p2?.color}`,
    ]"
  >
    <div
      v-for="(p, i) in [props.game.p1, props.game.p2]"
      :key="i"
      class="grid w-full items-center gap-2 h-7 grid-flow-col justify-between"
    >
      P{{ i + 1 }}:
      <template v-if="p">
        <GameUsername :user="p" />
        <BaseButton v-if="p.id === player.id" class="ml-auto" @click="emit('send', 'quit', i)">
          Quit
        </BaseButton>
      </template>
      <BaseButton
        v-else-if="game.p1?.id !== player.id && game.p2?.id !== player.id"
        class="ml-auto"
        @click="emit('send', 'join', i + 1)"
      >
        Join
      </BaseButton>
    </div>

    <div class="grid gap-1 aspect-square size-full max-w-72 max-h-72" :style="`grid-template-columns: repeat(${game.board.length}, minmax(0, 1fr));`">
      <div
        v-for="(row, x) in game.board"
        :key="x"
        class="grid size-full gap-1"
        :style="`grid-template-rows: repeat(${game.board.length}, minmax(0, 1fr));`"
      >
        <div
          v-for="(item, y) in row"
          :key="y"
          class="size-full relative p-0.5 b-[1,light] rounded"
          @click="emit('send', 'click', [y, x])"
        >
          <div
            class="absolute inset-0 ph:x-bold size-full bg--color-p1 transition-transform-300"
            :class="item === 1 ? 'scale-100' : 'scale-0'"
          />
          <div
            class="absolute inset-0 ph:circle size-full bg--color-p2 transition-transform-300"
            :class="item === 2 ? 'scale-100' : 'scale-0'"
          />
        </div>
      </div>
    </div>

    <div class="font-black text-center">
      <p>{{ texts[game.state] }}</p>

      <BaseButton
        v-if="(game.p1?.id === player.id || game.p2?.id === player.id) && game.state !== 'pending'"
        class="mt-3"
        @click="emit('send', 'restart')"
      >
        Restart game
      </BaseButton>
    </div>
  </div>
</template>
