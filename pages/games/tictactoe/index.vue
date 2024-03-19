<script setup>
const router = useRouter()
const room = ref('')

function randomRoom() {
  const str = randomString(8, true)
  router.push({ name: 'games-tictactoe-room', params: { room: str } })
}

function onJoin() {
  router.push({ name: 'games-tictactoe-room', params: { room: room.value } })
}
</script>

<template>
  <BaseH1>Tic Tac Toe</BaseH1>

  <form class="flex flex-wrap items-center gap-4" @submit.stop.prevent="onJoin">
    <BaseInput id="join-room-id" v-model="room" label="Room ID" />
    <BaseButton @click="onJoin">
      Join
    </BaseButton>

    <div class="flex items-center gap-4">
      OR
      <BaseButton @click="randomRoom">
        Create room
      </BaseButton>
    </div>
  </form>
</template>
