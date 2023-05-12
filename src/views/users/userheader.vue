<template>
    <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
         <div class="first">
         <el-menu-item index="1"><a href="/userindex" target="_self"><div>网站首页</div></a></el-menu-item>
         </div>
         
         <div class="search_bar">
            <el-menu-item index="2"  style="width: 100%;">
                  <div class="grid-content bg-purple" style="width: 100%;">
                     <el-input
                        style="width: 100%;"
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="search_data"
                        @keyup.enter.native="search_dishes">
                     </el-input>
                  </div>
            </el-menu-item>
         </div>
         
         <div class="right_header" v-show="reg_and_login">
         <el-menu-item index="5" ><a href="/userreg" target="_self"><div>注册</div></a></el-menu-item>
         <el-menu-item index="6" ><a href="/" target="_self"><div>登录</div></a></el-menu-item>
         </div>
         <div class="right_header" v-show="logined" style="width: auto;">
         <el-submenu index="5">
            <template slot="title"><div><i class="el-icon-user-solid" style="display: inline-block;"></i><span style="display: inline-block;">{{ username }}</span></div></template>
               <el-menu-item index="5-1"><a href="/usercenter" target="_self"><div>用户中心</div></a></el-menu-item>
               <el-menu-item index="5-2"><a href="#" target="_self" @click='logout'><div>退出登录</div></a></el-menu-item>
         </el-submenu>
         </div>
         
         <div class="infoshow">
            <el-menu-item index="4"  style="width: 100%;">
               <i class="el-icon-goods"></i>
               <a href="/orders" target="_self" style="display: inline-flex;"><div>历史订单</div></a>
            </el-menu-item>
         </div>

         <div class="infoshow" @onfocus="cartshow()"  tabindex="-1" @onblur="cartclose()">
            
            <el-menu-item index="3"  style="width: 100%;">
               <i class="el-icon-shopping-cart-1"></i>
               <a href="/cart" target="_self" style="display: inline-flex;"><div>购物车</div></a>
               <!-- <ul class="cartshow hide" id="cartshow">
               <li>
                  <span class="dishespic" style="width: 50px;">菜品图片</span>
                  <span>菜品名称</span>
                  <span>菜品单价</span>
                  <span>数量</span>
               </li>
               <li v-for="(dishes,i) in cart" :key="i">
                  <span class="dishespic">
                     <el-image
                     style="width: 50px; height: 50px"
                     :src="dishes.picurl"
                     fit="cover"
                     ></el-image>
                  </span>
                  <span>{{ dishes.dishesname }}</span>
                  <span>{{ dishes.dishesprice }}</span>
                  <span>{{ dishes.dishescount }}</span>
               </li>
             </ul> -->
            </el-menu-item>
            
         </div>
      </el-menu>
   <div class="line"></div>
   
    </div>
   </template>
   
   <script>
    export default {
       name:"MyHeader",
       data() {
         return {
           activeIndex: '0',
           activeIndex2: '0',
           search_data:"",
           reg_and_login:false,
           logined:false,
           username:"",
           cart:[]
         };
       },
       
       methods: {
         
         handleSelect(key, keyPath) {
           console.log(key, keyPath);
         },
        
         logout(){
            this.axios.delete('/logout/',{
               responseType:'json',
            })
            .then(res=>{
               if(res.data.code==0){
                  window.sessionStorage.removeItem('logined');
                  window.sessionStorage.removeItem('username');
                  this.username="";
                  this.logined=false;
                  this.reg_and_login=true;
                  this.$router.push({
                     path:'/userindex',
                  });
               }
            })
            .catch(err=>{
               alert('服务器错误');
               console.log(err);
            })
         },
         search_dishes(){
            
            if(this.logined){
               if(this.search_data.length>=1){
                  
                  window.sessionStorage.setItem('q',this.search_data)
                  this.$router.push({
                     path:'/search',
                     query:{
                        q:this.search_data,
                     }
                  });
                  location.reload();
               }else{
                  alert('暂不支持无关键字搜索，请输入关键字')
               }
   
            }else{
               alert('登录后方可搜索')
            }
         }
       },
       created(){
         var pathname=window.location.pathname;
         if(document.cookie.match(new RegExp("(^| )" + 'username' + "=([^;]*)(;|$)"))!=undefined){
            this.username=document.cookie.match(new RegExp("(^| )" + 'username' + "=([^;]*)(;|$)"))[2];
            this.logined=true;
         }else{
            this.reg_and_login=true;
            if(pathname=='/search'){
               alert("登录后可使用搜索功能")
               this.$router.push({
                  path:"/login"
               })
            }
         }
         
      },
    }
   </script>
   
   <style lang='less' scoped>
      a{ text-decoration:none;    
         div{
            color: rgb(0, 0, 0);    
         }
      }
      
      .first{
         display: inline-flex;
         float: left;
      }
      .search_bar{
         width: 35%;
         display: inline-flex;
         float: left;
         margin-left: 15%;
         
      }
      .right_header{
         display: flex;
         margin-right: 0px;
         float:right;
      }
      .hide{
         display: none;
      }
      .infoshow{
         display: inline-flex;
         float: right;
         width: 8%;
         // .cartshow{
         //    list-style: none;
         //    margin-left: -80%;
         //    padding-right: 30%;
         //    position: absolute;
         //    height: auto;
         //    background-color: rgb(255, 212, 212);
            
         //    span{
         //       padding: 5px;
         //    }
          
         // }
      }
   /deep/.el-input__inner{
     border: 1px solid #737377;
     margin-top: -4px;
   }
   /deep/.el-input .el-input__inner::placeholder {
     color:rgba(0,0,0, 0.5);
   }
   
   </style>