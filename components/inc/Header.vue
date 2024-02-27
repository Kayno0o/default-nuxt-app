<script setup lang="ts">
import ThemeToggle from '~/components/ThemeToggle.vue'
</script>

<template>
  <div class="border-b border-b-accent">
    <div class="container flex flex-wrap justify-between py-2">
      <h1 class="font-title text-lg">
        &lt;Kayno0o/default-nuxt-app
      </h1>
      <nav>
        <ul class="flex gap-4">
          <li>
            <BaseLink to="/">
              Home
            </BaseLink>
          </li>
          <li>
            <BaseLink to="/404">
              404
            </BaseLink>
          </li>
        </ul>
      </nav>
      <div class="flex gap-2">
        <ThemeToggle />

        <span class="font-bold">
          /&gt;
        </span>
      </div>
    </div>
  </div>
</template>
