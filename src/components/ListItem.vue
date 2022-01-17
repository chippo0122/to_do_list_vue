<template>
  <div class="list-item bg-brown text-light">
    <label class="item-check">
      <input @change="setFinish" type="checkbox" :checked="item.isFinish" />
      <span class="checkmark"></span>
    </label>
    <div class="info-sec">
      <p
        :style="{ textDecoration: item.isFinish ? 'line-through' : 'unset' }"
        class="title"
      >
        {{ item.title }}
      </p>
      <div class="timeinfo-sec">
        <p class="set-time">創建於 : {{ timeTransor(item.createAt) }}</p>
        <p v-if="item.isFinish" class="set-time">
          完成於 : {{ timeTransor(item.finishAt) }}
        </p>
      </div>
    </div>
    <button @click="deleteTarget" class="del-btn"></button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "ListItem",
  props: ["item"],
  methods: {
    timeTransor(timestamp) {
      const time = new Date(timestamp);
      const month = time.getMonth() + 1;
      const date = time.getDate();
      const hour = time.getHours();
      const mins = time.getMinutes();
      const fixer = (num) => {
        return num < 10 ? `0${num}` : num;
      };

      return `${fixer(month)}/${fixer(date)} ${fixer(hour)}:${fixer(mins)}`;
    },

    setFinish() {
      const time = Date.now();
      //update status to local storage
      const local = JSON.parse(localStorage.getItem("todos")) || [];
      const newLocal = local.map((el) => {
        if (el.id === this.item.id) {
          if (el.isFinish) {
            el.isFinish = false;
            el.finishAt = null;
          } else {
            el.isFinish = true;
            el.finishAt = time;
          }
        }
        return el;
      });
      localStorage.setItem("todos", JSON.stringify(newLocal));
      //update status to vuex store
      this.setStatus({ id: this.item.id, time });
      //spread message to reminder
      this.pushMsg({ title: "已更新狀態", success: true });
    },

    deleteTarget() {
      //delete local side data
      const local = JSON.parse(localStorage.getItem("todos")) || [];
      const newLocal = local.filter((el) => el.id !== this.item.id);
      localStorage.setItem("todos", JSON.stringify(newLocal));
      //delete in vuex
      this.deleteTask(this.item.id);
      //spread message
      this.pushMsg({ title: "已刪除待辦事項", success: false });
    },

    ...mapMutations(["pushMsg", "deleteTask", "setStatus"]),
  },
};
</script>

<style lang="scss">
.list-item {
  display: flex !important;
  align-items: center;
  margin-bottom: 0.75rem;
  padding: 2rem;
  border-radius: 5px;
  overflow: hidden;

  .item-check {
    display: block;
    position: relative;
    cursor: pointer;
    font-size: 1rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 1;

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 20px;
      width: 20px;
      transform: translateY(-50%);
      background-color: #ddd;
      transition: 0.3s;
      z-index: 1 !important;

      &:after {
        content: "";
        position: absolute;
        display: none;
      }

      //checkout mark
      &:after {
        left: 6px;
        top: 1px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }

    &:hover input ~ .checkmark {
      background-color: #ffb97c;
    }

    input:checked ~ .checkmark {
      background-color: #ff6700 !important;

      &:after {
        display: block !important;
      }
    }
  }

  .info-sec {
    margin-left: 30px;

    .title {
      font-size: 1.15rem;
      margin-bottom: 0.25rem;
      word-wrap: break-all;
      word-break: break-all;
    }

    .set-time {
      font-size: 0.75rem;
      margin-bottom: 0.15rem;
    }
  }

  .del-btn {
    display: block;
    position: relative;
    margin-left: auto;
    width: 30px;
    height: 30px;
    border: none;
    background-color: transparent;

    &:before {
      position: absolute;
      display: block;
      content: "";
      top: 50%;
      left: 0;
      width: 25px;
      height: 2px;
      background-color: #e74c3c;
      transform: rotate(-45deg);
    }

    &:after {
      position: absolute;
      display: block;
      content: "";
      top: 50%;
      left: 0;
      width: 25px;
      height: 2px;
      background-color: #e74c3c;
      transform: rotate(45deg);
    }
  }

  .timeinfo-sec {
    display: flex;

    p {
      &:nth-child(2n) {
        margin-left: 0.75rem;
      }
    }

    @media (max-width: 490px) {
      flex-direction: column;
      p {
        &:nth-child(2n) {
          margin-left: 0;
        }
      }
    }
  }
}
</style>