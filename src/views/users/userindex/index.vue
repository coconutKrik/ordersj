<template>
 <div class="indexpage">
    <div class="header">
        <userheader></userheader>
    </div>
    <div class="main">
        <div style="display: inline-flex;float: left;">
            <el-button
                  type="text"
                  size="small"
                  @click="openform()"
                  >
            <i class="el-icon-location-outline"></i>
            </el-button>
            <span style="display: inline-block;"><p>您当前所在地区：{{ province.name }}{{ city.name }}{{ district.name }}</p></span>
        </div>
        <div id="shade" class="c1 hide">
        <div id="modal" class="c2 hide">
            <h4>请选择您当前所在的地区</h4>
            <label style="margin-right: 3%;">省:</label>
            <el-select
                v-model="province.id"
                placeholder="省级行政区"
                filterable
                @change="loadcity($event,item.name)"
                style=" width: 80%; display:inline-block;margin-bottom: 2%;"
            >
                <el-option
                v-for="item in provicnes"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                >
                </el-option>
            </el-select>
            <br/>
            <label style="margin-right: 3%;">市:</label>
            <el-select
                v-model="city.id"
                placeholder="所在市"
                filterable
                @change="loaddistrict($event,item.name)"
                style="width: 80%; display: inline-block;margin-bottom: 2%;"
            >
                <el-option
                v-for="item in cities"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                >
                </el-option>
            </el-select>
            <br/>
            <label style="margin-right: 3%;">区:</label>
            <el-select
                v-model="district.id"
                placeholder="所在区/县"
                filterable
                @change="getdistrict($event,item.name)"
                style="width: 80%; display: inline-block;margin-bottom: 2%;"
            >
                <el-option
                v-for="item in districts"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                >
                </el-option>
            </el-select>
            <el-button
                style="background-color: rgb(98, 96, 253);color: white;"
                  size="medium"
                  @click="closeform()"
                  >
            确认
            </el-button>
        </div></div>
        <ul v-for="(shangjia,i) in shangjia_list" :key="i" style="width: 100%;list-style: none;">
            <el-descriptions class="margin-top" :title="shangjia.marketname" :column="1" style="width: 100%" @click="gotoshangjia(shangjia.id)">
                <el-descriptions-item v-for="(dishes ,j) in shangjia.dishes_list" :key="j">
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
                                <template slot="label"> 菜品价格 </template>
                                {{ dishes.price }}
                            </el-descriptions-item>
                            <el-descriptions-item>
                                <template slot="label"> 菜品描述 </template>
                                {{ dishes.info }}
                            </el-descriptions-item>
                            </el-descriptions>
                        </span>
                </el-descriptions-item>
            </el-descriptions>
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
import userheader from './../userheader.vue'
 export default {
    name:'userindex',
    components:{
    userheader: userheader,
    
    },
    data(){
        return{
            shangjia_list:[],
            province:{id:330000,name:"浙江省"},
            city:{id:330100,name:"杭州市"},
            district:{id:3301104,name:"钱塘区"},
            provicnes:[],
            cities:[],
            districts:[],
        }
    },
    mounted(){
        let url="/userindex/"+district.id+"/";
        this.axios.get(url,{
            responseType:'json',
        })
        .then(res=>{
            if(res.data.code==0){
                this.shangjia_list=res.data.shangjia_list;
            }else{
                console.log(res.data.errmsg);
            }
        })
        .catch(err=>{
            alert('服务器错误');
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
            } else {
            console.log(res.data.errmsg);
            }
        })
        .catch((err) => {
            alert("服务器错误");
            console.log(err);
        });
    },
    methods:{
        openform() {
            document.getElementById("shade").classList.remove("hide");
            document.getElementById("modal").classList.remove("hide");
        },
        closeform() {
            document.getElementById("shade").classList.add("hide");
            document.getElementById("modal").classList.add("hide");
            let url="/userindex/"+district.id+"/";
            this.axios.get(url,{
                responseType:'json',
            })
            .then(res=>{
                if(res.data.code==0){
                    this.shangjia_list=res.data.shangjia_list;
                }else{
                    console.log(res.data.errmsg);
                }
            })
            .catch(err=>{
                alert('服务器错误');
                console.log(err);
            });
        },
        loadcity(provinceid,name) {
        this.province.name=name;
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
        loaddistrict(cityid,name) {
        this.city.name=name;
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
        getdistrict(stid,name){

            this.district.name=name;
        },
        gotoshangjia(id){
            this.$router.push({
                path:'/shangjiadetail',
                query:{
                    shangjiaid:id,
                    districtid:this.district.id,
                }
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
        background-image: url('../../../assets/southeast.jpg');
        width: 100%;
        height: auto;
        display: inline-block;
        position: relative;
        border-top:2px solid #fe000074;
	    margin:30px 0;
        color:white;
    }
.foot_link{text-align:center;margin-top:30px;}
.foot_link a,.foot_link span{color:#e6e6e6;}
.foot_link a:hover{color:#f821ff}
.foot_link span{padding:0 10px}
.footer p{text-align:center; margin-top:10px;}
.hide {
  display: none;
}
.c1 {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
.c2 {
  background-color: white;
  position: fixed;
  width:25%;
  height: 35%;
  top: 20%;
  left: 5%;
  z-index: 3;
  border-radius: 10px;
}
</style>