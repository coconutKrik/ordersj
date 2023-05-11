<template>
    <div class="bj">
    <div class="form"><formregister></formregister></div>
    </div>
  </template>
  <script>
  import formregister from "./formregister.vue";
  export default {
    name:'userreg',
    components: {
      formregister: formregister,
    },
  };
  </script>
  <style lang="less" scoped>
  .form{
   
    width: 50%;
    margin-top: 10%;
    margin-left: 25%;
  }
  .bj{
    background-image: url("./../../../assets/backpic.jpeg");
  }
  </style>
  