<template>
  <div id="goodstypeManager">
    <div id="addAndSearch">
      <div id="add">
        <el-button type="text" @click="addDialogVisible = true"
          >增加商品类型
        </el-button>
        <el-dialog
          title="增加商品类型"
          :visible.sync="addDialogVisible"
          width="50%"
          :before-close="handleClose"
        >
          <div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="类型名">
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
          <el-input
            v-model="formInline.search"
            @keyup.enter="onSearch()"
            placeholder="输入商品类型名"
            style="width: 140px"
          ></el-input>

          <el-form-item>
            <el-button type="primary" @click="onSearch()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div id="formDiv">
      <el-table :data="GoodsTypeList" border style="width: 100%">
        <el-table-column fixed prop="name" label="类型名" width="270">
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
            </el-button>
            <el-button @click="delClick(scope.row)" type="text" size="small"
              >刪除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div id="editDialog">
      <el-dialog
        title="修改商品类型资料"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
      >
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="类型名">
              <el-input v-model="form.name"></el-input>
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
    this.getGoodsType("1");
  },
  methods: {
    onSubmit() {
      //增加商品按鈕
      /* console.log(this.form); */
      if (this.form.name == "" || this.form.capacity == "") {
        alert("请输入完整信息");
      } else {
        this.addGoodsType();
      }
    },
    onSearch() {
      console.log(this.formInline.search);
      this.searchGoodsType(this.formInline.search);
    },
    delClick(row) {
      //刪除功能
      //row為當前用戶的數據
      console.log(row);
      this.delGoodsType(row.id);
    },
    editButton(row) {
      this.form.id=row.id;
      this.form.name = row.name;
      this.form.remarks = row.remarks;
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
      this.getGoodsType(val);
      this.nowpage = val;
    },

    getGoodsType(page) {
      axios.get(this.http + "getGoodsType?page=" + page).then(
        (res) => {
          console.log(res);

          this.GoodsTypeList = res.data.List;
          if (res.data.List.length == 0 && this.nowpage != 1) {
            this.nowpage--;
            this.getGoodsType(this.nowpage);
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
    addGoodsType() {
      axios.get(this.http + "addGoodsType?name=" + this.form.name+"&remarks="+this.form.remarks).then(
        (res) => {
          /* console.log("addFinish"); */
          this.getGoodsType(this.nowpage);
        },
        (res) => {}
      );
    },
    delGoodsType(id) {
      axios.get(this.http + "delGoodsType?id=" + id).then(
        (res) => {
          console.log(res.data);
          this.getGoodsType(this.nowpage);
        },
        (res) => {}
      );
    },

    searchGoodsType(search) {
      if (search == "") {
        this.getGoodsType(1);
        this.nowpage = 1;
      } else {
        axios.get(this.http + "searchGoodsType?name=" + search).then(
          (res) => {
            /* console.log(res);*/
            this.GoodsTypeList = res.data.List;
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
            "editGoodsType?id="+this.form.id+"&name=" +
            this.form.name +
            "&remarks=" +
            this.form.remarks
        )
        .then(
          (res) => {
            this.getGoodsType(this.nowpage);
            this.resetForm();
          },
          (res) => {}
        );
    },
  },

  data() {
    return {
      http: "http://localhost/0_Hotel_Management_war/",
      GoodsTypeList: [],
      page: 0,
      nowpage: 1,
      totalPage: 10,
      addDialogVisible: false, //add彈出框屬性
      centerDialogVisible: false, //
      editName: "",
      form: {
        //商品資料
        name: "",
        remarks: "",
      },
      formInline: {
        //搜尋商品
        search: "",
      },
    };
  },
};
</script>

<style>
#goodstypeManager {
  width: 100%;
  height: 100%;
  position: relative;
}

#goodstypeManager #addAndSearch {
  padding: 20px;
  width: 100%;
  height: 50px;
}

#goodstypeManager #addAndSearch .el-input {
  width: 200px;
}

#goodstypeManager #addAndSearch #add {
  float: left;
}

#goodstypeManager #addAndSearch #search {
  float: right;
  margin-right: 60px;
}

#goodstypeManager #addAndSearch #search .el-input {
  width: 120px;
}

#goodstypeManager #editDialog .el-input {
  width: 280px;
}

#goodstypeManager #page {
  bottom: 0;
  left: 50%;
  position: absolute;
}

#goodstypeManager #formDiv .el-table th,
#goodstypeManager #formDiv .el-table tr,
#goodstypeManager #formDiv .el-table__empty-block,
#goodstypeManager .el-table__row td {
  border: 1px solid #cbcbcb;
  background-color: #eeeeee;
}
</style>
