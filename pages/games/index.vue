<script setup lang="ts">
</script>

<template>
  <BaseH1>Games</BaseH1>

  <div class="flex flex-wrap gap-8 [&>*]:flex-auto">
    <BaseCard>
      <BaseH2 class="flex items-center gap-2">
        Tic Tac Toe <div class="i-ph-grid-four-bold size-6" />
      </BaseH2>

      <BaseButton to="/games/tictactoe/" class="flex items-center gap-2 font-bold">
        Play <div class="i-ph-game-controller-bold size-5" />
      </BaseButton>
    </BaseCard>
  </div>
</template>
