<template>
  <div id="userManager">
    <div id="addAndSearch">
     
      <div id="search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-select v-model="value" filterable placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input v-model="formInline.search" placeholder="输入"></el-input>

          <el-form-item>
            <el-button type="primary" @click="onSearch()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div id="formDiv">
      <el-table
          :data="UserList.slice(page, page + 6)"
          border
          style="width: 100%"
      >
        <el-table-column fixed prop="id" label="用户编号" width="150">
        </el-table-column>
        <el-table-column prop="uname" label="用戶名" width="180">
        </el-table-column>
        <el-table-column prop="pwd" label="密码" width="180">
        </el-table-column>
        <el-table-column prop="power" label="权限" width="180">
        </el-table-column>
        <el-table-column prop="remarks" label="备注" width="268">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
                type="text"
                @click="
                centerDialogVisible = true;
                editButton(scope.row);
              "
                size="small"
            >编辑</el-button
            >
            <el-button @click="delClick(scope.row)" type="text" size="small"
            >刪除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div id="editDialog">
      <el-dialog
          title="修改用户资料"
          :visible.sync="centerDialogVisible"
          width="30%"
          center
      >
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="用户密码">
              <el-input v-model="form.pwd"></el-input>
            </el-form-item>

            <el-form-item label="权限">
              <el-radio-group v-model="form.resource">
                <el-radio label="管理员"></el-radio>
                <el-radio label="经理"></el-radio>
                <el-radio label="前台人员"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button
              type="primary"
              @click="
              centerDialogVisible = false;
              editClick();
            "
          >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <div id="page">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="this.totalPage"
          @current-change="handleCurrentChange"
          :current-page="nowpage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  mounted() {
    this.getUserList();
  },
  methods: {

    onSearch() {
      console.log(this.formInline.search);
      this.searchById(this.formInline.search);

      /* this.searchById(); */
    },
    delClick(row) {
      //刪除功能
      //row為當前用戶的數據
      /* console.log(row); */
      this.delUser(row.id);
    },
    editButton(row) {
      this.form.name = row.uname;
      this.form.pwd = row.pwd;
      this.form.resource = row.power;
      this.editId = row.id;
    },

    resetForm() {
      this.form.name = "";
      this.form.pwd = "";
      this.form.resource = "";
      this.form.remarks = "";
    },
    handleClose(done) {
      //彈出框屬性
      this.$confirm("确认关闭？")
          .then((_) => {
            done();
          })
          .catch((_) => {});
    },
    handleCurrentChange(val) {
      /* console.log(` ${val}`); */
      this.page = (` ${val}` - 1) * 6;
      this.nowpage=(+`${val}`);
    },
    delPageChange()
    {
      /* console.log("come?");*/
      this.nowpage=this.nowpage-1;
      this.page=this.page-6;

    },
    getUserList() {
      axios.get(this.http+"getPUserList").then(
          (res) => {
           /* console.log(res);*/
            this.UserList = res.data;
            if (res.data.length / 6 != 0) {
              this.totalPage = res.data.length / 6;
            } else {
              this.totalPage = res.data.length / 6 - 1;
            }
            this.totalPage = this.totalPage * 10;
            /* console.log(this.totalPage); */
            if(this.UserList.slice(this.page, this.page + 6).length==0)
            {
              this.delPageChange();
            }
          },
          (res) => {}
      );
    },
    addUser() {
      axios
          .get(
              this.http+"login?uname=" +
              this.form.name +
              "&pwd=" +
              this.form.pwd
          )
          .then(
              (res) => {
                /* console.log("addFinish"); */
                this.getUserList();
              },
              (res) => {}
          );
    },
    delUser(id) {

      axios
          .get(this.http+"delPUser?id=" + id)
          .then(
              (res) => {
                /* console.log("del"); */

                this.getUserList();
                console.log(this.UserList.slice(this.page, this.page + 6));

              },
              (res) => {}
          );

    },
    searchById(search) {
      axios
          .get(
              this.http+"getPUserByID?id=" +
              search
          )
          .then(
              (res) => {
                console.log(res);
                this.UserList = res.data;
              },
              (res) => {}
          );
    },
    editClick() {
      axios
          .get(
              this.http+"updatePUser?id=" +
              this.editId +
              "&uname=" +
              this.form.name +
              "&pwd=" +
              this.form.pwd +
              "&power=" +
              this.form.resource
          )
          .then(
              (res) => {
                this.getUserList();
                this.resetForm();
              },
              (res) => {}
          );
    },
  },

  data() {
    return {
      http:"http://localhost:8080/0_Hotel_Management_war/",
      UserList: [],
      page: 0,
      nowpage: 1,
      totalPage: 10,
      centerDialogVisible: false, //
      editId: "",
      form: {
        //用戶資料
        name: "",
        pwd: "",
        resource: "",
        remarks:"",
      },
      formInline: {
        //搜尋用戶
        search: "",
      },
      options: [
        {
          value: "id",
          label: "用户编号",
        },
        {
          value: "name",
          label: "用户名",
        },
      ],
      value: "id",
    };
  },
};
</script>

<style>
#userManager {
  width: 100%;
  height: 100%;
  position: relative;

}

#userManager #addAndSearch {
  padding: 20px;
  width: 100%;
  height: 50px;
}
#userManager #addAndSearch .el-input {
  width: 200px;
}
#userManager #addAndSearch #add {
  float: left;
}
#userManager #addAndSearch #search {
  float: right;
  margin-right: 60px;
}
#userManager #addAndSearch #search .el-input {
  width: 120px;
}
#userManager #editDialog .el-input {
  width: 280px;
}
#userManager #page {
  bottom: 20px;
  left: 370px;
  position: absolute;
}

#userManager #formDiv .el-table th,#userManager #formDiv  .el-table tr,#userManager #formDiv .el-table__empty-block
{
  border: 1px solid #CBCBCB;
  background-color: #EEEEEE;
}
</style>

