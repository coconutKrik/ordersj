<template>
    <div>
      <div class="header">
        <userheader></userheader>
      </div>
      <div class="main">
        <div class="checkedrequire">
            <el-form :model="form" status-icon  ref="form" label-width="200px" class="demo-form">
                <el-form-item label="请选择您的配送区域" prop="area">
                    <el-select
                        v-model="form.provinceid"
                        placeholder="省级行政区"
                        filterable
                        @change="loadcity($event)"
                        style="margin-right: 5%; width: 30%; display: inline-block"
                    >
                        <el-option
                        v-for="item in provicnes"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        >
                        </el-option>
                    </el-select>
                    <el-select
                        v-model="form.cityid"
                        placeholder="所在市"
                        filterable
                        @change="loaddistrict($event)"
                        style="margin-right: 5%; width: 30%; display: inline-block"
                    >
                        <el-option
                        v-for="item in cities"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        >
                        </el-option>
                    </el-select>
                    <el-select
                        v-model="form.districtid"
                        placeholder="所在区/县"
                        filterable
                        style="width: 30%; display: inline-block"
                    >
                        <el-option
                        v-for="item in districts"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="详细配送地址" prop="place">
                    <el-input v-model="form.place"></el-input>
                </el-form-item>
                <el-form-item label="请选择您的支付方式" prop="pass">
                    <el-checkbox-group
                        :max="1"
                        v-model="form.payment"
                        :min="0"
                        style="display: inline-flex;float: left;"
                    >
                        <el-checkbox
                        label="微信"
                        border
                        style="margin-right: 2%;height: 70px;"
                        >
                        <el-image
                        style="width: 60px; height: 50px"
                        :src="require('@/assets/weixin.jpeg')"
                        fit="fill"></el-image>
                        </el-checkbox>
                        <el-checkbox label="支付宝" border
                        style="margin-right: 2%;height: 70px;">
                        <el-image
                        style="width:60px; height: 50px"
                        :src="require('@/assets/zhifubao.jpeg')"
                        fit="fill"></el-image>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>

        </div>
        <div class="cartinfoshow">
            <h3 class="common_title">您订购的菜品</h3>

            <div class="common_list_con clearfix">
                <ul class="goods_list_th clearfix">
                    <li class="col01">菜品名称</li>
                    <li class="col03">菜品价格</li>
                    <li class="col33">菜品风味</li>
                    <li class="col04">数量</li>
                    <li class="col05">小计</li>
                </ul>
                <ul class="goods_list_td clearfix" v-for="(dishes,i) in cart">
                    <li class="col01">{{i+1}}</li>
                    <li class="col02"><img :src="dishes.default_image_url"></li>
                    <li class="col03">{{ dishes.dishesname }}</li>
                    <li class="col05">{{ dishes.price }}元</li>
                    <li class="col33">{{ dishes.taste }}</li>
                    <li class="col06">{{ dishes.count }}</li>
                    <li class="col07">{{ dishes.amount }}元</li>
                </ul>
            </div>

            <h3 class="common_title">总金额结算</h3>

            <div class="common_list_con clearfix">
                <div class="settle_con">
                    <div class="total_goods_count">共<em>{{ total_count }}</em>件商品，总金额<b>{{ total_amount }}元</b></div>
                    <div class="transit">配送费：<b>{{ freight }}元</b></div>
                    <div class="total_pay">实付款：<b>{{ payment_amount }}元</b></div>
                </div>
            </div>

            <div class="order_submit clearfix">
                <a @click="on__submit()" id="order_btn">去支付</a>
            </div>
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
    name: "ordersubmit",
    components: {
      userheader: userheader,
    },
    data() {
      return {
        cart:[],
        total_amount:0.00,
        total_count:0,
        freight:5,
        form:{
            provinceid: "",
            cityid: "",
            districtid: "",
            payment: [],
            place: "",
        }
      };
    },
    created() {
        let url = "/cart/";
        this.axios
        .get(url, {
            responseType: "json",
        })
        .then((res) => {
            if (res.data.code == 0) {
            this.cart = res.data.cart_list;
            for (var i = 0; i < this.cart.length; i++) {
                this.cart[i].amount = (
                this.cart[i].price * this.cart[i].count
                ).toFixed(2);
                this.total_amount+=this.cart[i].amount;
                this.total_count+=this.cart[i].count;
            }
            } else {
            console.log(res.data.errmsg);
            }
        })
        .catch((err) => {
            alert("服务器错误");
            console.log(err);
        });
        url = "/areas/";
        this.axios
        .get(url, {
            responseType: "json",
        })
        .then((res) => {
            if (res.data.code == 0) {
            this.provicnes = res.data.province_list;
            console.log(res.data.province_list);
            } else {
            console.log(res.data.errmsg);
            }
        })
        .catch((err) => {
            alert("服务器错误");
            console.log(err);
        });
    },
    methods: {
        loadcity(provinceid) {
        let url = "/areas/" + provinceid + "/";
        this.axios
            .get(url, {
            responseType: "json",
            })
            .then((res) => {
            if (res.data.code == 0) {
                this.cities = res.data.subs;
                this.ifcity = false;
            } else {
                console.log(res.data.errmsg);
            }
            })
            .catch((err) => {
            alert("服务器错误");
            console.log(err);
            });
        },
        loaddistrict(cityid) {
        let url = "/areas/" + cityid + "/";
        this.axios
            .get(url, {
            responseType: "json",
            })
            .then((res) => {
            if (res.data.code == 0) {
                this.districts = res.data.subs;
                this.ifdistrict = false;
            } else {
                console.log(res.data.errmsg);
            }
            })
            .catch((err) => {
            alert("服务器错误");
            console.log(err);
            });
        },
        on__submit(){
            let url='/order/';
            this.axios.post(url,{
                districtid:this.form.districtid,
                place:this.form.place,
                payment:this.form.payment[0],
                dishes_list:this.cart,
                total_amount:this.total_amount,
                total_count:this.total_count,
                shangjiaid:this.cart[0].shangjiaid,
                state:2,
            },{
                responseType:'json',
            })
            .then(res=>{
                if(res.data.code==0){   
                    this.$router.push({
                        path:'/ordersuccess',
                    })
                }else{
                    console.log(res.data.errmsg);
                }
            })
            .catch(err=>{
                alert('服务器错误');
                console.log(err);
            })
        },
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
  .demo-form{

  }
.common_list_con dl{margin:20px;}
.common_list_con dt{font-size:14px;font-weight:bold;margin-bottom:10px}
.common_list_con dd{margin-bottom:10px;}
.common_list_con dd.current{font-size:14px;font-weight:bold;}
.common_list_con dd input{vertical-align:bottom;margin-right:10px}
.common_title{width:100%;margin:20px auto 0;font-size:14px;}

.common_list_con{width:100%;border:1px solid #dddddd;border-top:1px solid #ccc;margin:10px auto 0;background-color:#f7f7f7;position:relative;}
.goods_list_th{height:40px;border-bottom:1px solid #ccc}
.goods_list_th li{float:left;line-height:40px;text-align:center;}
.goods_list_th .col01{width:35%}
.goods_list_th .col02{width:10%}
.goods_list_th .col03{width:20%}
.goods_list_th .col33{width:10%}
.goods_list_th .col04{width:10%}
.goods_list_th .col05{width:15%}

.goods_list_td{height:80px;border-bottom:1px solid #eeeded}
.goods_list_td li{float:left;line-height:80px;text-align:center;}
.goods_list_td .col01{width:4%}
.goods_list_td .col02{width:6%}
.goods_list_td .col03{width:25%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}
.goods_list_td .col04{width:10%}
.goods_list_td .col05{width:20%}
.goods_list_td .col33{width: 10%;}
.goods_list_td .col06{width:10%}
.goods_list_td .col07{width:15%}

.goods_list_td .col02{text-align:right}
.goods_list_td .col02 img{width:63px;height:63px;border:1px solid #ddd;display:block;margin:7px 0;float:right;}
.goods_list_td .col03{text-align:left;text-indent:20px}


.settle_con{margin:10px}
.total_goods_count,.transit,.total_pay{line-height:24px;text-align:right}
.total_goods_count em,.total_goods_count b,.transit b,.total_pay b{font-size:14px;color:#ff4200;padding:0 5px;}

.order_submit{width:100%;margin:20px auto;}
.order_submit a{width:160px;height:40px;line-height:40px;text-align:center;border-radius: 6px;

  background-color: rgb(72, 240, 223);color:#fff;font-size:16px;display:block;float:right}
  </style>
  