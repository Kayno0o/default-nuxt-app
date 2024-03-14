<script setup lang="ts">
import useWsPlayer from '~/composables/useWsPlayer'

const user = useWsPlayer()

const modal = defineModel({ default: () => false })
const usernameRef = ref('')

function onClose() {
  if (!usernameRef.value)
    return

  modal.value = false
  user.value.username = usernameRef.value
}
</script>

<template>
  <Modal :model-value="!user.username" persistent>
    <form class="flex flex-col items-center gap-4" @submit.stop.prevent="onClose">
      <BaseH3>Choose a username</BaseH3>
      <BaseInput id="ws-username" v-model="usernameRef" label="username" />
      <BaseButton type="submit" @click="onClose">
        Confirm
      </BaseButton>
    </form>
  </Modal>
</template>
