<script setup lang="ts">
import { ref } from 'vue';

const token = ref('');
const embedID = '<id of the embeddable you want to embed>';

async function fetchToken() {
  const response = await fetch('/token?embeddableId=' + embedID);
  const data: { token: string } = await response.json();
  token.value = data.token;
}

fetchToken();
</script>

<template>
  <em-beddable v-if="token" :token="token"></em-beddable>
</template>

<style scoped></style>
