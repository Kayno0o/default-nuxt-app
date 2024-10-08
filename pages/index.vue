<script setup lang="ts">
import { getRandomElement } from '@kaynooo/utils'

const { addToast } = useToasts()

const input = ref('')
</script>

<template>
  <div class="flex items-center gap-4">
    Lorem ipsum.
    <BaseInput id="input" v-model="input" label="Nice label" />

    <div class="flex flex-col items-center gap-2 card">
      Simple card
      <Click class="btn-accent" @click="addToast('test', getRandomElement(['success', 'warning', 'error']))">
        Toast
      </Click>
    </div>
  </div>
</template>
