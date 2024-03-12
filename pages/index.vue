<script setup lang="ts">
import useToast from '~/composables/useToast'
import getRandom from '~/utils/getRandom'

const { addToast } = useToast()

const input = ref('')
</script>

<template>
  <div class="flex items-center gap-4">
    Lorem ipsum.
    <BaseInput id="input" v-model="input" label="Nice label" />

    <BaseCard class="flex flex-col items-center gap-2">
      Simple card
      <BaseButton @click="addToast('test', getRandom(['success', 'warning', 'error']))">
        Toast
      </BaseButton>
    </BaseCard>
  </div>
</template>
