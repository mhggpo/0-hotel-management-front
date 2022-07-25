<template>
  <div id="roomtypeManager">
    <div id="addAndSearch">
      <div id="add">
        <el-button type="text" @click="addDialogVisible = true"
        >增加客房类型
        </el-button
        >
        <el-dialog
            title="增加客房类型"
            :visible.sync="addDialogVisible"
            width="50%"
            :before-close="handleClose"
        >
          <div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="类型名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>

              <el-form-item label="额定人数">
                <el-input v-model="form.capacity"></el-input>
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

          <el-input v-model="formInline.search" @keyup.enter="onSearch()" placeholder="输入客房类型名"
                    style="width: 140px;"></el-input>

          <el-form-item>
            <el-button type="primary" @click="onSearch()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div id="formDiv">
      <el-table
          :data="RoomTypeList"
          border
          style="width: 100%"
      >
        <el-table-column fixed prop="name" label="类型名" width="270">
        </el-table-column>
        <el-table-column prop="capacity" label="额定人数" width="270">
        </el-table-column>

        <el-table-column prop="remarks" label="备注" width="410">
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
            >编辑
            </el-button
            >
            <el-button @click="delClick(scope.row)" type="text" size="small"
            >刪除
            </el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div id="editDialog">
      <el-dialog
          title="修改客房资料"
          :visible.sync="centerDialogVisible"
          width="30%"
          center
      >
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="类型名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="额定人数">
              <el-input v-model="form.capacity"></el-input>
            </el-form-item>

            <el-form-item label="备注">
              <el-input v-model="form.remarks"></el-input>
            </el-form-item>


          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false;resetForm()">取 消</el-button>
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
    this.getRoomType("1");
  },
  methods: {
    onSubmit() {
      //增加用戶按鈕
      /* console.log(this.form); */
      if (this.form.name == "" || this.form.capacity == "") {
        alert("请输入完整信息");
      } else {
        this.addRoomType();
      }

    },
    onSearch() {
      console.log(this.formInline.search);
      this.searchRoomType(this.formInline.search)



    },
    delClick(row) {
      //刪除功能
      //row為當前用戶的數據
      console.log(row);
      this.delRoomType(row.name);
    },
    editButton(row) {
      this.form.name = row.name;
      this.form.capacity = row.capacity;
      this.form.remarks=row.remarks;
    },

    resetForm() {
      this.form.name = "";
      this.form.capacity = "";
      this.form.remarks = "";
    },
    handleClose(done) {
      //彈出框屬性
      this.$confirm("确认关闭？")
          .then((_) => {
            done();
          })
          .catch((_) => {
          });
    },
    handleCurrentChange(val) {
      /*console.log(val);*/
      this.getRoomType(val);
      this.nowpage = val;
    },

    getRoomType(page) {
      axios.get(this.http + "getRoomType?page=" + page).then(
          (res) => {
            console.log(res);

            this.RoomTypeList = res.data.List;
            if (res.data.List.length == 0 && this.nowpage != 1) {
              this.nowpage--;
              this.getRoomType(this.nowpage);
            }

            if (res.data.count / 6 != 0) {
              this.totalPage = res.data.count / 6;
            } else {
              this.totalPage = res.data.count / 6 - 1;
            }
            this.totalPage = this.totalPage * 10;
            /* console.log(this.totalPage); */

          },
          (res) => {
          }
      );
    },
    addRoomType() {
      axios
          .get(
              this.http + "addRoomType?name=" +
              this.form.name +
              "&capacity=" +
              this.form.capacity + "&remarks=" + this.form.remarks
          )
          .then(
              (res) => {
                /* console.log("addFinish"); */
                this.getRoomType(this.nowpage);
              },
              (res) => {
              }
          );
    },
    delRoomType(name) {

      axios
          .get(this.http + "delRoomType?name=" + name)
          .then(
              (res) => {
                console.log(res.data);
                this.getRoomType(this.nowpage);
              },
              (res) => {
              }
          );

    },

    searchRoomType(search) {
      if (search == "") {
        this.getRoomType(1);
        this.nowpage = 1;
      } else {
        axios
            .get(
                this.http + "searchRoomType?name=" +
                search
            )
            .then(
                (res) => {
                  /* console.log(res);*/
                  this.RoomTypeList = res.data.List;
                  this.nowpage = 1;
                },
                (res) => {
                }
            );
      }

    },
    editClick() {
      axios
          .get(
              this.http + "editRoomType?name=" +
              this.form.name +
              "&capacity=" +
              this.form.capacity +
              "&remarks=" + this.form.remarks
          )
          .then(
              (res) => {
                this.getRoomType(this.nowpage);
                this.resetForm();
              },
              (res) => {
              }
          );
    },
  },

  data() {
    return {
      http: "http://localhost/0_Hotel_Management_war/",
      RoomTypeList: [],
      page: 0,
      nowpage: 1,
      totalPage: 10,
      addDialogVisible: false, //add彈出框屬性
      centerDialogVisible: false, //
      editName: "",
      form: {
        //用戶資料
        name: "",
        capacity: "",
        remarks: "",
      },
      formInline: {
        //搜尋用戶
        search: "",
      },

    };
  },
};
</script>

<style>
#roomtypeManager {
  width: 100%;
  height: 100%;
  position: relative;

}

#roomtypeManager #addAndSearch {
  padding: 20px;
  width: 100%;
  height: 50px;
}

#roomtypeManager #addAndSearch .el-input {
  width: 200px;
}

#roomtypeManager #addAndSearch #add {
  float: left;
}

#roomtypeManager #addAndSearch #search {
  float: right;
  margin-right: 60px;
}

#roomtypeManager #addAndSearch #search .el-input {
  width: 120px;
}

#roomtypeManager #editDialog .el-input {
  width: 280px;
}

#roomtypeManager #page {
  bottom: 0;
  left: 50%;
  position: absolute;
}

#roomtypeManager #formDiv .el-table th, #roomtypeManager #formDiv .el-table tr, #roomtypeManager #formDiv .el-table__empty-block, #roomtypeManager .el-table__row td {
  border: 1px solid #CBCBCB;
  background-color: #EEEEEE;
}
</style>

