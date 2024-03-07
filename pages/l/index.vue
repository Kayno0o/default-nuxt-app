<script setup lang="ts">
definePageMeta({
  layout: 'empty',
})
</script>

<template>
  <LinkPage
    title="Kevyn Fyleyssant"
    profile-src="/lt/profile.webp"
    wallpaper-src="bg-[url('/lt/wallpaper.webp')]"
    :icons="[
      { href: 'https://instagram.com/kevy.n', icon: 'i-ri-instagram-fill', label: 'Instagram' },
      { href: 'https://open.spotify.com/user/8fd163ej8oxnv15eryot9m2x7', icon: 'i-ri-spotify-fill', label: 'Spotify' },
      { href: 'https://www.reddit.com/user/Kaynooo_', icon: 'i-ri-reddit-fill', label: 'Reddit' },
      { href: 'https://www.linkedin.com/in/k%C3%A9vyn-fyleyssant-3947ba1b7/', icon: 'i-ri-linkedin-fill', label: 'Linkedin' },
      { href: 'mailto:kevyn.fyleyssant@gmail.com', icon: 'i-ph-envelope-simple-bold', label: 'Email' },
      { href: 'https://www.tiktok.com/@kaynooo_', icon: 'i-ri-tiktok-fill', label: 'Tiktok' },
    ]"
    :links="[
      {
        text: 'Instagram',
        class: 'bg-gradient-to-br from-blue-100 to-pink-200',
        href: 'https://instagram.com/kevy.n',
        icon: { color: 'bg-black', icon: 'i-ri-instagram-line' },
      },
      {
        text: 'Spotify',
        class: 'bg-gradient-to-br from-white to-green-100',
        href: 'https://open.spotify.com/user/8fd163ej8oxnv15eryot9m2x7',
        icon: { color: 'bg-[#1DB954]', icon: 'i-ri-spotify-fill' },
      },
      {
        text: 'Reddit',
        class: 'bg-gradient-to-br from-orange-100 to-white',
        href: 'https://www.reddit.com/user/Kaynooo_',
        icon: { color: 'bg-[#FF4500]', icon: 'i-ri-reddit-fill' },
      },
      {
        text: 'Youtube',
        class: 'bg-gradient-to-br from-red-100 to-white',
        href: 'https://www.youtube.com/channel/UC4A28B66oMFK5IhLW4ropUg',
        icon: { color: 'bg-[#FF0000]', icon: 'i-ri-youtube-fill' },
      },
      {
        text: 'Stats.fm',
        class: 'bg-gradient-to-br from-green-100 to-white',
        href: 'https://stats.fm/kaynooo',
        icon: { color: 'bg-[#1ED760]', icon: 'i-ph-chart-bar-fill' },
      },
      {
        text: 'Wallpaper Author',
        class: 'my-auto bg-gradient-to-br from-white to-teal-100',
        href: 'https://www.deviantart.com/ethemos',
        icon: { color: 'bg-[#00E59B]', icon: 'i-ph-palette-fill' },
      },
    ]"
  />
</template>
