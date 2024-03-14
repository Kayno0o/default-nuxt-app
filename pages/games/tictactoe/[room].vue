<script setup lang="ts">
import useWsRoom from '~/composables/useWsRoom'
import type { WsTicTacToeGame } from '~/types/game'

const { data: game, send, status, user } = useWsRoom<WsTicTacToeGame>('tictactoe')

const modal = ref(false)

const message = ref('')

function sendMessage() {
  send('message', message.value)
  message.value = ''
}
</script>

<template>
  <div class="mb-6 flex flex-wrap items-center justify-between">
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

  <div v-if="status === 'OPEN' && user.username && game" class="mx-auto grid w-fit gap-6 grid-auto-rows grid-auto-columns-none md:grid-flow-col md:grid-auto-columns">
    <BaseCard class="hidden size-full max-w-72 grow lg:grid">
      <div>
        <div class="mb-2 border-b border-b-accent bg-dark pb-3">
          Players
        </div>
        <ScrollView class="mb-auto h-80">
          <GameUsername
            v-for="u in game.users"
            :key="u.id"
            :user="u"
            class="w-48 font-normal"
          />
        </ScrollView>
      </div>
    </BaseCard>
    <BaseCard class="size-full max-w-72">
      <GameTicTacToe :game="game.data" @send="send" />
    </BaseCard>
    <BaseCard class="size-full max-w-72">
      <div class="mb-2 border-b border-b-accent bg-dark pb-3">
        Chat
      </div>

      <ScrollView class="h-80">
        <div v-for="msg in game.messages" :key="msg.id" class="my-1 leading-5">
          <span :style="`color: ${msg.color};`" class="max-w-24 truncate font-bold">
            {{ msg.username }}
          </span>
          {{ msg.content }}
        </div>
      </ScrollView>

      <form class="relative mt-2 flex items-center justify-between gap-4 border-t border-t-accent pt-3" @submit.prevent="sendMessage">
        <BaseInput
          id="message"
          v-model="message"
          label="Message"
          class="w-full"
        />
        <Click class="size-7 rounded-full bg-accent p-1" @click="sendMessage">
          <div class="i-ph-chat-bold size-full text-dark" />
        </Click>
      </form>
    </BaseCard>
  </div>

  <GameUserModal v-model="modal" />
</template>
