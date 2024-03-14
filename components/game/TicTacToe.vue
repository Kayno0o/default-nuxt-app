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

watch([() => props.game.p1?.color], () => {
  if (wrapper.value && props.game.p1?.color)
    wrapper.value.style.setProperty('--color-p1', props.game.p1.color)
})

watch([() => props.game.p2?.color], () => {
  if (wrapper.value && props.game.p2?.color)
    wrapper.value.style.setProperty('--color-p2', props.game.p2.color)
})
</script>

<template>
  <div ref="wrapper" class="grid gap-4">
    <div class="grid grid-cols-2">
      <div v-for="i in 2" :key="i">
        Player {{ i }}:
        <div v-if="game[`p${i}`]" class="grid items-center gap-2">
          <GameUsername :user="game[`p${i}`]" />
          <BaseButton v-if="game[`p${i}`].id === player.id" @click="emit('send', 'quit', i)">
            Quit
          </BaseButton>
        </div>
        <div v-else-if="game.p1?.id !== player.id && game.p2?.id !== player.id">
          <BaseButton @click="emit('send', 'join', i)">
            Join
          </BaseButton>
        </div>
      </div>
    </div>

    <div class="grid aspect-square size-fit grid-cols-3 gap-1">
      <div v-for="(row, x) in game.board" :key="x" class="grid size-fit grid-rows-3 gap-1">
        <div
          v-for="(item, y) in row"
          :key="y"
          :data-ttt="item"
          @click="emit('send', 'click', [y, x])"
        />
      </div>
    </div>

    <div class="text-center font-black">
      {{ texts[game.state] }}

      <BaseButton
        v-if="(game.p1?.id === player.id || game.p2?.id === player.id) && game.state !== 'pending'"
        @click="emit('send', 'restart')"
      >
        Restart game
      </BaseButton>
    </div>
  </div>
</template>

<style scoped>
[data-ttt] {
  @apply size-16 border rounded-md relative;
}

[data-ttt]::before, [data-ttt]::after {
  content: '';
  @apply absolute inset-0 border-0 border-white m-auto size-2 bg-white rounded-full;
  @apply transition-all duration-500;
}

[data-ttt="1"]::before, [data-ttt="1"]::after {
  @apply bg-transparent border-8 size-10 border-[var(--color-p1)];
}

[data-ttt="2"]::before {
  @apply w-10 rotate-45 bg-[var(--color-p2)];
}

[data-ttt="2"]::after {
  @apply w-10 -rotate-45 bg-[var(--color-p2)];
}
</style>
