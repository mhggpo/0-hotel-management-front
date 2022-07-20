<template>
  <div class="manager">
    <div id="managerTop">
      <div id="logo"></div>
      <span id="title">酒店管理系统</span>
      <span id="user">用户 {{this.uname}} , 你好</span>
    </div>

    <div id="middle">
      <div id="function">
        <el-col :span="12">
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#002244"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1" v-show="(this.power!='前台人员')">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>系统管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="userManager" @click="clickFunction">用户管理</el-menu-item>
             <!--   <el-menu-item index="logManager" @click="clickFunction">日志管理</el-menu-item>-->
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>房客管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="reserveManager" @click="clickFunction">客房预定管理</el-menu-item>
                <el-menu-item index="checkin" @click="clickFunction">入住与结帐管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4" v-show="(this.power!='前台人员')">
              <template slot="title">
                <i class="el-icon-document-copy"></i>
                <span>基础信息维护</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="roomtypeManager" @click="clickFunction">客房类型管理</el-menu-item>
                <el-menu-item index="floorManager" @click="clickFunction">楼层管理</el-menu-item>
                <el-menu-item index="goodstypeManager" @click="clickFunction">商品类别管理</el-menu-item>
                <el-menu-item index="goodsManager" @click="clickFunction">商品管理</el-menu-item>
                <el-menu-item index="memberManager" @click="clickFunction">会员管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

         <!--   <el-menu-item index="consumeManager" @click="oneClickFunction" v-show="(this.power!='前台人员')">
              <i class="el-icon-shopping-cart-2"></i>
              <span slot="title">消费管理</span>
            </el-menu-item>-->

            <el-menu-item index="roomManager" @click="oneClickFunction" v-show="(this.power!='前台人员')">
              <i class="el-icon-setting"></i>
              <span slot="title">客房管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </div>

      <div id="mainFunction">
        <router-view :userID="this.id"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    this.getUserName();
  },
  data() {
    return {
        uname:"",
        id:"",
      power:"",
    };
  },

  methods: {
    show()
    {

    },
    getUserName()
    {
      this.uname=this.$route.query.name;
      this.id=this.$route.query.id;
      this.power=this.$route.query.power;
      console.log(this.id);
    },
    oneClickFunction(keyPath)
    {
      /* console.log(keyPath.index); */
      this.$router.push("/manager/"+keyPath.index);


    },
    clickFunction(keyPath)
    {
      /* console.log(keyPath.index); */
      this.$router.push("/manager/"+keyPath.index);
    },
  },
};
</script>
<style>
.manager
{
  width: 100%;
  height: 100%;
}
#managerTop {
  width: 100%;
  height: 130px;
  background-color: #002244;
 /* background-image: linear-gradient(45deg, #545C64 30%, yellow );*/
  /*background: url("../assets/top.jpg") no-repeat center center; !*加载背景图*! !* 背景图不平铺 *!
  background-size: cover; !* 让背景图基于容器大小伸缩 *!
  background-attachment: fixed;*/
}
#managerTop #title {
  font-size: 25px;
  margin-left: 30px;
  line-height: 120px;
  color: #EDBF71;
}
#managerTop #user {
  float: right;
  margin-top: 100px;
  margin-right: 80px;
  color: white;
}
#managerTop #logo
{
  float: left;
  margin-left: 20px;
  width: 130px;
  height: 120px;

 background: url("../assets/logo.png") no-repeat;
}
.manager #middle {
  width: 100%;

}
.manager #middle #mainFunction
{
  width: 1280px;
  height: 650px;

}
.manager #middle #function,.manager #middle #mainFunction
{
  float: left;
}
.manager #middle #function {
  background-color: #002141;
}
/* 左邊導航栏width更改 */
.manager #function .el-col-12 {
  width: 298px;
  height: 700px;

}
.manager #function .el-menu
{
  width: 298px;

}
</style>