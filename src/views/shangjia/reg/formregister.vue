<template>
  <el-form
    :model="registerruleForm"
    status-icon
    :rules="rules"
    ref="registerruleForm"
    label-width="100px"
    class="demo-registerruleForm"
  >
    <h1 class="sys_name">点餐系统</h1>
    <h1 class="login_text">商家注册</h1>

    <el-form-item label="用户名" prop="username">
      <el-input v-model="registerruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="registerruleForm.password"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="registerruleForm.mobile"></el-input>
    </el-form-item>
    <el-form-item label="店铺名" prop="marketname">
      <el-input v-model="registerruleForm.marketname"></el-input>
    </el-form-item>
    <el-form-item label="地区" prop="districtid" style="text-align: left">
      <el-select
        v-model="registerruleForm.provinceid"
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
        v-model="registerruleForm.cityid"
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
        v-model="registerruleForm.districtid"
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
    <el-form-item label="详细地址" prop="place">
      <el-input v-model="registerruleForm.place"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('registerruleForm')"
        >注册</el-button
      >
      <el-button @click="resetForm('registerruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        return callback(new Error("密码长度必须大于等于6"));
      } else {
        return callback();
      }
    };
    var checkusername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (value.length < 1 || value.length > 20) {
          callback(new Error());
        } else {
          var url = "/shangjianame/" + value + "/count/";
          this.axios
            .get(url, {
              responseType: "json",
              withCredentials: true,
            })
            .then((response) => {
              if (response.data.count > 0) {
                callback(new Error("该用户名已被注册"));
              } else {
                callback();
              }
            })
            .catch((error) => {
              console.log(error.response);
            });
        }
      }, 50);
    };
    var checkmobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      setTimeout(() => {
        var pattern =
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if (!pattern.test(value)) {
          callback(new Error("手机号码格式不正确"));
        }
      }, 50);
    };
    var checkmarketname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("店铺名不能为空"));
      }
    };
    var checkplace = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("详细地址不能为空"));
      }
    };

    return {
      provicnes: [],
      cities: [],

      districts: [],

      error_message: "",
      registerruleForm: {
        password: "",
        username: "",
        provinceid: "",
        cityid: "",
        districtid: "",
        marketname: "",
        place: "",
        mobile: "",
      },
      rules: {
        password: [
          { required: true, validator: validatePassword, trigger: "blur" },
        ],
        username: [
          { required: true, validator: checkusername, trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    let url = "/areas/";
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
    submitForm(formName) {
      console.log("heheh");
      this.$refs[formName].validate((valid) => {
        console.log(valid);
        if (valid) {
          this.axios
            .post(
              "/shangjiaregister/",
              {
                username: this.registerruleForm.username,
                password: this.registerruleForm.password,
                provinceid: this.registerruleForm.provinceid,
                cityid: this.registerruleForm.cityid,
                districtid: this.registerruleForm.districtid,
                marketname: this.registerruleForm.marketname,
                place: this.registerruleForm.place,
                mobile: this.registerruleForm.mobile,
              },
              {
                responseType: "json",
              }
            )
            .then((res) => {
              if (res.data.code == 0) {
                alert("商家注册成功");
                this.$router.push({
                  path: "/",
                });
              } else {
                console.log(res.data.errmsg);
              }
            })
            .catch((err) => {
              alert("服务器错误");
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    alert_error() {
      alert(this.error_message);
      this.error_message = "";
      this.resetForm("registerruleForm");
    },
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
  },
};
</script>

<style lang="less" scoped>
div {
  display: inline-block;
  width: 100%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  .submit_button {
    width: 150px;
  }
  .reset_button {
    width: 150px;
  }
}
h1 {
  margin-left: 5%;
}
.sys_name {
  font-weight: 700;
}

/deep/.el-input__inner {
  border: 2px solid #737377;
  margin-top: 5px;
}
/deep/.el-input .el-input__inner::placeholder {
  color: rgba(0, 0, 0, 0.7);
}
.el-button--primary {
  background-color: rgba(0, 0, 255, 0.5);
  border-color: rgba(0, 0, 255, 0.5);
  margin-right: 5%;
}
.demo-registerruleForm {
  padding-right: 5%;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.9);

  ::v-deep .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);

    border-radius: 5px;
  }
}
/deep/.el-checkbox.is-bordered {
  border: 1px solid #000000;
}
</style>
