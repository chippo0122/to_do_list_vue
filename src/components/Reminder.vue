<template>
  <div class="reminder">
    <RemindItem
      :key="index"
      v-for="(item, index) in messages"
      :item="{ ...item, index }"
    />
  </div>
</template>

<script>
import RemindItem from "./RemindItem.vue";
import { mapState } from "vuex";

export default {
  name: "Reminder",
  components: {
    RemindItem,
  },
  computed: {
    ...mapState(["messages"]),
  },
};
</script>

<style lang="scss">
.reminder {
  position: absolute;
  bottom: 30px;
  left: 30px;
}
</style>