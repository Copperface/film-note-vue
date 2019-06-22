<template>
  <h3 class="page-title display-2">{{text}}</h3>
</template>

<script>
export default {
  name: "PageTitle",
  props: {
    text: {
      type: String,
      default: ""
    }
  }
};
</script>

<style>
.page-title {
  margin: 30px;
  text-align: center;
}
</style>
