<template>
  <div :class="item.success ? 'remind-item success' : 'remind-item danger'">
    <p>{{item.title}}</p>
    <button @click="deleteTarget" class="close-btn"></button>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';

export default {
    name: 'RemindItem',
    props: [
        'item'
    ],
    mounted() {
        this.timer = setTimeout(() => {
            this.deleteMsg(this.item.index);
        }, 3000);
    },

    beforeUnmount() {
        clearTimeout(this.tiemr);
    },

    data() {
        return {
            timer: null
        }
    },
    methods: {
        deleteTarget() {
            this.deleteMsg(this.item.index);
        },
        ...mapMutations([
            'deleteMsg'
        ])
    }
};
</script>

<style lang="scss">
.remind-item {
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 180px;
  align-items: center;
  background-color: #fff;
  padding: 10px 15px;
  margin: 0.5rem 0;
  z-index: 99 !important;

  .close-btn {
    display: block;
    position: relative;
    width: 20px;
    height: 20px;
    border: 0;
    background-color: transparent;

    &::after {
      position: absolute;
      display: block;
      content: "";
      background-color: #fff;
      width: 20px;
      height: 3px;
      top: 50%;
      left: 0;
      transform: rotate(-45deg);
    }

    &::before {
      position: absolute;
      display: block;
      content: "";
      background-color: #fff;
      width: 20px;
      height: 3px;
      top: 50%;
      left: 0;
      transform: rotate(45deg);
    }
  }
}

.success {
  background-color: #2ed573;
  color: #fff;
}

.danger {
  background-color: #e55039;
  color: #fff;
}
</style>