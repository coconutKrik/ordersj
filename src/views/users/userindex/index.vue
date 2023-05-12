<template>
 <div>
    <div class="header">
        <userheader></userheader>
    </div>
    <div class="main">
        <router-view></router-view>
    </div>
    <div class="footer">
        <div class="foot_link">
          <a href="#">关于我们</a>
          <span>|</span>
          <a href="#">联系我们</a>
          <span>|</span>
          <a href="#">招聘人才</a>
          <span>|</span>
          <a href="#">友情链接</a>
      </div>
      <p>CopyRight © 2023 个人 All Rights Reserved</p>
      <p>电话:666-****888    浙ICP备*******1号</p>
    </div>
 </div>
</template>

<script>
 import router from '@/router';
import userheader from './../userheader.vue'
 export default {
    name:'userindex',
    components:{
    userheader: userheader,
    router
},
 }
</script>

<style lang='less' scoped>
    .header{
        width: 100%;
        height: 20%;
        display: inline-block;
        position: relative;
    }
    .main{
        width: 100%;
        height: auto;
        display: inline-block;
        position: relative;
    }
    .footer{
        width: 100%;
        height: auto;
        display: inline-block;
        position: relative;
        border-top:2px solid #fe000074;
	    margin:30px 0;
    }
.foot_link{text-align:center;margin-top:30px;}
.foot_link a,.foot_link span{color:#4e4e4e;}
.foot_link a:hover{color:#f821ff}
.foot_link span{padding:0 10px}
.footer p{text-align:center; margin-top:10px;}

</style>