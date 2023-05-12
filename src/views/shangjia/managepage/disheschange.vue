<template>
    <div>
      <div class="dishesshow">
           <h1 style="font-size: 16px;text-align: left;">店内菜品修改</h1>
           <ul v-for="(dishes,i) in dishes_list" :key="i">
               <li>
                   <span class="dishespic">
                       <el-image
                       style="width: 100px; height: 100px"
                       :src="dishes.picurl"
                       fit="cover"></el-image>
                   </span>
                   <span class="infoshow">
                       <el-descriptions class="margin-top"  :column="3" size="400px" border>
                           <el-descriptions-item>
                               <template slot="label">
                                   菜品名
                               </template>
                               {{ dishes.dishesname }}
                           </el-descriptions-item>
                           <el-descriptions-item>
                               <template slot="label">
                                  菜品价格
                               </template>
                               {{ dishes.price }}
                           </el-descriptions-item>
                           <el-descriptions-item>
                               <template slot="label">
                                       菜品描述
                               </template>
                               {{dishes.info}}
                           </el-descriptions-item>
                           <el-descriptions-item>
                                <el-button size="small" type="primary" @click="">删除菜品</el-button>
                           </el-descriptions-item>
                       </el-descriptions>
                   </span>
               </li>
           </ul>
       </div>
    </div>
   </template>
   
   <script>
    export default {
      data(){
           return{
               dishes_list:[],
           }
       },
       mounted(){
           let url="/goods/";
           this.axios.get(url,{
               responseType:'json',
           })
           .then(res=>{
               if(res.data.code==0){
                   this.dishes_list=res.data.dishes_list;
               }else{
                   console.log(res.data.errmsg);
               }
           })
           .catch(err=>{
               alert('服务器错误');
               console.log(err);
           })
       },
       methods:{
            dishesdelete(){}
       }
    }
   </script>
   
   <style lang='less' scoped>
   
   </style>