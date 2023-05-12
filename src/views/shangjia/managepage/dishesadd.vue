<template>
  <div>
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
        <el-input v-model="dataruleForm.info" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜品价格" prop="price">
        <el-input v-model="dataruleForm.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜品风味1" prop="taste1">
        <el-input v-model="dataruleForm.taste1" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜品风味2" prop="taste2">
        <el-input v-model="dataruleForm.taste2" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜品风味3" prop="taste3">
        <el-input v-model="dataruleForm.taste3" autocomplete="off"></el-input>
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
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button
          class="submit_button"
          type="primary"
          @click="submitForm('dataruleForm')"
          >增加菜品</el-button
        >
        <el-button class="reset_button" @click="resetForm('dataruleForm')"
          >重置输入</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      error_message: "",
      dataruleForm: {
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .post(
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
                this.$router.go(0);
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
</style>
