<template>
  <div>
    <div class="dishesshow">
      <h1 style="font-size: 16px; text-align: left">店内菜品</h1>
      <ul v-for="(dishes, i) in dishes_list" :key="i" style="list-style: none">
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
                <template slot="label"> 菜品审核状态 </template>
                <el-tag el-tag size="small" v-if="dishes.isssh == 1"
                  >审核通过</el-tag
                >
                <el-tag el-tag size="small" v-if="dishes.isssh == 2"
                  >审核未通过</el-tag
                >
                <el-tag el-tag size="small" v-if="dishes.isssh == 3"
                  >待审核</el-tag
                >
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 菜品描述 </template>
                {{ dishes.info }}
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
</style>
