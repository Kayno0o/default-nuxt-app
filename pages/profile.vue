<script setup lang="ts">
definePageMeta({
  middleware: isGrantedMiddleware(['ROLE_USER']),
})

const { user, clear } = useUserSession()
const router = useRouter()

function logout() {
  router.push('/login')
  clear()
}
</script>

<template>
  <div v-if="user" class="text-center">
    <BaseH1>Profile</BaseH1>

    <BaseH2>Welcome {{ user.username }}.</BaseH2>

    <Click class="btn-red-4 text-dark mx-auto" @click="logout">
      Logout
    </Click>
  </div>
</template>
