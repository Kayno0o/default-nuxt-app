<script setup lang="ts">
import type { TicTacToeGame, TicTacToeState } from '~/types/game'

defineProps<{
  game: TicTacToeGame
}>()

const emit = defineEmits<{
  (e: 'send', type: string, value: any): void
}>()

const texts: { [key in TicTacToeState]: string } = {
  pending: '',
  tie: 'It\'s a tie !',
  p1: 'Player 1 won',
  p2: 'Player 2 won',
}
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <div class="grid grid-cols-[1fr_1fr] gap-8">
      <div class="flex items-center gap-2">
        Player 1:
        <GameUser v-if="game.p1" :user="game.p1" />
        <div v-else>
          <BaseButton @click="emit('send', 'join', 1)">
            Join
          </BaseButton>
        </div>
      </div>
      <div class="flex items-center gap-2">
        Player 2:
        <GameUser v-if="game.p2" :user="game.p2" />
        <div v-else>
          <BaseButton @click="emit('send', 'join', 2)">
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

    {{ texts[game.state] }}
  </div>
</template>

<style scoped>
[data-ttt]{
  @apply size-16 border rounded-md relative;
}

[data-ttt]::before, [data-ttt]::after {
  content: '';
  @apply absolute inset-0 border-0 border-white m-auto size-2 bg-white rounded-full;
  @apply transition-all duration-500;
}

[data-ttt="1"]::before, [data-ttt="1"]::after {
  @apply bg-transparent border-8 size-10;
}

[data-ttt="2"]::before {
  @apply w-10 rotate-45;
}

[data-ttt="2"]::after {
  @apply w-10 -rotate-45;
}
</style>
