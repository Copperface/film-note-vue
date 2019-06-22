<template>
  <v-btn class="primary" dark large @click="handleClickLoadMore">{{loadMoreButtonText}}</v-btn>
</template>

<script>
export default {
  name: "LoadMoreButton",
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClickLoadMore() {
      this.$emit("clickLoadMore");
    }
  },
  computed: {
    loadMoreButtonText: function() {
      return this.isLoading ? "Wait Please..." : "Load More";
    }
  }
};
</script>
