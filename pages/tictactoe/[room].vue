<script setup lang="ts">
import useWsRoom from '~/composables/useWsRoom';
import type { WsTicTacToeGame } from '~/types/game';

const { data: game, send, status, user } = useWsRoom<WsTicTacToeGame>('tictactoe')

const modal = ref(false)
</script>

<template>
  <div class="flex flex-wrap justify-between">
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
        :model-value="user.color"
        label="Choose a color"
        class="mt-4 w-32"
        type="color"
        @change="(e:any) => user.color = e.target.value"
      />
    </div>
  </div>

  <BaseCard class="mx-auto mt-4 flex w-fit flex-col-reverse gap-6 md:flex-row">
    <BaseCard v-if="game" class="flex flex-col">
      <GameUsername
        v-for="u in game.users"
        :key="u.id"
        :user="u"
        class="w-48"
      />
    </BaseCard>
    <div v-if="user.username">
      <GameTicTacToe v-if="game" :game="game.data" @send="send" />
    </div>
  </BaseCard>

  <GameUserModal v-model="modal" />
</template>
