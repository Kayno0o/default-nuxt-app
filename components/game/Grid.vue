<script setup generic="T = any" lang="ts">
defineProps<{
  board: T[][]
  rowclass?: string
}>()

defineSlots<{
  item: (props: { props: any, x: number, y: number, item: T }) => void
}>()
</script>

<template>
  <div class="grid aspect-square" :class="$props.class" :style="`grid-template-columns: repeat(${board.length}, minmax(0, 1fr));`">
    <div
      v-for="(row, x) in board"
      :key="x"
      class="grid size-full"
      :class="rowclass"
      :style="`grid-template-rows: repeat(${board.length}, minmax(0, 1fr));`"
    >
      <slot
        v-for="(item, y) in row"
        name="item"
        :props="{ key: y }"
        :item="item"
        :x="x"
        :y="y"
      />
    </div>
  </div>
</template>
