<template>
  <div id="floorManager">
    <div id="addAndSearch">
      <div id="add">
        <el-button type="text" @click="addDialogVisible = true"
          >增加楼层</el-button
        >
        <el-dialog
          title="增加楼层"
          :visible.sync="addDialogVisible"
          width="50%"
          :before-close="handleClose"
        >
          <div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="楼层名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>

              <el-form-item label="备注">
                <el-input v-model="form.remarks"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="
                addDialogVisible = false;
                onSubmit();
              "
              >立即创建</el-button
            >
          </span>
        </el-dialog>
      </div>
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
          <el-input
            v-model="formInline.search"
            @keyup.enter="onSearch()"
            placeholder="输入"
          ></el-input>

          <el-form-item>
            <el-button type="primary" @click="onSearch()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div id="formDiv">
      <el-table :data="FloorList" border style="width: 100%">
        <el-table-column fixed prop="name" label="楼层" width="450">
        </el-table-column>
        <el-table-column prop="remarks" label="备注" width="400">
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
        title="修改楼层资料"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
      >
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="楼层名">
              <el-input v-model="form.newName"></el-input>
            </el-form-item>

            <el-form-item label="备注">
              <el-input v-model="form.remarks"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            @click="
              centerDialogVisible = false;
              resetForm();
            "
            >取 消</el-button
          >
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
        <!--上面的屬性 :current-page="nowpage"-->
      </el-pagination>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  mounted() {
    this.getFloor("1");
  },
  methods: {
    onSubmit() {
      //增加楼层按鈕
      /* console.log(this.form); */
      if (this.form.name == "") {
        alert("请输入完整信息");
      } else {
        this.addUser();
      }
    },
    onSearch() {
      console.log(this.formInline.search);
      if (this.value == "id") {
        this.searchById(this.formInline.search);
      } else {
        this.searchByName(this.formInline.search);
      }
      /* this.searchById(); */
    },
    delClick(row) {
      //刪除功能
      //row為當前楼层的數據
      console.log(row);
      this.delFloor(row.name);
    },
    editButton(row) {
      console.log(this.form);
      this.form.name=row.name;
      this.form.newName=row.name
      this.form.remarks = row.remarks;
      this.editId = row.id;
    },
    resetForm() {
      this.form.name = "";
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
      /*console.log(val);*/
      this.getFloor(val);
      this.nowpage = val;
    },

    getFloor(page) {
      axios.get(this.http + "getFloor?page=" + page).then(
        (res) => {
          console.log(res);
          this.FloorList = res.data.List;
          if (res.data.List.length == 0 && this.nowpage != 1) {
            this.nowpage--;
            this.getUser(this.nowpage);
          }
          if (res.data.count / 6 != 0) {
            this.totalPage = res.data.count / 6;
          } else {
            this.totalPage = res.data.count / 6 - 1;
          }
          this.totalPage = this.totalPage * 10;
          /* console.log(this.totalPage); */
        },
        (res) => {}
      );
    },
    addUser() {
      axios
        .get(
          this.http +
            "addFloor?name=" +
            this.form.name +
            "&remarks=" +
            this.form.remarks
        )
        .then(
          (res) => {
            /* console.log("addFinish"); */
            this.getFloor(this.nowpage);
          },
          (res) => {}
        );
    },
    delFloor(id) {
      axios.get(this.http + "delFloor?name=" + id).then(
        (res) => {
          console.log(res.data);
          this.getFloor(this.nowpage);
        },
        (res) => {}
      );
    },
    searchById(search) {
      if (search == "") {
        this.getFloor(1);
        this.nowpage = 1;
      } else {
        axios.get(this.http + "searchFloorById?id=" + search).then(
          (res) => {
            /* console.log(res);*/
            this.FloorList = res.data.List;
            this.nowpage = 1;
          },
          (res) => {}
        );
      }
    },
    searchByName(search) {
      if (search == "") {
        this.getFloor(1);
        this.nowpage = 1;
      } else {
        axios.get(this.http + "searchFloor?name=" + search).then(
          (res) => {
            /* console.log(res);*/
            this.FloorList = res.data.List;
            this.nowpage = 1;
          },
          (res) => {}
        );
      }
    },
    editClick() {
      axios
        .get(
          this.http +
            "editFloor?target=" +
            this.form.name +
            "&name="+this.form.newName+
            "&remarks=" +
            this.form.remarks
        )
        .then(
          (res) => {
            this.getFloor(this.nowpage);
            this.resetForm();
          },
          (res) => {}
        );
    },
  },
  data() {
    return {
      http: "http://localhost:8080/0_Hotel_Management_war/",
      FloorList: [
        {
          id: 12,
          uname: "timmy",
          pwd: "1234",
          power: "管理员",
          remarks: "",
        },
      ],
      page: 0,
      nowpage: 1,
      totalPage: 10,
      addDialogVisible: false, //add彈出框屬性
      centerDialogVisible: false, //
      editId: "",
      form: {
        //用戶資料
        name: "",
        newName:"",
        remarks: "",
      },
      formInline: {
        //搜尋用戶
        search: "",
      },
      options: [
        {
          value: "name",
          label: "楼层名",
        },
      ],
      value: "name",
    };
  },
};
</script>

<style>
#floorManager {
  width: 100%;
  height: 100%;
  position: relative;
}
#floorManager #addAndSearch {
  padding: 20px;
  width: 100%;
  height: 50px;
}
#floorManager #addAndSearch .el-input {
  width: 200px;
}
#floorManager #addAndSearch #add {
  float: left;
}
#floorManager #addAndSearch #search {
  float: right;
  margin-right: 60px;
}
#floorManager #addAndSearch #search .el-input {
  width: 120px;
}
#floorManager #editDialog .el-input {
  width: 280px;
}
#floorManager #page {
  bottom: 0;
  left: 50%;
  position: absolute;
}
#floorManager #formDiv .el-table th,
#floorManager #formDiv .el-table tr,
#floorManager #formDiv .el-table__empty-block,
#floorManager .el-table__row td {
  border: 1px solid #cbcbcb;
  background-color: #eeeeee;
}
</style>
