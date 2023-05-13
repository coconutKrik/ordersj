<template>
    <div>
       <div class="header">
           <userheader></userheader>
       </div>
       <div class="main">
            <div class="total_count">全部商品<em>{{total_count}}</em>件</div>
            <ul class="cart_list_th clearfix">
                <li class="col01">商品名称</li>
                <li class="col03">商品价格</li>
                <li class="col04">数量</li>
                <li class="col05">小计</li>
                <li class="col06">操作</li>
            </ul>
            <ul class="cart_list_td clearfix" v-for="(dishes,i) in cart" :key="i">
                <li class="col01"><input type="checkbox" name="" v-model="dishes.selected" @change="update_selected(i)"></li>
                <li class="col02"><img :src="dishes.picurl"></li>
                <li class="col03">{{ dishes.dishesname }}</li>
                <li class="col05">{{ dishes.price }}元</li>
                <li class="col06">
                    <div class="num_add">
                        <a @click="on_add(i)" class="add fl">+</a>
                        <input v-model="dishes.count" @focus="origin_input=dishes.count" @blur="on_input(i)" type="text" class="num_show fl">
                        <a @click="on_minus(i)" class="minus fl">-</a>
                    </div>
                </li>
                <li class="col07">{{dishes.amount}}元</li>
                <li class="col08"><a @click="on_delete(i)">删除</a></li>
            </ul>

            <ul class="settlements">
                <li class="col01"><input type="checkbox" name="" @change="on_selected_all" v-model="selected_all"></li>
                <li class="col02">全选</li>
                <li class="col03">合计(不含运费)：<span>¥</span><em>{{total_selected_amount}}</em><br>共计<b>{{total_selected_count}}</b>件商品</li>
                <li class="col04"><a href="/order">去结算</a></li>
            </ul>
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
   import userheader from '../userheader.vue';
    export default {
       name:"shangjiadetail",
       components:{
           userheader:userheader
       },
       data(){
           return{
            cart: [],
            total_selected_count: 0,
            origin_input: 0
           }
       },
       computed: {
            total_count: function(){
                var total = 0;
                for(var i=0; i<this.cart.length; i++){
                    total += (this.cart[i].count);
                    this.cart[i].amount = ((this.cart[i].price) * (this.cart[i].count)).toFixed(2);
                }
                return total;
            },
            total_selected_amount: function(){
                var total = 0;
                this.total_selected_count = 0;
                for(var i=0; i<this.cart.length; i++){
                    if(this.cart[i].selected) {
                        total += ((this.cart[i].price) * (this.cart[i].count));
                        this.total_selected_count += (this.cart[i].count);
                    }
                }
                return total.toFixed(2);
            },
            selected_all: function(){
                var selected=true;
                for(var i=0; i<this.cart.length; i++){
                    if(this.cart[i].selected==false){
                        selected=false;
                        break;
                    }
                }
                return selected;
            }
        },
       mounted(){
            let url='/cart/';
            this.axios.get(url,{
                responseType:'json',
            })
            .then(res=>{
                if(res.data.code==0){
                    this.cart=res.data.cart_list;
                    for(var i=0; i<this.cart.length; i++){
                        this.cart[i].amount = ((this.cart[i].price) * this.cart[i].count).toFixed(2);
                    }
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
        on_minus: function(i){
            if (this.cart[i].count > 1) {
                var count = this.cart[i].count - 1;
                this.update_count(i, count);
            }
        },
        on_add: function(i){
            var count = this.cart[i].count + 1;
            this.update_count(i, count);
        },
        // 删除购物车数据
        on_delete: function(i){
            axios.delete(this.host+'/carts/', {
                data: {
                    dishes_id: this.cart[i].id
                },
                responseType: 'json',
                withCredentials: true
            })
            .then(response => {
                if (response.data.code == 0) {
                    this.cart.splice(i, 1);
                }
            })
            .catch(error => {
                console.log(error);
            })
        },
        on_input: function(i){
            var val = parseInt(this.cart[i].count);
            if (isNaN(val) || val <= 0) {
                this.cart[i].count = this.origin_input;
            } else {
                // 更新购物车数据
                axios.put(this.host+'/carts/', {
                        dishes_id: this.cart[i].id,
                        count: val,
                        selected: this.cart[i].selected
                    }, {
                        responseType: 'json',
                        withCredentials: true
                    })
                    .then(response => {
                        this.cart[i].count = response.data.count;
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
        // 更新购物车数据
        update_count: function(i, count){
            axios.put(this.host+'/carts/', {
                    dishes_id: this.cart[i].id,
                    count,
                    selected: this.cart[i].selected
                }, {
                    responseType: 'json',
                    withCredentials: true
                })
                .then(response => {
                    this.cart[i].count = response.data.cart_dishes.count;
                })
                .catch(error => {
                    console.log(error)
                })
        },
        // 更新购物车数据
        update_selected: function(i) {
            axios.put(this.host+'/carts/', {
                    dishes_id: this.cart[i].id,
                    count: this.cart[i].count,
                    selected: this.cart[i].selected
                }, {
                    responseType: 'json',
                    withCredentials: true
                })
                .then(response => {
                    this.cart[i].selected = response.data.cart_dishes.selected;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        // 购物车全选
        on_selected_all: function(){
            var selected = !this.selected_all;
            axios.put(this.host + '/carts/selection/', {
                    selected
                }, {
                    responseType: 'json',
                    withCredentials: true
                })
                .then(response => {
                    for (var i=0; i<this.cart.length;i++){
                        this.cart[i].selected = selected;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
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
        background-image: url('../../../assets/southeast.jpg');
        width: 100%;
        height: auto;
        display: inline-block;
        position: relative;
        border-top:2px solid #fe000074;
	    margin:30px 0;
        color:white;
    }
    .total_count{
	width:1200px;margin:0 auto;height:40px;line-height:40px;font-size:14px;
}
.total_count em{
	font-size:16px;color:#ff4200;margin:0 5px;
}

.cart_list_th{width:1198px;border:1px solid #ddd;background-color:#f7f7f7;margin:0 auto;}
.cart_list_th li{height:40px;line-height:40px;float:left;text-align:center;}
.cart_list_th .col01{width:36%;}
.cart_list_th .col02{width:6%;}
.cart_list_th .col03{width:13%;}
.cart_list_th .col04{width:12%;}
.cart_list_th .col05{width:15%;}
.cart_list_th .col06{width:18%;}

.cart_list_td{width:1198px;border:1px solid #ddd;background-color:#fff9f9;margin:0 auto;margin-top:-1px;}
.cart_list_td li{height:120px;line-height:120px;float:left;text-align:center;}

.cart_list_td .col01{width:4%;}
.cart_list_td .col02{width:12%;}
.cart_list_td .col03{width:20%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}
.cart_list_td .col04{width:6%;}
.cart_list_td .col05{width:13%;}
.cart_list_td .col06{width:12%;}
.cart_list_td .col07{width:15%;}
.cart_list_td .col08{width:18%;}

.cart_list_td .col02 img{width:100px;height:100px;border:1px solid #ddd;display:block;margin:10px auto 0;}
.cart_list_td .col03{height:48px;text-align:left;line-height:24px;margin-top:38px;}
.cart_list_td .col03 em{color:#999}
.cart_list_td .col08 a{color:#666}

.cart_list_td .col06 .num_add{width:98px;height:28px;border:1px solid #ddd;margin:40px auto 0;}
.cart_list_td .col06 .num_add a{width:29px;height:28px;line-height:28px;background-color:#f3f3f3;font-size:14px;color:#666}
.cart_list_td .col06 .num_add input{width:38px;height:28px;text-align:center;line-height:30px;border:0px;display:block;float:left;outline:none;border-left:1px solid #ddd;border-right:1px solid #ddd;}
.settlements{width:1198px;height:78px;border:1px solid #ddd;background-color:#fff4e8;margin:-1px auto 0;}
.settlements li{line-height:78px;float:left;}
.settlements .col01{width:4%;text-align:center}
.settlements .col02{width:12%;}
.settlements .col03{width:69%; height:48px; line-height:28px;text-align:right;margin-top:10px;}
.settlements .col03 span{color:#ff0000;padding-right:5px}
.settlements .col03 em{color:#ff3d3d;font-size:22px;font-weight:bold;}
.settlements .col03 span{color:#ff0000;}
.settlements .col03 b{color:#ff0000;font-size:14px;padding:0 5px;}

.settlements .col04{width:14%;text-align:center;float:right;}
.settlements .col04 a{display:block;height:78px;background-color:#FE8502;;text-align:center;line-height:78px;color:#fff;font-size:24px}
.foot_link{text-align:center;margin-top:30px;}
.foot_link a,.foot_link span{color:#e6e6e6;}
.foot_link a:hover{color:#f821ff}
.foot_link span{padding:0 10px}
.footer p{text-align:center; margin-top:10px;}
</style>