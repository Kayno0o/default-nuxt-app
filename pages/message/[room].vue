<script setup lang="ts">
import { useWebSocket } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { randomString } from '~/utils/textUtils'

const route = useRoute()
const config = useRuntimeConfig()

const token = useCookie('token', {
  default: () => randomString(40, true),
})
const uid = useCookie('uid', {
  default: () => randomString(20, true),
})
const username = useCookie('username')

const messages = ref<string[]>([])

const { status, send } = useWebSocket(
  () => `${config.public.wsUrl}/message/${route.params.room}?token=${token.value}&uid=${uid.value}`,
  {
    onMessage(ws, event) {
      messages.value.push(event.data)
    },
  },
)

const input = ref('')
const usernameInput = ref('')
const sentUsername = ref(false)

function sendUsername() {
  if (username.value && !sentUsername.value && status.value === 'OPEN') {
    send(JSON.stringify({ type: 'username', content: username.value }))
    sentUsername.value = true
  }
}

watch(username, sendUsername, { immediate: true })
watch(status, sendUsername)
</script>

<template>
  <div v-if="username">
    <p>
      Websocket status: {{ status }}
    </p>

    <BaseInput id="ws-message" v-model="input" label="message" />

    <BaseButton @click="send(input)">
      click
    </BaseButton>

    <div>
      <div v-for="(message, i) in messages" :key="i">
        {{ message }}
      </div>
    </div>
  </div>
  <div v-else>
    <BaseInput id="ws-username" v-model="usernameInput" label="username" />
    <BaseButton @click="username = usernameInput">
      Confirm
    </BaseButton>
  </div>
</template>
