<template>
  <div className="insert-section">
    <input
      class="insert-input text-light"
      type="text"
      placeholder="請輸入待辦事項"
      v-model="insertInput"
    />
    <button @click="setInput" class="insert-btn bg-primary text-light">
      加入
    </button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { nanoid } from "nanoid";

export default {
  name: "Input",
  data() {
    return {
      insertInput: "",
    };
  },
  methods: {
    ...mapMutations(["pushMsg", "pushTask"]),

    setInput() {
      if (this.insertInput === "") {
        this.pushMsg({ title: "輸入值不得為空", success: false });
        return;
      }
      //get random id and create time
      const id = nanoid();
      const createTime = Date.now();
      //set data
      const data = {
        title: this.insertInput,
        id: id,
        createAt: createTime,
        isFinish: false,
        finishAt: null,
      };
      //set to local storage
      const local = JSON.parse(localStorage.getItem("todos")) || [];
      local.unshift(data);
      localStorage.setItem("todos", JSON.stringify(local));
      //push new data into vuex
      this.pushTask(data);
      //spread msg to reminder via vuex
      this.pushMsg({ title: "已加入待辦清單", success: true });
      //clear input
      this.insertInput = "";
    },
  },
};
</script>

<style lang="scss">
.insert-section {
  display: flex;
  width: 100%;
  border: 2px solid #ff6700;
  border-radius: 30px;
  overflow: hidden;
  transform: rotate(0deg);
  z-index: 0;
  .insert-input {
    width: 80%;
    display: block;
    background-color: transparent;
    border: 0;
    outline: none;
    padding: 10px 15px;
    font-size: 1rem;

    &::placeholder {
      text-align: center;
      color: #968579;
    }
  }

  .insert-btn {
    width: 20%;
    display: block;
    border: none;
    outline: none;
    padding: 10px 15px;
    font-size: 1rem;
    transition: 0.3s;

    &:hover {
      background-color: #ec8443 !important;
    }
  }
}

@media (max-width: 440px) {
  .insert-section {
    .insert-input {
      width: 70%;
    }

    .insert-btn {
      width: 30%;
    }
  }
}
</style>