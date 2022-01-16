<template>
  <div class="container">
    <h1 class="main-title text-light">待辦清單</h1>
    <Input />
    <Dashboard />
    <List />
  </div>
</template>

<script>
import Input from "./Input.vue";
import Dashboard from "./Dashboard.vue";
import List from "./List.vue";

export default {
  name: "Main",
  components: {
    Input,
    List,
    Dashboard,
  },
};
</script>

<style lang="scss">
.container {
  width: 768px;
  margin: 0 auto;
  height: 100vh;

  .main-title {
    font-size: 2.5rem;
    text-align: center;
    padding-top: 1rem;
    margin-bottom: 2rem;
  }
}

@media (max-width: 960px) {
  .container {
    width: 80%;
  }
}
</style>