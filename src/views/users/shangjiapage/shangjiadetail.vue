<template>
 <div>
    <div class="header">
        <userheader></userheader>
    </div>
    <div class="main">
        <div class="shangjiainfo" >
            <span style="display: inline-flex; margin-right: 0px; float: left;font-size: 20px;margin-right: 8px;">
            <i class="el-icon-s-shop" style="margin-top: 4px;"></i>
            {{shangjiainfo.shangjianame }}
            </span>
            <span style="display: inline-flex; margin-right: 0px; float: left;margin-top: 4px;">
                <label
                style="display: inline-block; color: #909399; font-size: 14px"
                >店铺评分：</label>
                <el-rate
                v-model="shangjiainfo.rate"
                disabled
                show-score
                text-color="#ff9900"
                style="display: inline-block; "
                >
                </el-rate>
               
            </span>
            
        </div>
        <div class="dishesinfo">
            <div class="disheslistcontainer">
                <h1 style="font-size: 16px; text-align: left">店内菜品</h1>
                <ul v-for="(dishes, i) in dishes_list" :key="i" style="list-style: none">
                    <li style="margin-bottom: 20px">
                    <span class="dishespic">
                        <el-image
                        style="width: 100px; height: 100px"
                        :src="dishes.picurl"
                        fit="cover"
                        ></el-image>
                    </span>
                    <span class="infoshow">
                        <el-descriptions class="margin-top" :column="3" border>
                        <el-descriptions-item>
                            <template slot="label"> 菜品名 </template>
                            {{ dishes.dishesname }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label"> 菜品风味 </template>
                            <el-checkbox-group
                                :max="1"
                                v-model="taste.i"
                                :min="0">
                                <el-checkbox
                                :label="dishes.taste1"
                                border
                                style="margin-right: 2%"
                                ></el-checkbox>
                                <el-checkbox
                                :label="dishes.taste2"
                                border
                                style="margin-right: 2%"
                                ></el-checkbox>
                                <el-checkbox :label="dishes.taste3" border></el-checkbox>
                            </el-checkbox-group>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label"> 菜品价格 </template>
                            {{ dishes.price }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label"> 菜品描述 </template>
                            {{ dishes.info }}
                        </el-descriptions-item>
                        <el-form-item>
                        <el-button
                            class="add_button"
                            type="primary"
                            @click="adddishes(i)">+</el-button>
                        <el-button class="reduce_button" @click="reducedishes(i)">-</el-button>
                        </el-form-item>
                        </el-descriptions>
                    </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="cart-bottom">
            <span class="cart-bottom-span">已选择<span class="cart-total-num">{{cart_dict.totalnum}}</span>件商品</span>
            <span class="cart-bottom-span">总计：<span class="cart-total-price">{{ cart_dict.totalprice }}</span></span>
            <span class="cart-bottom-btn" @click="on_submit()">提交购物车</span> 
		</div>
    </div>
 </div>
</template>

<script>
import userheader from '../userheader.vue';
 export default {
    name:"shangjiadetail",
    components:{
        userheader:userheader
    },
    data(){
        return{
            dishes_list:[],
            shangjiainfo:{
                rate:1.5,
                shangjianame:'丁真珍珠',
            },
            cart_dict:{
                totalprice:0.0,
                totalnum:0,
            },
            districtid:0,
            shangjiaid:0,
            taste:{},
        }
    },
    mounted(){
        districtid=this.$route.query.districtid;
        shangjiaid=this.$route.query.shangjiaid;
        let url='/shangjiadetail/'+this.shangjiaid+'/'
        this.axios.get(url,{
            responseType:'json',
        })
        .then(res=>{
            if(res.data.code==0){
                this.dishes_list=res.data.dishes_list;
                this.shangjiainfo=res.data.shangjiainfo;
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
        adddishes(i){
           if(this.cart_dict.i!=undefined){
                this.cart_dict.i.count+=1;
           }else{
                var dishes=Object;
                dishes.dishes_id=this.dishes_list[i].dishes_id;
                dishes.dishesname=this.dishes_list[i].dishesname;
                dishes.price=this.dishes_list[i].price;
                dishes.count=1;
                dishes.info=this.dishes_list[i].info;
                dishes.taste=this.taste.i[0];
                this.cart_dict.i=dishes;  
           }
           this.cart_dict.totalnum+=1
           this.cart_dict.totalprice+=parseFloat(this.dishes_list[i].price);
        },
        reducedishes(i){
            if(this.cart_dict.i!=undefined){
                this.cart_dict.i.count-=1;
                this.cart_dict.totalprice-=parseFloat(this.dishes_list[i].price);
                this.cart_dict.totalnum-=1;
                if(this.cart_dict.i.count==0){
                    this.cart_dict.i=undefined;
                }
            }
        },
        on_submit(){
            let url='/cart/';
            this.axios.post(url,{
                cart_dict:this.cart_dict
            },{
                responseType:'json',
            })
            .then(res=>{
                if(res.data.code==0){
                    this.$router.push({
                        path:'/cart',
                    })
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
        height: 45px;
        bottom: 0%;
        display: block;
        position: fixed;
        border-top:2px solid #fe000074;
	    margin:30px 0;
        border-bottom:2px solid #fe000074;
        
    }
    .shangjiainfo{
        width: 100%;
        height:auto;
        position: relative;
        display: inline-block;
    }
    .dishesinfo{
        width: 100%;
        height: auto;
        position: relative;
        display:inline-block;
        border: 5px solid rgb(248, 228, 117);
        border-radius: 5px;
        background-color: rgb(252, 231, 113);
    }
    .disheslistcontainer{
        width: 70%;
        margin-left: 15%;
        height: auto;
        position: relative;
        display:inline-block;
        border: 5px solid rgb(255, 187, 0);
        border-radius: 5px;
        background-color: rgb(255,255,255);
    }
    .cart-bottom-btn{
        color: #FFF;
        font-size: 30px;
        font-weight: 600px;cursor: 
        pointer;margin: 0 20px;
        background: #FE8502;
		border: 1px solid #FF6633;
        border-radius: 5px 5px 5px 5px;
        padding: 6px 12px;
    }
	.cart-bottom-btn:hover{
        background: #FF6600;
    }
    .cart-bottom{
        height: 35px;
        float: right;
        text-align: right;
        
    }
	.cart-total-num{
        position:relative;
        top:1px;
        margin-left: 5px;
        margin-right: 5px;
        font-size: 30px;
    }
    .cart-bottom-span{
        font-size: 20px;
        margin-right: 5px;
    }
	.cart-total-price{
        color: #FF3334;
        font-weight: bold;
        font-size: 30px;
        width: auto;
    }
.foot_link{text-align:center;margin-top:30px;}
.foot_link a,.foot_link span{color:#e6e6e6;}
.foot_link a:hover{color:#f821ff}
.foot_link span{padding:0 10px}
.footer p{text-align:center; margin-top:10px;}
</style>