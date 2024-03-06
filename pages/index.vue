<script setup lang="ts">
import useToast from '~/composables/useToast'
import getRandom from '~/utils/getRandom'

const { addToast } = useToast()
</script>

<template>
  <BaseH1>Welcome to my portfolio</BaseH1>
  <BaseH2>Welcome to my portfolio</BaseH2>
  <BaseH3>Welcome to my portfolio</BaseH3>
  <BaseH4>Welcome to my portfolio</BaseH4>

  <BaseCard class="flex w-fit flex-col items-center gap-2">
    Simple card
    <BaseButton @click="addToast('test', getRandom(['success', 'warning', 'error']))">
      Toast
    </BaseButton>
  </BaseCard>
</template>
