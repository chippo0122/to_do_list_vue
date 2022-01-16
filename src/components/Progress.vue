<template>
  <div class="progress">
    <p v-if="total > 0" class="progress-info">進度{{ countPercent() }}%</p>
    <div :style="{ width: `${countPercent()}%` }" className="progress-inner">
      <div className="progress-shadow"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Progress",
  props: ["total", "finish"],
  methods: {
    countPercent() {
      if (this.total > 0) {
        return Math.floor((this.finish / this.total) * 100);
      }
      return 0;
    },
  },
};
</script>