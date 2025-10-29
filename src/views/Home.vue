<template>
  <div class="home">
    <div class="container">
      <TaskList />
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskList from '@/components/TaskList.vue';
</script>

<style scoped>
.home {
  padding: 20px 0;
}
</style>