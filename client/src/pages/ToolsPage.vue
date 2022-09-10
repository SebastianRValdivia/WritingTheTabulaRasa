<template>
  <h1>Tools</h1>
  <div class="tool-box">
    <PomodoroTimer />
  </div>
</template>

<script>
import PomodoroTimer from 'src/components/PomodoroTimer.vue';

export default {
    components: { PomodoroTimer }
}
</script>

<style>
.tool-box {
  border-bottom: 1px solid black;
}

</style>