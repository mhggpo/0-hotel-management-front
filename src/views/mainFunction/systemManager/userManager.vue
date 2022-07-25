<template>
  <div id="userManager">
    <div id="addAndSearch">
      <div id="add">
        <el-button type="text" @click="addDialogVisible = true"
          >增加用户</el-button
        >
        <el-dialog
          title="增加用户"
          :visible.sync="addDialogVisible"
          width="50%"
          :before-close="handleClose"
        >
          <div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="用户名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>

              <el-form-item label="用户密码">
                <el-input v-model="form.pwd"></el-input>
              </el-form-item>

              <el-form-item label="备注">
                <el-input v-model="form.remarks"></el-input>
              </el-form-item>

              <el-form-item label="权限">
                <el-radio-group v-model="form.power">
                  <el-radio label="管理员"></el-radio>
                  <el-radio label="经理"></el-radio>
                  <el-radio label="前台人员"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="
                addDialogVisible = false;
                onSubmit();"
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
          <el-input v-model="formInline.search"   @keyup.enter="onSearch()" placeholder="输入"></el-input>

          <el-form-item>
            <el-button type="primary" @click="onSearch()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div id="formDiv">
      <el-table
        :data="UserList"
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

            <el-form-item label="用户密码" >
              <el-input v-model="form.pwd"></el-input>
            </el-form-item>

            <el-form-item label="备注">
              <el-input v-model="form.remarks"></el-input>
            </el-form-item>

            <el-form-item label="权限">
              <el-radio-group v-model="form.power">
                <el-radio label="管理员"></el-radio>
                <el-radio label="经理"></el-radio>
                <el-radio label="前台人员"></el-radio>
              </el-radio-group>
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
    this.getUser("1");
  },
  methods: {
    onSubmit() {
      //增加用戶按鈕
      /* console.log(this.form); */
      if(this.form.name==""||this.form.power==""|| this.form.pwd=="")
      {
        alert("请输入完整信息");
      }
      else
      {
        this.addUser();
      }

    },
    onSearch() {
      console.log(this.formInline.search);

      if(this.value=="id")
      {

        this.searchById(this.formInline.search);
      }
      else
      {
        this.searchByName(this.formInline.search)
      }


      /* this.searchById(); */
    },
    delClick(row) {
      //刪除功能
      //row為當前用戶的數據
       console.log(row);
      this.delUser(row.id);
    },
    editButton(row) {
      this.form.name = row.uname;
      this.form.pwd = row.pwd;
      this.form.power = row.power;
      this.editId = row.id;
    },

    resetForm() {
      this.form.name = "";
      this.form.pwd = "";
      this.form.power = "";
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
      this.getUser(val);
      this.nowpage=val;
    },
  
    getUser(page) {
      axios.get(this.http+"getUser?page="+page).then(
        (res) => {
          console.log(res);

          this.UserList = res.data.List;
          if(res.data.List.length==0 && this.nowpage!=1)
          {
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
          this.http+"addUser?uname=" +
            this.form.name +
            "&pwd=" +
            this.form.pwd+"&power="+this.form.power+"&remarks="+this.form.remarks
        )
        .then(
          (res) => {
            /* console.log("addFinish"); */
            this.getUser(this.nowpage);
          },
          (res) => {}
        );
    },
    delUser(id) {

      axios
        .get(this.http+"delUser?id=" + id)
        .then(
          (res) => {
            console.log(res.data);
            this.getUser(this.nowpage);
          },
          (res) => {}
        );

    },
    searchById(search) {
      if(search=="")
      {
        this.getUser(1);
        this.nowpage=1;
      }
      else
      {
        axios
            .get(
                this.http+"searchUserById?id=" +
                search
            )
            .then(
                (res) => {
                  /* console.log(res);*/

                  this.UserList = res.data.List;
                  this.nowpage=1;
                },
                (res) => {}
            );
      }

    },
    searchByName(search) {
      if(search=="")
      {
        this.getUser(1);
        this.nowpage=1;
      }
      else
      {
        axios
            .get(
                this.http+"searchUserByUname?uname=" +
                search
            )
            .then(
                (res) => {
                  /* console.log(res);*/

                  this.UserList = res.data.List;
                  this.nowpage=1;
                },
                (res) => {}
            );
      }

    },
    editClick() {
      axios
        .get(
          this.http+"editUser?id="+
            this.editId +
            "&uname=" +
            this.form.name +
            "&pwd=" +
            this.form.pwd +
            "&power=" +
            this.form.power+"&remarks="+this.form.remarks
        )
        .then(
          (res) => {
            this.getUser(this.nowpage);
            this.resetForm();
          },
          (res) => {}
        );
    },
  },

  data() {
    return {
      http:"http://localhost/0_Hotel_Management_war/",
      UserList: [
        {
          id:12,
          uname:"timmy",
          pwd:"1234",
          power: "管理员",
          remarks: "",
        }
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
        pwd: "",
        power: "",
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
  bottom: 0;
  left:50%;
  position: absolute;
}

#userManager #formDiv .el-table th,#userManager #formDiv .el-table tr,#userManager #formDiv .el-table__empty-block,#userManager .el-table__row td
{
  border: 1px solid #CBCBCB;
 background-color: #EEEEEE;
}
</style>

