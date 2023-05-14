<template>
    <div>
      <div class="header">
        <userheader></userheader>
      </div>
      <div class="main">
            <div class="orderinfocontainer">
                <div class="orderinfo" v-for="(order,i) in order_list" :key="i">
                    <div style="display: inline-flex;float: left;text-align: left;font-size: 25px;width: 100%;">
                        <i class="el-icon-s-order" style="display: inline-flex;float: left;"></i>
                        订单{{i}}
                        <el-tag el-tag size="small" v-if="order.state == 1"
                        >未支付</el-tag
                        >
                        <el-tag el-tag size="small" v-if="order.state == 2"
                        >配送中</el-tag
                        >
                        <el-tag el-tag size="small" v-if="order.state == 3"
                        >已完成</el-tag
                        >
                    </div>
                    <h3 class="common_title">订购的菜品</h3>

                    <div class="common_list_con clearfix">
                        <ul class="goods_list_th clearfix">
                            <li class="col01">菜品名称</li>
                            <li class="col03">菜品价格</li>
                            <li class="col33">菜品风味</li>
                            <li class="col04">数量</li>
                            <li class="col05">小计</li>
                        </ul>
                        <ul class="goods_list_td clearfix" v-for="(dishes,i) in order.dishes_list">
                            <li class="col01">{{i+1}}</li>
                            <li class="col02"><img :src="dishes.default_image_url"></li>
                            <li class="col03">{{ dishes.dishesname }}</li>
                            <li class="col05">{{ dishes.price }}元</li>
                            <li class="col33">{{ dishes.taste }}</li>
                            <li class="col06">{{ dishes.count }}</li>
                            <li class="col07">{{ dishes.amount }}元</li>
                        </ul>
                    </div>
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
    name: "orders",
    components: {
      userheader: userheader,
    },
    data() {
      return {
        order_list:[]
      };
    },
    created() {
        let url='/order/';
        this.axios.get(url,{
            responseType:'json',
        })
        .then(res=>{
            if(res.data.code==0){
                this.order_list=res.data.order_list;
            }else{
                console.log(res.data.errmsg);
            }
        })
        .catch(err=>{
            alert('服务器错误');
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
  .orderinfocontainer{
    display: flex;
    width: 100%;
    height: auto;
  }
  .orderinfo{
    display: flex;
    width: 90%;
    float: center;
    margin-left: 5%;
    margin-right: 5%;
    height: auto;
    margin-bottom: 10px;
  }
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

  </style>
  