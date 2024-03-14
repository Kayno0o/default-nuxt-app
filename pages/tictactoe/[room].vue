<script setup lang="ts">
import useWsRoom from '~/composables/useWsRoom'
import type { WsTicTacToeGame } from '~/types/game'

const { data: game, send, status, user } = useWsRoom<WsTicTacToeGame>('tictactoe')

const modal = ref(false)
</script>

<template>
  <div class="flex justify-between">
    <p class="mb-4">
      Websocket status: {{ status }}
    </p>
    <div v-if="user.username" class="flex gap-4 text-right">
      <div>
        Connected as
        <GameUsername :user="user" no-you />
      </div>
      <BaseInput
        id="user-color"
        v-model="user.color"
        label="Choose a color"
        class="mt-4 w-32"
        type="color"
        @change="send('color', user.color)"
      />
    </div>
  </div>

  <div v-if="!modal">
    <GameTicTacToe v-if="game" :game="game.data" @send="send" />
  </div>

  <GameUserModal v-model="modal" />
</template>
