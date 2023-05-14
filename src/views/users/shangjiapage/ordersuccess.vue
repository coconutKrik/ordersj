<template>
    <div>
      <div class="header">
        <userheader></userheader>
      </div>
      <div class="main">
        <el-steps :active="2" finish-status="success" simple style="margin-top: 20px">
        <el-step title="订单生成" ></el-step>
        <el-step title="订单支付" ></el-step>
        <el-step title="订单配送" ></el-step>
        </el-steps>
        <div style="font-size: 30px;font-weight: 500;">
            您的订单已创建成功并成功支付，我们会尽快给您安排配送，请耐心等待
        </div>
        <div>
            <i class="el-icon-loading"></i>
            即将跳转至订单页
        </div>
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
        <p>电话:666-****888 浙ICP备*******1号</p>
      </div>
    </div>
  </template>
  
  <script>
  import userheader from "./../userheader.vue";
  export default {
    name: "ordersuccess",
    components: {
      userheader: userheader,
    },
    data() {
      return {
      };
    },
    created() {
        const timejump = 1;
        if(!this.timer){
            this.count = timejump ;
            this.show = false;
            this.timer = setInterval(()=>{
            if(this.count > 0 && this.count <= timejump ){
                this.count--;
            }else{
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
                //跳转的页面写在此处
                this.$router.push({path: '/orders'});
            }
            },2500)
        }
    },
    beforeDestroy(){
        clearInterval(this.timer);
    },
    methods: {
     
    },
  };
  </script>
  
  <style lang="less" scoped>
  .header {
    width: 100%;
    height: 20%;
    display: inline-block;
    position: relative;
  }
  .main {
    width: 100%;
    height: auto;
    display: inline-block;
    position: relative;
  }
  .footer {
    background-image: url("../../../assets/southeast.jpg");
    width: 100%;
    height: auto;
    display: inline-block;
    position: relative;
    border-top: 2px solid #fe000074;
    margin: 30px 0;
    color: white;
  }
  .foot_link {
    text-align: center;
    margin-top: 30px;
  }
  .foot_link a,
  .foot_link span {
    color: #e6e6e6;
  }
  .foot_link a:hover {
    color: #f821ff;
  }
  .foot_link span {
    padding: 0 10px;
  }
  .footer p {
    text-align: center;
    margin-top: 10px;
  }

  </style>
  