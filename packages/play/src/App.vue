<script setup lang="ts">
import { ErButton } from 'boy-element';

function confirm() {
  console.log('confirm');
}

function cancel() {
  console.log('cancel');
}
</script>

<template>
  <er-popconfirm title="确定删除吗？" @confirm="confirm" @cancel="cancel">
    <er-button type="primary" size="small">test</er-button>
  </er-popconfirm>
</template>

<style scoped></style>
