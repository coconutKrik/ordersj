<template>
  <div class="bj">
  <div class="form"><formlogin></formlogin></div>
  </div>
</template>
<script>
import formlogin from "./formlogin.vue";
export default {
  components: {
    formlogin: formlogin,
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
  background-image: url("./loginpic.jpeg");
}
</style>
