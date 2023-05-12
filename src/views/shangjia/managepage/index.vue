<template>
<el-container style="height: 100%; border: 1px solid #eee">
  <el-aside width="15%" style="background-color: white">
    <el-menu class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-s-shop"></i>菜品管理</template>
        
        <el-menu-item index="1-1"><a href="/shangjiaindex/dishesshow"><span >菜品浏览</span></a></el-menu-item>
        <el-menu-item index="1-2"><a href="/shangjiaindex/dishesadd" ><span >菜品增加</span></a></el-menu-item>
        <el-menu-item index="1-3"><a href="/shangjiaindex/disheschange"><span>菜品修改</span></a></el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-s-order"></i>订单管理</template>
        <el-menu-item index="2-1">订单浏览</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
        <el-menu
                mode="horizontal"
                :default-active="1"
                class="el-menu-demo"
                style="background-color: #B3C0D1">
                <el-menu-item ><a href="/shangjiaindex"><span style="width: 100%;height: 100%;">商家首页</span></a></el-menu-item>
                <el-submenu index="2" style="display: flex; margin-right: 0px;float:right;">
                    
                    <template slot="title">
                        <div>   
                            <i class="el-icon-user-solid" style="display: inline-block;"></i>
                            <span style="display: inline-block;">{{ shangjianame }}
                            </span>
                            
                        </div>
                    </template>
                    <el-menu-item index="1-1"><a href="#" target="_self" @click='logout'><div>退出登录</div></a></el-menu-item>
                </el-submenu>
                <div  style="display: flex; margin-right: 0px;float:right;">
                    <label style="display: inline-block;color: #909399;font-size: 14px;">店铺评分：</label>
                    <el-rate
                        v-model="rate"
                        disabled
                        show-score
                        text-color="#ff9900"
                        style="display: inline-block; margin-top: 10%;">
                        
                    </el-rate>
                </div>
                
            </el-menu>
      
    </el-header>
    
    <el-main>
      <router-view>
        
      </router-view>
    </el-main>
  </el-container>
</el-container>
</template>
   
<script>
export default {
    name:'shangjiaindex',
    data() {
        return {
            rate:4.3,
            shangjianame:"就开始动脑筋",
       
        }
    },
    mounted(){
        // this.shangjianame= document.cookie.match(new RegExp("(^| )" + 'username' + "=([^;]*)(;|$)"));
        // if (this.shangjianame==""){
        //     this.shangjianame=window.sessionStorage.getItem('username');
        // }
        
    },
    methods:{
        
    },

}
</script>
   
<style lang='less' scoped>
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  a{ text-decoration:none;
    display:inline-block;
    width: 100%;
    height: 100%;    
    span{
      color: rgb(0, 0, 0);    
    }
   }
</style>