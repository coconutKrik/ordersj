<template>
    <div>
      <div class="header">
        <userheader></userheader>
      </div>
      <div class="main">
        <el-skeleton :rows="7" animated v-show="data_loading"/>
          <div v-show="isEmpty" class="notfoundtips"><h1>暂未搜索到相关店铺</h1></div>
          <div
            v-for="(shangjia, i) in shangjia_list"
            :key="i"
            style="
            width: 100%;
            position: relative;
            display: flex;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 6px;
            margin-bottom: 10px;
            "
        >
            <div
            class="shangjiacontainer"
            @click="gotoshangjia(shangjia.shangjiaid)"
            >
            <span
                style="
                display: inline-flex;
                font-size: 23px;
                font-weight: 500;
                float: left;
                width: 100%;
                "
            >
                <i class="el-icon-s-shop" style="margin-top: 4px"></i>
                {{ shangjia.marketname }}</span
            >
            <span
                v-for="(dishes, j) in shangjia.dishes_list"
                :key="j"
                class="infoshow"
            >
                <span class="dishespic">
                <el-image
                    style="width: 80px; height: 80px"
                    :src="dishes.picurl"
                    fit="cover"
                ></el-image>
                </span>
                <span style="border: 1px solid rgb(51, 47, 47); border-radius: 3px">
                <span
                    style="
                    width: 30%;
                    margin-top: 15px;
                    margin-bottom: 10px;
                    display: inline-flex;v
                    "
                >
                    菜品名
                </span>
                <span style="width: 30%; display: inline-flex"> 菜品价格 </span>
                <span style="width: 30%; display: inline-flex"> 菜品描述 </span>
                <span
                    style="
                    width: 30%;
                    display: inline-flex;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    "
                >
                    {{ dishes.dishesname }}
                </span>
                <span
                    style="
                    width: 30%;
                    display: inline-flex;
                    color: gold;
                    font-size: 18px;
                    "
                >
                    ¥{{ dishes.price }}
                </span>
                <span
                    style="
                    width: 30%;
                    display: inline-flex;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    "
                >
                    {{ dishes.info }}
                </span>
                </span>
            </span>
            </div>
        </div>
          <div>
          <el-pagination
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-size="pagesize"
              layout="prev, pager, next, jumper"
              :total="total"
              hide-on-single-page
              background>
          </el-pagination>
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
    name: "ordersuccess",
    components: {
      userheader: userheader,
     
    },
    data() {
      return {
        data_loading:true,
        shangjia_list:[],
        pagenum:1,
        page:1,
        pagesize:15,
        total:0,
        q:"",
        isEmpty:false,
      };
    },
    created() {
      if(this.$route.query.page!=undefined&&this.$route.query.pagesize!=undefined){
                this.page=Number(this.$route.query.page);
           }
           
            var reg = new RegExp('(^|&)q=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
               this.q= decodeURI(r[2]);
            }
            if(window.sessionStorage.getItem('q')!=undefined&&this.q.length==0){
                this.q=window.sessionStorage.getItem('q');
                console.log('5')
            }
            console.log('3')
            let url='/search';
            this.axios.get(url,{
                params: {
                    q: this.q,
                    page: this.page,
                    pagesize: this.pagesize,
                },
                responseType:'json',
            })
            .then(res=>{
                if(res.data.code==0){
                    this.data_loading=false;
                    this.shangjia_list=res.data.shangjia_list;
                    if(this.shangjia_list.length<1){
                        this.isEmpty=true;
                    }else{
                        this.isEmpty=false;
                    }
                    this.total=res.data.count;
                }else{
                    console.log(res.data.errmsg);
                    // this.$router.push({
                    //     path:'/404'
                    // })
                }
            })
            .catch(err=>{
                // this.$router.push({
                //     path:'/404'
                // })
                console.log(err);
            })
            this.pagenum=Math.ceil(this.total/this.pagesize)
    },
    
    methods: {
      handleCurrentChange(targetpage){
               this.$router.push({
                    path:'/search',
                    query:{
                        q:this.q,page:this.page,
                    }
               }) 
               this.page=targetpage;
                var reg = new RegExp('(^|&)q=([^&]*)(&|$)', 'i');
                var r = window.location.search.substr(1).match(reg);
                if (r != null) {
                this.q= decodeURI(r[2]);
                }
                if(window.sessionStorage.getItem('q')!=undefined&&this.q.length==0){
                    this.q=window.sessionStorage.getItem('q');
                }
                let url='/search';
                this.axios.get(url,{
                    params: {
                        q: this.q,
                        page: this.page,
                    },
                    responseType:'json',
                })
                .then(res=>{
                    if(res.data.code==0){
                        this.data_loading=false;
                        this.shangjia_list=res.data.shangjia_list;
                        if(this.shangjia_list.length<1){
                            this.isEmpty=true;
                        }else{
                            this.isEmpty=false;
                        }
                        this.total=res.data.count;
                    }else{
                        console.log(res.data.errmsg);
                        // this.$router.push({
                        //     path:'/404'
                        // })
                    }
                })
                .catch(err=>{
                    // this.$router.push({
                    //     path:'/404'
                    // })
                    console.log(err);
                })
                this.pagenum=Math.ceil(this.total/this.pagesize)    
        },
        gotoshangjia(id) {
        this.$router.push({
            path: "/shangjiadetail",
            query: {
            shangjiaid: id,
            districtid: this.district.id,
            },
        });
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
  .notfoundtips{
    
    
    h1{
        line-height: 40px;
        font-weight: 500;
        font-size: 40px;
        font-family:"Microsoft YaHei";
    }
   }
.infoshow {
  display: inline-flex;
  float: left;
  width: auto;
  border: 3px solid white;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 7px;
}
.shangjiacontainer {
  display: block;
  width: 100%;
}
  </style>
  