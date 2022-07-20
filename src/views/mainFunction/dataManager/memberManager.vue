<template>
  <div id="memberManager">
    <div id="addAndSearch">
      <div id="add">
        <el-button type="text" @click="addDialogVisible = true"
        >增加会员</el-button
        >
        <el-dialog
            title="增加会员"
            :visible.sync="addDialogVisible"
            width="50%"
            :before-close="handleClose"
        >
          <div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>

              <el-form-item label="密码">
                <el-input v-model="form.pwd"></el-input>
              </el-form-item>

              <el-form-item label="性别">
                <el-input v-model="form.sex"></el-input>
              </el-form-item>

              <el-form-item label="电话">
                <el-input v-model="form.tel"></el-input>
              </el-form-item>

              <el-form-item label="地址">
                <el-input v-model="form.addr"></el-input>
              </el-form-item>

              <el-form-item label="Email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>

              <el-form-item label="备注">
                <el-input v-model="form.remark"></el-input>
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
          <el-input v-model="formInline.search"  placeholder="输入"></el-input>

          <el-form-item>
            <el-button type="primary" @click="onSearch()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div id="formDiv">
      <el-table
          :data="MemberList"
          border
          style="width: 100%"
      >
        <el-table-column fixed prop="id" label="会员编号" width="80">
        </el-table-column>
        <el-table-column prop="name" label="会员名" width="80">
        </el-table-column>
        <el-table-column prop="pwd" label="密码" width="100">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="80">
        </el-table-column>
        <el-table-column prop="tel" label="电话" width="100">
        </el-table-column>
        <el-table-column prop="addr" label="地址" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="point" label="积分" width="80">
        </el-table-column>
        <el-table-column prop="isVIP" label="级别" width=120">
        </el-table-column>
        <el-table-column prop="lastIn" label="最后一次入住时间" width="100">
        </el-table-column>
        <el-table-column prop="lastRe" label="最后一次预定时间" width="100">
        </el-table-column>
        <el-table-column  prop="remark" label="备注" width="80">
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
          title="修改会员资料"
          :visible.sync="centerDialogVisible"
          width="30%"
          center
      >
        <div>
          <el-form ref="form" :model="form" label-width="60px">
              <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>

              <el-form-item label="密码">
                <el-input v-model="form.pwd"></el-input>
              </el-form-item>

              <el-form-item label="性别">
                <el-input v-model="form.sex"></el-input>
              </el-form-item>

              <el-form-item label="电话">
                <el-input v-model="form.tel"></el-input>
              </el-form-item>

              <el-form-item label="地址">
                <el-input v-model="form.addr"></el-input>
              </el-form-item>

              <el-form-item label="Email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>

              <el-form-item label="备注">
                <el-input v-model="form.remark"></el-input>
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
    this.getMember("1");
  },
  methods: {
    stringToDate(dateStr,separator){
      if(!separator){
        separator="-";
      }
      var dateArr = dateStr.split(separator);
      var year = parseInt(dateArr[0]);
      var month;
//处理月份为04这样的情况
      if(dateArr[1].indexOf("0") == 0){
        month = parseInt(dateArr[1].substring(1));
      }else{
        month = parseInt(dateArr[1]);
      }
      var day = parseInt(dateArr[2]);
      var date = new Date(year,month -1,day);
      return date;
    },

    getM(month) {
      if (month < 10) {
        return '0' + month;
      } else {
        return month;
      }
    },
    formatDate(time) {
      /*console.log(time);*/
      var date=new Date(time);
      var date=date.getFullYear() + '-' + this.getM(date.getMonth() + 1) + '-' + this.getM(date.getDate())+ ' ' + this.getM(date.getHours()) + ':' + this.getM(date.getMinutes()) + ':' + this.getM(date.getSeconds());;
      return date;
    },
    onSubmit() {
      //增加用戶按鈕
      /* console.log(this.form); */
      if(this.form.name==""||this.form.sex==""|| this.form.pwd=="" || this.form.tel=="" || this.form.addr=="" || this.form.email=="" )
      {
        alert("请输入完整信息");
      }
      else
      {
        this.addMember();
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
      this.delMember(row.id);
    },
    editButton(row) {
      this.editId=row.id;
      this.form.name = row.name;
      this.form.pwd = row.pwd;
      this.form.sex=row.sex;
      this.form.tel=row.tel;
      this.form.addr=row.addr;
      this.form.email=row.email;
    },

    resetForm() {
      this.form.name = "";
      this.form.pwd = "";
      this.form.power = "";
      this.form.remark = "";
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
      this.getMember(val);
      this.nowpage=val;
    },

    getMember(page) {
      axios.get(this.http+"getMember?page="+page).then(
          (res) => {
            console.log(res);

            this.MemberList = res.data.List;
            for(var i=0;i<this.MemberList.length;i++)
            {
              this.MemberList[i].lastIn=this.formatDate(this.MemberList[i].lastIn);
              this.MemberList[i].lastRe=this.formatDate(this.MemberList[i].lastRe);
            }
            if(res.data.List.length==0 && this.nowpage!=1)
            {
              this.nowpage--;
              this.getMember(this.nowpage);
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
    addMember() {
      axios
          .get(
              this.http+"addMember?name=" +
              this.form.name +
              "&pwd=" +
              this.form.pwd +
              "&sex=" +
              this.form.sex+
              "&tel="+
              this.form.tel+
              "&addr="+
              this.form.addr+
              "&email="+
              this.form.email
          )
          .then(
              (res) => {
                /* console.log("addFinish"); */
                this.getMember(this.nowpage);
              },
              (res) => {}
          );
    },
    delMember(id) {

      axios
          .get(this.http+"delMember?id=" + id)
          .then(
              (res) => {
                console.log(res.data);
                this.getMember(this.nowpage);
              },
              (res) => {}
          );

    },
    searchById(search) {
      if(search=="")
      {
        this.getMember(1);
        this.nowpage=1;
      }
      else
      {
        axios
            .get(
                this.http+"searchMemberById?id=" +
                search
            )
            .then(
                (res) => {
                  /* console.log(res);*/

                  this.MemberList = res.data.List;
                  this.nowpage=1;
                },
                (res) => {}
            );
      }

    },
    searchByName(search) {
      if(search=="")
      {
        this.getMember(1);
        this.nowpage=1;
      }
      else
      {
        axios
            .get(
                this.http+"searchMemberByName?name=" +
                search
            )
            .then(
                (res) => {
                  /* console.log(res);*/

                  this.MemberList = res.data.List;
                  this.nowpage=1;
                },
                (res) => {}
            );
      }

    },
    editClick() {
      axios
          .get(
              this.http+"editMember?id="+
              this.editId +
              "&name=" +
              this.form.name +
              "&pwd=" +
              this.form.pwd +
              "&sex=" +
              this.form.sex+
              "&tel="+
              this.form.tel+
              "&addr="+
              this.form.addr+
              "&email="+
              this.form.email
          )
          .then(
              (res) => {
                this.getMember(this.nowpage);
                this.resetForm();
              },
              (res) => {}
          );
    },
  },

  data() {
    return {
      http:"http://localhost:8080/0_Hotel_Management_war/",
      MemberList: [
        {

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
        sex: "",
        tel:"",
        addr:"",
        email:"",
        point:"",
        isVIP:"",
        lastin:"",
        lastRe:"",
        remark:"",

      },
      formInline: {
        //搜尋用戶
        search: "",
      },
      options: [
        {
          value: "id",
          label: "会员编号",
        },
        {
          value: "name",
          label: "会员名",
        },
      ],
      value: "id",
    };
  },
};
</script>

<style>
#memberManager {
  width: 100%;
  height: 100%;
  position: relative;

}

#memberManager #addAndSearch {
  padding: 20px;
  width: 100%;
  height: 50px;
}
#memberManager #addAndSearch .el-input {
  width: 200px;
}
#memberManager #addAndSearch #add {
  float: left;
}
#memberManager #addAndSearch #search {
  float: right;
  margin-right: 60px;
}
#memberManager #addAndSearch #search .el-input {
  width: 120px;
}
#memberManager #editDialog .el-input {
  width: 280px;
}
#memberManager #page {
  bottom: 0;
  left:50%;
  position: absolute;
}

#memberManager #formDiv .el-table th,#memberManager #formDiv .el-table tr,#memberManager #formDiv .el-table__empty-block,#memberManager .el-table__row td
{
  border: 1px solid #CBCBCB;
  background-color: #EEEEEE;
}
</style>

