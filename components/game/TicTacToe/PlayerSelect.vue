<script setup lang="ts">
import type { Player } from '~/types/game'
import { randomString } from '~/utils/textUtils'

defineProps<{
  num: number
  user?: Player
}>()

const emit = defineEmits<{
  (e: 'join'): void
  (e: 'quit'): void
}>()

const uid = useCookie('uid', {
  default: () => randomString(20, true),
})
</script>

<template>
  <div class="flex items-center gap-2">
    Player {{ num }}:
    <div v-if="user" class="flex items-center gap-2">
      <GameUser :user="user" />
      <BaseButton v-if="user.id === uid" @click="emit('quit')">
        Quit
      </BaseButton>
    </div>
    <div v-else>
      <BaseButton @click="emit('join')">
        Join
      </BaseButton>
    </div>
  </div>
</template>
