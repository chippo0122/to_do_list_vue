<template>
  <div ref="list" className="list">
    <p v-if="todos.length <= 0" className="list-notask text-brown">尚無事項</p>
    <ListItem v-else :key="item.id" v-for="item in todos" :item="item" />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ListItem from "./ListItem.vue";

export default {
  name: "List",

  components: {
    ListItem,
  },

  mounted() {
    //initialize todos data from local storage
    const data = JSON.parse(localStorage.getItem("todos")) || [];
    this.initialByLocal(data);
    //customize list section's height in every single advice
    const { offsetTop } = this.$refs.list;
    this.$refs.list.style.height = `calc(100vh - ${offsetTop}px)`;
  },

  methods: {
    ...mapMutations(["initialByLocal"]),
  },

  computed: {
    ...mapState(["todos"]),
  },
};
</script>

<style lang="scss">
.list {
  margin-top: 0.75rem;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ff6700;
  }

  .list-notask {
    text-align: center;
    margin: 0.75rem 0;
  }
}
</style>