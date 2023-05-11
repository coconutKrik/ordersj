<template>
  <el-form :model="registerruleForm" status-icon :rules="rules" ref="registerruleForm" label-width="100px" class="demo-registerruleForm" >
    
    <h1 class="sys_name">点餐系统</h1>
    <h1 class="login_text">用户注册</h1>
    
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

    <el-form-item>
      <el-button type="primary" @click="submitForm('registerruleForm')">注册</el-button>
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
    var checkusername = (rule,value,callback)=> {
      if (!value){
        return callback(new Error('用户名不能为空'));
      }
      setTimeout(() => {
        if(value.length<1||value.length>20){
          callback(new Error);
        }else{
          var url = '/username/' + value + '/count/';
          this.axios.get(url, {
              responseType: 'json',
              withCredentials:true,
          }) 
          .then(response => {
            if (response.data.count > 0) {
              callback(new Error('该用户名已被注册'));
                
            } else {
              callback();  
            }
          })
          .catch(error => {
            console.log(error.response);
          })
        }
      }, 50);
    };
    var checkmobile = (rule,value,callback)=> {
      if (!value){
        return callback(new Error('手机号不能为空'));
      }
      setTimeout(() => {
        var pattern=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if(!pattern.test(value)){
          callback(new Error('手机号码格式不正确'));
        }}, 50);
    };
    

    return {   
      error_message: "",
      registerruleForm: {
        password: "",
        username: "",
        mobile:"",
      },
      rules: {
        password: [
          { required: true, validator: validatePassword, trigger: "blur" },
        ],
        username: [
          { required: true, validator: checkusername, trigger: "blur" },
        ],
        
        mobile:[{
          required:true,validator:checkmobile,trigger:"blur"
        }],
       
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid){
          let url="/userregister/";
          this.axios.post(url,{
            username:this.registerruleForm.username,
            password:this.registerruleForm.password,
            mobile:this.registerruleForm.mobile,
          },{
            responseType:'json',
          })
          .then(res=>{
            if(res.data.code==0){
              alert('用户注册成功');
              this.$router.push({
                'path':'/'
              })
            }else{
              console.log(res.data.errmsg);
            }
          })
          .catch(err=>{
            alert('服务器错误');
            console.log(err);
          })
        }else {
          console.log("error submit!!");
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    alert_error() {
      alert(this.error_message);
      this.error_message = "";
      this.resetForm("registerruleForm");
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
h1{
  margin-left: 5%;
}
.sys_name{
  
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
/deep/.el-checkbox.is-bordered{
  border: 1px solid #000000;
}
</style>
