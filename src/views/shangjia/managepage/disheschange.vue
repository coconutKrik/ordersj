<template>
  <div>
    <div class="dishesshow">
      <h1 style="font-size: 16px; text-align: left">店内菜品</h1>
      <ul v-for="(dishes, i) in dishes_list" :key="i" style="list-style: none">
        <div id="shade" class="c1 hide">
          <div id="modal" class="c2 hide">
            <el-form
              :model="dataruleForm"
              status-icon
              :rules="rules"
              ref="dataruleForm"
              label-width="100px"
              class="demo-dataruleForm"
            >
              <el-form-item label="菜品名" prop="dishesname">
                <el-input
                  v-model="dataruleForm.dishesname"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="菜品描述" prop="info">
                <el-input
                  v-model="dataruleForm.info"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="菜品价格" prop="price">
                <el-input
                  v-model="dataruleForm.price"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="菜品风味1" prop="taste1">
                <el-input
                  v-model="dataruleForm.taste1"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="菜品风味2" prop="taste2">
                <el-input
                  v-model="dataruleForm.taste2"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="菜品风味3" prop="taste3">
                <el-input
                  v-model="dataruleForm.taste3"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="菜品图片" style="text-align: left">
                <el-upload
                  class="upload-demo"
                  action="http://127.0.0.1:8000/picupload/"
                  :on-success="handlesuccess"
                  multiple
                  :limit="1"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="submit_button"
                  type="primary"
                  @click="submitForm('dataruleForm')"
                  >修改菜品</el-button
                >
                <el-button
                  class="reset_button"
                  @click="resetForm('dataruleForm')"
                  >放弃更改</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
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
                {{ dishes.taste1 }},{{ dishes.taste2 }},{{ dishes.taste3 }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 菜品价格 </template>
                {{ dishes.price }}
              </el-descriptions-item>

              <el-descriptions-item>
                <template slot="label"> 菜品描述 </template>
                {{ dishes.info }}
              </el-descriptions-item>
              <el-descriptions-item>
                <el-button
                  type="text"
                  size="small"
                  @click="opendishesform(dishes.dishes_id, dishes.num)"
                  >修改</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="deletedishes(dishes.dishes_id)"
                  >删除</el-button
                >
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
  data() {
    return {
      dishes_list: [],
      fileList: [],
      error_message: "",
      dataruleForm: {
        dishesid: 0,
        dishesname: "",
        taste1: "",
        taste2: "",
        taste3: "",
        info: "",
        price: "",
        picture: "",
      },
      rules: {},
    };
  },
  mounted() {
    let url = "/goods/";
    this.axios
      .get(url, {
        responseType: "json",
      })
      .then((res) => {
        if (res.data.code == 0) {
          this.dishes_list = res.data.dishes_list;
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
    opendishesform(dishesid, num) {
      this.dataruleForm.dishesid = dishesid;
      this.dataruleForm.dishesname = this.dishes_list[num].dishesname;
      this.dataruleForm.taste1 = this.dishes_list[num].taste1;
      this.dataruleForm.taste2 = this.dishes_list[num].taste2;
      this.dataruleForm.taste3 = this.dishes_list[num].taste3;
      this.dataruleForm.info = this.dishes_list[num].info;
      this.dataruleForm.price = this.dishes_list[num].price;
      document.getElementById("shade").classList.remove("hide");
      document.getElementById("modal").classList.remove("hide");
    },
    deletedishes(dishesid){
        this.axios.delete('/goods/',{
            dishes_id:dishesid,
        },{
            responseType:'json',
        })
        .then(res=>{
            if(res.data.code==0){
                alert('删除菜品成功');
                this.$router.go(0);
            }else{
                console.log(res.data.errmsg);
            }
        })
        .catch(err=>{
            alert('服务器错误');
            console.log(err);
        })
    },
    submitForm(formName) {
      document.getElementById("shade").classList.add("hide");
      document.getElementById("modal").classList.add("hide");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.put(
              "/goods/",
              {
                dishesname: this.dataruleForm.dishesname,
                taste1: this.dataruleForm.taste1,
                taste2: this.dataruleForm.taste2,
                taste3: this.dataruleForm.taste3,
                info: this.dataruleForm.info,
                price: this.dataruleForm.price,
                picture: this.dataruleForm.picture,
              },
              {
                responseType: "json",
              }
            )
            .then((response) => {
              if (response.data.code == 0) {
                alert("菜品添加成功");
                this.$router.push({
                  path: "shangjiaindex/dishesadd",
                });
              } else {
                this.error_message = response.data.errmsg;
                this.alert_error();
              }
            })
            .catch((error) => {
              console.log(error);
              this.error_message = "服务器错误";
              this.alert_error();
            });
          this.$refs[formName].resetFields();
        } else {
          this.$refs[formName].resetFields();
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      document.getElementById("shade").classList.add("hide");
      document.getElementById("modal").classList.add("hide");
      this.$refs[formName].resetFields();
    },
    alert_error() {
      alert(this.error_message);
      this.error_message = "";
      this.resetForm("dataruleForm");
    },
    handlesuccess(file, fileList) {
      console.log(fileList);
      this.dataruleForm.picture = file.fileurl;
    },
  },
};
</script>

<style lang="less" scoped>
.dishespic {
  display: inline-block;
  width: 15%;
}
.infoshow {
  display: inline-block;
  width: 70%;
}
.el-form {
  margin-top: 2%;
  margin-left: 25%;
  margin-right: 35%;
}
/deep/.el-input__inner {
  border: 1px solid #737377;
  margin-top: 5px;
}
.el-button--primary {
  background-color: rgba(0, 0, 255, 0.5);
  border-color: rgba(0, 0, 255, 0.5);
  margin-left: 20%;
}
.el-button:not(.el-button--primary) {
  background-color: rgba(255, 255, 255, 0.8);
  border-color: rgba(255, 255, 255, 0.8);
}
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
  width: 70%;
  height: 80%;
  top: 10%;
  left: 20%;
  z-index: 3;
}
</style>
