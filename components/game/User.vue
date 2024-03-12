<script setup lang="ts">
import type { Player } from '~/types/game'
import { randomString } from '~/utils/textUtils'

defineProps<{
  user: Player
}>()

const uid = useCookie('uid', {
  default: () => randomString(20, true),
})
</script>

<template>
  <div class="max-w-48 truncate font-bold">
    {{ user.username }} <span v-if="uid === user.id">(you)</span>
  </div>
</template>
