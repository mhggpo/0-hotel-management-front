<template>
  <div id="background">
    <div id="login">
      <p id="title">酒店管理系统</p>

     
     <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
  <el-form-item
    prop="name"
    label="用户名"
    :rules="[
      { required: true, message: '请输入用户名', trigger: 'blur' },
     
    ]"
  >
    <el-input v-model="dynamicValidateForm.name"></el-input>
  </el-form-item>
  <el-form-item
    v-for="(domain, index) in dynamicValidateForm.domains"
    label="密码"

    :key="domain.key"
    :prop="'domains.' + index + '.value'"
    :rules="{
      required: true, message: '密码不能为空', trigger: 'blur'
    }"
  >
    <el-input v-model="domain.value" :show-password=true></el-input>
  </el-form-item>
  <el-form-item>
    <!--submitForm('dynamicValidateForm')-->
    <el-button type="primary" @click="login()">提交</el-button>
    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
  </el-form-item>
</el-form>
    </div>
  </div>
</template>


<script>
const axios = require("axios");

export default {
  data() {
         return {
           http:"http://localhost/0_Hotel_Management_war/",
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          name: ''
        }
      };

   
  },

  methods: {
    login() {
      axios
          .get(
              this.http+"login?uname="+this.dynamicValidateForm.name+"&pwd="+this.dynamicValidateForm.domains[0].value
          )
          .then(
              (res) => {

                /*console.log(this.dynamicValidateForm.name+this.dynamicValidateForm.domains[0].value);//2個值*/
                console.log(res);
                if (res.data.contains==true)
                {
                  this.$router.push({path:'/manager', query :{ name: this.dynamicValidateForm.name,id:res.data.id,power:res.data.power} });

                }
                else
                {
                  alert("输入有误");
                }

              },
              (res) => {}
          );
    },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      
    
  },
};
</script>


<style>
@import "../css/reset.css";

#background {
  width: 100%;
  height: 100%;
  background: url("../assets/main.jpg") no-repeat center center; /*加载背景图*/ /* 背景图不平铺 */
  background-size: cover; /* 让背景图基于容器大小伸缩 */
  background-attachment: fixed;
}

#login {
  float: right;
  width: 500px;
  height: 100%;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 27px;
}
#login #title {
  width: 500px;
  color: aliceblue;
  text-align: center;
  margin-top: 130px;
  margin-bottom: 80px;
}
#login  .demo-dynamic
{
  margin-left: 40px;
}
#login #title #formDiv {
  margin: 0 auto;
}
#login .el-form-item__label
{
  color: aliceblue;
}
#login .el-input
{
  width:230px;
}
#login #loginName,
#login #loginPwd {
  width: 253px;

  margin: 0 auto;
}
#login #loginPwd {
  margin-top: 1px;
}

#login #loginName *,
#login #loginPwd * {
  float: left;
}
#login #loginName div,
#login #loginPwd div {
  width: 40px;
  background-color: white;
  border-top-left-radius: 1px;

  border: 1px solid #e0e0e0;
}
#login #loginPwd div {
  border-top-left-radius: 0em;
  border-bottom-left-radius: 1px;
  border-top: 0;
}
#login #loginName div i,
#login #loginPwd div i {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  color: #c7c9cd;
}
#login #loginName input,
#login #loginPwd input {
  padding: 0;
  padding-left: 10px;
  border: 0;
  width: 200px;
  height: 40px;
  border-top-right-radius: 1px;
  border: 1px solid #e0e0e0;
  border-left: 0;
}
#login #loginPwd input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 1px;
  border-top: 0;
}
#login #button {
  border: 0;
  padding: 0;
  width: 253.5px;
  height: 40px;
  margin-left: 123px;
}
</style>
