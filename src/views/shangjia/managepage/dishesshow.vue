<template>
 <div>
   <div class="dishesshow">
        <h1 style="font-size: 16px;text-align: left;">店内菜品</h1>
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