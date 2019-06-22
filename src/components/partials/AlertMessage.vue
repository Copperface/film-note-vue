<template>
  <v-alert type="error">{{text}}</v-alert>
</template>

<script>
export default {
  name: "AlertMessage",
  props: {
    text: {
      type: String,
      default: ""
    }
  }
};
</script>
