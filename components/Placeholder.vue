<script setup lang="ts">
const props = defineProps<{
  width: number
  height: number
  format?: 'png' | 'svg' | 'jpg' | 'webp' | 'jpeg' | 'mp4'
  color?: string
  backgroundColor?: string
  text?: string
  font?: 'lato' | 'lora' | 'montserrat' | 'open sans' | 'oswald' | 'playfair display' | 'pt sans' | 'raleway' | 'roboto' | 'source sans pro'
}>()

const url = computed(() => {
  const query: any = {}
  if (props.text)
    query.text = encodeURI(props.text.replaceAll(' ', '+').replaceAll('\n', '\\n'))
  if (props.font)
    query.font = encodeURI(props.font)
  const queryString = query ? `?${Object.entries(query).map(e => `${e[0]}=${e[1]}`).join('&')}` : ''

  const path = [props.format, props.color, props.backgroundColor].filter(v => !!v).join('/')

  return `https://placehold.co/${props.width}x${props.height}${path ? `/${path}` : ''}${queryString}`
})
</script>

<template>
  <img :src="url" alt="placeholder">
</template>
