<script setup lang="ts">
import useWsRoom from '~/composables/useWsRoom';
import type { WsTicTacToeGame } from '~/types/game';

const { data: game, send, status, user } = useWsRoom<WsTicTacToeGame>('tictactoe')

const modal = ref(false)

const message = ref('')

function sendMessage() {
  send('message', message.value)
  message.value = ''
}
</script>

<template>
  <div class="flex flex-wrap items-center justify-between mb-6">
    <template v-if="user.username">
      <GameUsername :user="user" no-you />
      <BaseInput
        id="user-color"
        :model-value="user.color"
        label="Color"
        class="w-16"
        type="color"
        @change="(e:any) => user.color = e.target.value"
      />
    </template>
  </div>

  <div v-if="status === 'OPEN' && user.username && game" class="grid w-fit mx-auto gap-6 grid-auto-rows grid-auto-cols-none md:grid-flow-col md:grid-auto-cols">
    <div class="size-full max-w-72 grow hidden lg:grid card">
      <div>
        <div class="mb-2 b-b bg-dark b-b-accent pb-3">
          Players
        </div>
        <ScrollView class="mb-auto h-80">
          <GameUsername
            v-for="(u, i) in game.users"
            :key="(u?.id + i)"
            :user="u"
            class="w-48 font-normal"
          />
        </ScrollView>
      </div>
    </div>
    <div class="size-full max-w-72 card">
      <GameTicTacToe :game="game.data" @send="send" />
    </div>
    <div class="size-full max-w-72 card">
      <div class="mb-2 b-b b-b-accent bg-dark pb-3">
        Chat
      </div>

      <ScrollView class="h-80">
        <div v-for="msg in game.messages" :key="msg.id" class="my-1 leading-5">
          <span :style="`color: ${msg.color};`" class="truncate font-bold max-w-24">
            {{ msg.username }}
          </span>
          {{ msg.content }}
        </div>
      </ScrollView>

      <form class="relative flex items-center justify-between gap-4 mt-2 b-t b-t-accent pt-3" @submit.prevent="sendMessage">
        <BaseInput
          id="message"
          v-model="message"
          label="Message"
          class="w-full"
        />
        <Click class="size-7 round bg-accent p-1" @click="sendMessage">
          <div class="size-full ph:chat-bold text-dark" />
        </Click>
      </form>
    </div>
  </div>

  <GameUserModal v-model="modal" />
</template>
