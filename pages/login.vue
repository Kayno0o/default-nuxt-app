<script setup lang="ts">
const { addToast } = useToast()

const rules = getRules()

const loading = ref(false)
const credentials = ref({
  email: '',
  password: '',
})

async function login() {
  await $api('/api/auth/login', {
    method: 'POST',
    body: {
      email: credentials.value.email,
      password: credentials.value.password,
    },
  }, {
    loading,
    onSuccess() {
      navigateTo({ path: '/profile' }, { external: true })
    },
    onError: (e, res) => {
      addToast(res._data.error, 'error')
    },
  })
}
</script>

<template>
  <div class="mx-auto max-w-xl py-4 card">
    <BaseH1 class="text-center">
      Login
    </BaseH1>
    <form class="grid mx-auto mt-12 max-w-sm gap-6" @submit.prevent="login">
      <BaseInput
        id="email"
        v-model="credentials.email"
        autocomplete="email"
        :rules="['email']"
        label="Email"
      />
      <BaseInput
        id="password"
        v-model="credentials.password"
        autocomplete="new-password"
        :rules="[rules.minLength(8)]"
        type="password"
        label="Password"
      />

      <div class="mx-auto flex gap-4">
        <Click is="button" type="submit" class="btn-accent">
          Login
        </Click>
        <BaseLink to="/register">
          Register
        </BaseLink>
      </div>
    </form>
  </div>
</template>
