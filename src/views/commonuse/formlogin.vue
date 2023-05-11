<template>
  <el-form
    :model="loginruleForm"
    status-icon
    :rules="rules"
    ref="loginruleForm"
    label-width="100px"
    class="demo-loginruleForm"
  >
    <h1 class="sys_name">点餐系统</h1>
    <h1 class="login_text">登录</h1>

    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="loginruleForm.password"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="您的角色" prop="" style="text-align: left">
      <el-checkbox-group
        :max="1"
        v-model="loginruleForm.characterchecked"
        :min="0"
      >
        <el-checkbox
          label="商家用户"
          border
          style="margin-right: 2%"
        ></el-checkbox>
        <el-checkbox label="普通用户" border></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item prop="remember" style="text-align: left">
      <el-checkbox v-model="loginruleForm.remember">保持登录</el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('loginruleForm')"
        >登录</el-button
      >
      <el-button @click="resetForm('loginruleForm')">重置</el-button>
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
        return callback(new Error("此项不能为空"));
      } else {
        return callback();
      }
    };

    return {
      error_message: "",
      loginruleForm: {
        password: "",
        username: "",
        remember: false,
        characterchecked: [],
      },
      rules: {
        password: [
          { required: true, validator: validatePassword, trigger: "blur" },
        ],
        username: [
          { required: true, validator: checkusername, trigger: "blur" },
        ],
        remember: [{ required: true, type: "boolean" }],
        characterchecked: [{ required: true, type: "list" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.loginruleForm.characterchecked[0]);
          if (this.loginruleForm.characterchecked[0] == "普通用户") {
            this.axios
              .post(
                "/userlogin/",
                {
                  username: this.loginruleForm.username,
                  password: this.loginruleForm.password,
                  remember: this.loginruleForm.remember,
                },
                {
                  responseType: "json",
                  // 发送请求的时候, 携带上cookie
                }
              )
              .then((response) => {
                if (response.data.code == 0) {
                  // 跳转页面
                  window.sessionStorage.setItem(
                    "username",
                    response.data.username
                  );
                  this.$router.push({
                    path: "/user-index",
                  });
                } else if (response.data.code === 400) {
                  this.error_message = "用户名或密码错误";
                  this.alert_error();
                }
              })
              .catch((error) => {
                console.log(error);
                this.error_message = "服务器错误";
                this.alert_error();
              });
          } else {
            this.axios
              .post(
                "/shangjialogin/",
                {
                  username: this.loginruleForm.username,
                  password: this.loginruleForm.password,
                  remember: this.loginruleForm.remember,
                },
                {
                  responseType: "json",
                  // 发送请求的时候, 携带上cookie
                }
              )
              .then((response) => {
                if (response.data.code == 0) {
                  // 跳转页面
                  window.sessionStorage.setItem(
                    "username",
                    response.data.username
                  );
                  this.$router.push({
                    path: "/shangjia-index",
                  });
                } else if (response.data.code === 400) {
                  this.error_message = response.data.errmsg;
                  this.alert_error();
                }
              })
              .catch((error) => {
                console.log(error);
                this.error_message = "服务器错误";
                this.alert_error();
              });
          }
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
      this.resetForm("loginruleForm");
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
.demo-loginruleForm {
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
