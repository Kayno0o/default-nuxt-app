<script setup lang="ts">
const { addToast } = useToast()

const rules = getRules()

const loading = ref(false)
const credentials = ref({
  email: '',
  password: '',
  repeatPassword: '',
  username: '',
})

async function register() {
  await $api('/api/user/register', {
    method: 'POST',
    body: {
      email: credentials.value.email,
      password: credentials.value.password,
    },
  }, {
    loading,
    onSuccess() {
      addToast('Registered successfully ! You can now login to your account.', 'success')
      navigateTo({ path: '/login' }, { external: true })
    },
    onError: (e, res) => {
      addToast(res._data.error, 'error')
    },
  })
}
</script>

<template>
  <div class="card py-4 mx-auto max-w-xl">
    <BaseH1 class="text-center">
      Register
    </BaseH1>
    <form class="grid gap-6 mt-12 max-w-sm mx-auto" @submit.prevent="register">
      <BaseInput
        id="username"
        v-model="credentials.username"
        autocomplete="username"
        label="Username"
      />
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
      <BaseInput
        id="repeat-password"
        v-model="credentials.repeatPassword"
        autocomplete="new-password"
        :rules="[(value: string) => value !== credentials.password && 'Incorrect password']"
        type="password"
        label="Confirm Password"
      />

      <div class="mx-auto flex gap-4">
        <Click is="button" type="submit" class="btn-accent">
          Register
        </Click>
        <BaseLink to="/login">
          Login
        </BaseLink>
      </div>
    </form>
  </div>
</template>
