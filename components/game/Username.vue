<script setup lang="ts">
import useWsPlayer from '~/composables/useWsPlayer'
import type { Player } from '~/types/game'

defineProps<{
  user: Player
  noYou?: boolean
}>()

const curr = useWsPlayer()
</script>

<template>
  <div class="font-bold max-w-48 truncate" :style="`color: ${user.color};`">
    {{ user.username }} <span v-if="curr.id === user.id && !noYou">(you)</span>
  </div>
</template>
