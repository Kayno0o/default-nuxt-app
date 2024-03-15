<script setup lang="ts">
</script>

<template>
  <BaseH1>Games</BaseH1>

  <div class="flex flex-wrap gap-8 [&>*]:flex-auto">
    <div class="card">
      <BaseH2 class="flex items-center gap-2">
        Tic Tac Toe <div class="size-6 ph:grid-four-bold" />
      </BaseH2>

      <NuxtLink to="/games/tictactoe/" class="btn-accent flex items-center gap-2 font-bold">
        Play <div class="size-5 ph:game-controller-bold" />
      </NuxtLink>
    </div>
  </div>
</template>
