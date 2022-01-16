<template>
  <div class="App bg-dark">
    <Reminder />
    <Main />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Main from "./components/Main.vue";
import Reminder from "./components/Reminder.vue";

export default {
  name: "App",
  components: {
    Main,
    Reminder,
  },
  computed: {
    ...mapState(["messages", "todos"]),
  },
};
</script>

<style lang="scss">
@import "./reset.scss";
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500&display=swap");
//font-family: 'Noto Sans TC', sans-serif;

body {
  box-sizing: border-box !important;
  font-family: "Noto Sans TC", sans-serif !important;
}

//utility
.bg-primary {
  background-color: #ff6700 !important;
}

.text-primary {
  color: #ff6700 !important;
}

.bg-secondary {
  background-color: #ec8443 !important;
}

.text-secondary {
  color: #ec8443 !important;
}

.bg-light {
  background-color: #fff !important;
}

.text-light {
  color: #fff !important;
}

.bg-dark {
  background-color: #26211e !important;
}

.text-dark {
  color: #26211e !important;
}

.bg-brown {
  background: #968579 !important;
}

.text-brown {
  color: #968579 !important;
}

.App {
  position: relative;
}
</style>
