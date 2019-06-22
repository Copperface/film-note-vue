<template>
  <div class="empty-message">{{ text }}</div>
</template>

<script>
export default {
  name: "EmptyMessage",
  props: {
    text: {
      type: String,
      default: ""
    }
  }
};
</script>

<style>
.empty-message {
  font-size: 32px;
  text-align: center;
  margin: 20px;
}
</style>
