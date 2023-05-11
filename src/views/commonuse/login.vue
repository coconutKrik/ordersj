<template>
  <div>
  <div>
  <a href="/shangjiareg">商家注册</a><br></br>
  <a href="/userreg">用户注册</a>
  </div>
  <div class="bj">
  <div class="form"><formlogin></formlogin></div>
  </div>
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
  background-image: url("./../../assets/backpic.jpeg");
}
</style>
