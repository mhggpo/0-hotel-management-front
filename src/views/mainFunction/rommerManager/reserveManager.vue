<template>
  <div id="reserveManager">
    <div id="top">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="客房列表" name="reserve1"></el-tab-pane>
        <el-tab-pane label="预定信息列表" name="reserve2"></el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <router-view :userID=this.userID></router-view>
    </div>
  </div>
</template>

<script>
export default {
  props:['userID'],
  mounted() {
  },
  data() {
    return {
      activeName: 'reserve1'
    };
  },
  methods: {
    /*getUserId()
    {
      this.id=this.$route.query.id;
      console.log(this.id);
    },*/
    handleClick(tab, event) {
      console.log(tab.name);
      this.$router.push('/manager/reserveManager/'+tab.name);
    }
  }
};
</script>

<style>
#reserveManager #top
{
  margin-left: 20px;
  margin-top: 20px
;
}
</style>

