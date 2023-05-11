<template>
 <div>
    <el-descriptions title="商家信息">
    <el-descriptions-item label="店铺名">{{ marketname }}</el-descriptions-item>
    <el-descriptions-item label="用户名">{{name}}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{ mobile }}</el-descriptions-item>
    <el-descriptions-item label="居住地">{{area}}</el-descriptions-item>
    <el-descriptions-item label="联系地址">{{ place }}</el-descriptions-item>
    </el-descriptions>
    <div class="dishesshow">
        <h1 style="font-size: 16px;text-align: left;">热销菜品</h1>
        <ul v-for="(dishes,i) in dishes_list" :key="i">
            <li><img :src="dishes.picurl"/>
                <div>
                    <h1>{{ dishes.name }}</h1>
                    <p>{{ dishes.price }}</p>
                    <p>{{ dishes.description }}</p>
                </div>
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
            name:"",
            mobile:"",
            area:"",
            place:"",
            marketname:"",
        }
    },
    mounted(){
        let url="/shangjiainfo/";
        this.axios.get(url,{
            responseType:'json',
        })
        .then(res=>{
            if(res.data.code==0){
                this.dishes_list=res.data.dishes_list;
                this.name=res.data.shangjiainfo.name;
                this.mobile=res.data.shangjiainfo.mobile;
                this.area=res.data.shangjiainfo.area;
                this.place=res.data.shangjiainfo.place;
                this.marketname=res.data.shangjiainfo.marketname;
            }else{
                console.log(res.data.errmsg);
            }
        })
        .catch(err=>{
            alert('服务器错误');
            console.log(err);
        })
    }
 }
</script>

<style lang='less' scoped>

</style>