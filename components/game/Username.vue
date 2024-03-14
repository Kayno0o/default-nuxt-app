<script setup lang="ts">
import useWsPlayer from '~/composables/useWsPlayer'
import type { Player } from '~/types/game'

const props = defineProps<{
  user: Player
  noYou?: boolean
}>()

const player = useWsPlayer()

const displayUser = computed(() => {
  if (player.value.id === props.user.id)
    return player.value
  return props.user
})
</script>

<template>
  <div class="max-w-48 truncate font-bold" :style="`color: ${displayUser.color};`">
    {{ displayUser.username }} <span v-if="player.id === user.id && !noYou">(you)</span>
  </div>
</template>
