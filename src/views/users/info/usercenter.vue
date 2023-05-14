<template>
    <div>
      <div class="header">
        <userheader></userheader>
      </div>
      <div class="main">
        <div class="userinfo">
            <h3>用户信息</h3>
            <ul>
                <label>用户名：</label><li>{{userinfo.username}}</li><br/>
                <label>手机号：</label><li>{{ userinfo.mobile }}</li><br/>
            </ul>
            </div>
        </div>
        <div class="userinfochange">
            <h3>用户信息修改</h3>
            <el-select v-model="value" placeholder="请选择要修改的内容" style="">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <Password v-if="value=='1'"></Password>
            <Username v-if="value=='2'"></Username>
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
  import Password from "./Passoword.vue";
  import Username from "./Username.vue";
  export default {
    name: "usercenter",
    components: {
      userheader: userheader,Password,Username,
    },
    data() {
      return {
        userinfo:{
            username:'',
            mobile:'',
        },
        options: [{
            value: '1',
            label: '密码修改'
            }, {
            value: '2',
            label: '用户名修改'
            },
        ],
        value:'1',
      };
    },
    created() {
        let url='/userinfo/'
            this.axios.get(url,{
                responseType:'json',
            })
            .then(res=>{
                if(res.data.code==0){
                    this.userinfo.username=res.data.userinfo.username;
                    this.userinfo.mobile=res.data.userinfo.mobile;
                }else{
                    console.log(res.data.errmsg);
                }
            })
            .catch(err=>{
                console.log(err);
            })
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
  h3{
        font-weight: 530;
        margin-top: 0px;
        margin-bottom: 0px;
        text-align: left;
        };
  .userinfo{
        display: inline-flex;
        float: left;
        margin-top: 0%;
        margin-left: 2%;
        width: 96%;
        height: auto;
        text-decoration-style: dashed;
        background-color: transparent!important;
        border-bottom: 2px solid black;
       
        
        ul{
            background-color: transparent!important;
            margin-top: 15px;
            margin-bottom: 0px;
            *{
            background-color: transparent!important;
            margin-bottom: 15px;
            }
           
        }
        li{
            text-decoration: none;
            display: inline;
            
        }
        li::marker{
            content: "" ;
        }
        label{
            display: inline-block;
            width: 70px;
        }
    }
    .userinfochange{
        height: auto;
        text-decoration-style: dashed;
        background-color: transparent!important;
        display: inline-block;
        width: 100%;
        margin-left: 2%;
    }
  </style>
  