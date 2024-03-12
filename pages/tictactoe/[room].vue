<script setup lang="ts">
import { useWebSocket } from '@vueuse/core'
import { useRoute } from 'vue-router'
import type { TicTacToeGame } from '~/types/game'
import { randomString } from '~/utils/textUtils'

const route = useRoute()
const token = useCookie('token', {
  default: () => randomString(40, true),
})
const uid = useCookie('uid', {
  default: () => randomString(20, true),
})
const username = useCookie('username')

const game = ref<TicTacToeGame>()

const { status, send } = useWebSocket(
  () => `ws://localhost:13000/ws/tictactoe/${route.params.room}?token=${token.value}&uid=${uid.value}`,
  {
    onMessage(ws, event) {
      game.value = JSON.parse(event.data)
    },
  },
)

const usernameInput = ref('')
const sentUsername = ref(false)

function sendUsername() {
  if (username.value && !sentUsername.value) {
    send(JSON.stringify({ type: 'username', content: username.value }))
    sentUsername.value = true
  }
}

function onSend(type: string, val: any) {
  send(JSON.stringify({ type, content: JSON.stringify(val) }))
}

watch(username, sendUsername, { immediate: true })
</script>

<template>
  <div v-if="username">
    <p>
      Websocket status: {{ status }}
    </p>

    <GameTicTacToe v-if="game" :game="game" @send="onSend" />
  </div>
  <div v-else>
    <BaseInput id="ws-username" v-model="usernameInput" label="username" />
    <BaseButton @click="username = usernameInput">
      Confirm
    </BaseButton>
  </div>
</template>
