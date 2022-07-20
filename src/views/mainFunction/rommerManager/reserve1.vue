<template>
  <div id="reserve1">
    <div id="addAndSearch">
      <div id="search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <span class="searchSpan">编号: </span>
          <el-input v-model="formInline.searchId" placeholder="客房编号"></el-input>
          <span class="searchSpan">类型: </span>
          <el-select v-model="formInline.type" filterable placeholder="请选择">
            <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
          <span class="searchSpan">楼层: </span>
          <el-select v-model="formInline.floor" filterable placeholder="请选择">
            <el-option
                v-for="item in floorOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>

          <span class="searchSpan">状态: </span>
          <el-select v-model="formInline.status" filterable placeholder="请选择">
            <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
          <span class="searchSpan">价格: </span>
          <el-input v-model="formInline.standardPrice" placeholder="搜寻"></el-input>
          <el-button type="primary" @click="onSearch()">查询</el-button>
        </el-form>


      </div>
    </div>
    <div id="formDiv">
      <el-table
          :data="UserList"
          border
          style="width: 100%"
      >
        <el-table-column fixed prop="id" label="编号" width="100">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="150">
        </el-table-column>
        <el-table-column prop="floor" label="楼层" width="100">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
        </el-table-column>
        <el-table-column prop="standardPrice" label="标准价格" width="100">
        </el-table-column>
        <el-table-column prop="discountPrice" label="折后价" width="100">
        </el-table-column>
        <el-table-column prop="memberPrice" label="普通会员价" width="100">
        </el-table-column>
        <el-table-column prop="vipPrice" label="Vip会员价" width="100">
        </el-table-column>
        <el-table-column prop="remarks" label="备注" width="150">
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button
                type="text"
                @click="
                editButton(scope.row);
              "
                size="small"
            >预定
            </el-button
            >

            <el-button
                type="text"
                @click="
                checkInButton(scope.row);
              "
            size="small"
            >入住
            </el-button
            >
            <el-button type="text" @click="changeButton(scope.row)" size="small">换房</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <div id="editDialog">
      <el-dialog
          title="预定信息"
          :visible.sync="centerDialogVisible"
          width="30%"
          center
      >
        <div>
          <el-form ref="form" :model="form" label-width="80px">

            <el-form-item label="预定人">
              <el-input v-model="form.guestName"></el-input>
            </el-form-item>

            <el-form-item label="证件类别">
              <el-select v-model="form.guestIdType" filterable placeholder="请选择">
                <el-option
                    v-for="item in guestTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="证件号码">
              <el-input v-model="form.guestId"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="form.tel"></el-input>
            </el-form-item>

            <div class="block" >
              <el-date-picker
                  v-model="Time"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 350px;">
              </el-date-picker>
            </div>

            <el-form-item label="入住人数">
              <el-input v-model="form.guestCount "></el-input>
            </el-form-item>

            <el-form-item label="会员编号">
              <el-input v-model="form.memberId"></el-input>
            </el-form-item>


          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false;resetForm()">取 消</el-button>
          <el-button
              type="primary"
              @click="
              centerDialogVisible = false;
              addClick();
            "
          >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <div id="checkinDialog">
      <el-dialog
          title="入住信息"
          :visible.sync="checkinDialogVisible"
          width="30%"
          center
      >
        <div>
          <el-form ref="form" :model="form" label-width="80px">

            <el-form-item label="预定人">
              <el-input v-model="form.guestName"></el-input>
            </el-form-item>

            <el-form-item label="证件类别">
              <el-select v-model="form.guestIdType" filterable placeholder="请选择">
                <el-option
                    v-for="item in guestTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="证件号码">
              <el-input v-model="form.guestId"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="form.tel"></el-input>
            </el-form-item>

            <div class="block" >
              <el-date-picker
                  v-model="Time"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 350px;">
              </el-date-picker>
            </div>

            <el-form-item label="入住人数">
              <el-input v-model="form.guestCount "></el-input>
            </el-form-item>

            <el-form-item label="会员编号">
              <el-input v-model="form.memberId"></el-input>
            </el-form-item>

            <el-form-item label="早餐">
              <el-radio-group v-model="form.provideBreakfast">
                <el-radio label="需要"></el-radio>
                <el-radio label="不需要"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="定时叫醒">
              <el-radio-group v-model="form.provideClock">
                <el-radio label="需要"></el-radio>
                <el-radio label="不需要"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="备注 ">
              <el-input v-model="form.remarks "></el-input>
            </el-form-item>


          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="checkinDialogVisible = false;resetForm()">取 消</el-button>
          <el-button
              type="primary"
              @click="
              checkinDialogVisible = false;
              addClickDirect();
            "
          >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <div id="changRoomDialog">
      <el-dialog
          title="换房服务"
          :visible.sync="changeRoomDialog"
          width="30%"
          center
      >
        <div>
          <el-form ref="form" :model="form" label-width="80px">

            <el-form-item label="入住单号">
              <el-input v-model="form.changeId"></el-input>
            </el-form-item>


          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="changeRoomDialog = false;resetForm()">取 消</el-button>
          <el-button
              type="primary"
              @click="
              changeRoomDialog = false;
              changeRoom();
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
  props:["userID"],
  mounted() {
    this.getRoom("1");
    console.log(this.userID);

  },

  methods: {
    inspectInput() {
      return this.form.type == "" || this.form.status == "" || this.form.floor == "" || this.form.memberPrice == "" || this.form.discountPrice == "" || this.form.standardPrice == "" || this.form.vipPrice == ""
    },

    onSearch() {
      console.log(this.formInline);
      this.selectRoom();
    },
    delClick(row) {
      //刪除功能
      //row為當前用戶的數據
      /*console.log(row);*/
      this.delRoom(row.id);
    },
    getM(month) {
      if (month < 10) {
        return '0' + month;
      } else {
        return month;
      }
    },
    getNowDate()
    {
      var aData = new Date();
      console.log(aData)

      this.form.date =
          aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
      console.log(this.form.date);
    },
    parseTime() {
      var Date=this.Time[0].getFullYear() + '-' + this.getM(this.Time[0].getMonth() + 1) + '-' + this.getM(this.Time[0].getDate());
      this.arriveTime=Date;
      var Date=this.Time[1].getFullYear() + '-' + this.getM(this.Time[1].getMonth() + 1) + '-' + this.getM(this.Time[1].getDate());
      this.leaveTime=Date;
      for (var i = 0; i < 2; i++) {
        var newDate = this.Time[i].getFullYear() + '-' + this.getM(this.Time[i].getMonth() + 1) + '-' + this.getM(this.Time[i].getDate()) +
            ' ' + this.getM(this.Time[i].getHours()) + ':' + this.getM(this.Time[i].getMinutes()) + ':' + this.getM(this.Time[i].getSeconds());
         /* console.log(newDate);*/
        this.Time[i] = newDate;

      }
     /* console.log(this.arriveTime);
      console.log(this.leaveTime);*/
    },
    changeButton(row)
    {
      if(row.status!="空房")
      {
        alert("这不是一间空房");
      }
      else
      {
        this.changeRoomDialog = true;
        console.log(row);
        this.form.changeRoomId=row.id;
      }

    },
    checkInButton(row)
    {
      if(row.status!="空房")
      {
        alert("这不是一间空房");
      }

      else{
        this.checkinDialogVisible = true;
        this.form.type = row.type;
        this.form.floor = row.floor;
        this.form.standardPrice = row.standardPrice;
        this.form.discountPrice = row.discountPrice;
        this.form.memberPrice = row.memberPrice;
        this.form.vipPrice = row.vipPrice;
        this.editId = row.id;
        this.form.status=row.status;

      }
    },
    editButton(row) {
      console.log(row);
      if(row.status!="空房")
      {
        alert("这不是一间空房");
      }

      else{
        this.centerDialogVisible = true;
        this.form.type = row.type;
        this.form.floor = row.floor;
        this.form.standardPrice = row.standardPrice;
        this.form.discountPrice = row.discountPrice;
        this.form.memberPrice = row.memberPrice;
        this.form.vipPrice = row.vipPrice;
        this.editId = row.id;
        this.form.status=row.status;
      }
      /*   console.log(this.form);*/


    },
    changeRoom()
    {
      axios
          .get(this.http + "changeRoom?checkInId=" + this.form.changeId+"&roomId="+this.form.changeRoomId)
          .then(
              (res) => {
                /*console.log(res.data);*/
                this.getRoom("1");
              },
              (res) => {
              }
          );

    },

    resetForm() {
      this.form.guestName = "";
      this.form.guestIdType = "";
      this.form.guestId = "";
      this.form.tel = "";
      this.form.guestCount = "";
      this.form.memberId = "";
      this.arriveTime = "";
      this.leaveTime = "";
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
      this.getRoom(val);
      this.nowpage = val;
    },
    setChoice()
    {
      if(this.form.provideBreakfast=="需要")
      {
        this.form.provideBreakfast=1;
      }
      else
      {
        this.form.provideBreakfast=0;
      }
      if(this.form.provideClock=="需要")
      {
        this.form.provideClock=1;
      }
      else
      {
        this.form.provideClock=0;
      }
    },
    getRoom(page) {
      axios.get(this.http + "getRoom?page=" + page).then(
          (res) => {
            /*console.log(res);*/

            this.UserList = res.data.List;
            this.floorOption = res.data.OptionFloor;
            this.typeOption = res.data.OptionType;
            if (res.data.List.length == 0 && this.nowpage != 1) {
              this.nowpage--;
              this.getRoom(this.nowpage);
            }

            if (res.data.count / 6 != 0) {
              this.totalPage = res.data.count / 6;
            } else {
              this.totalPage = res.data.count / 6 - 1;
            }
            this.totalPage = this.totalPage * 10;
            this.getOption();
            /* console.log(this.totalPage); */

          },
          (res) => {
          }
      );
    },
    getOption() {
      this.typeOptions = [];
      this.floorOptions = [];
      var share = {
        value: "",
        label: "无",
      }
      this.typeOptions.push(share);
      this.floorOptions.push(share);

      for (var i = 0; i < this.typeOption.length; i++) {
        var add = {
          value: this.typeOption[i],
          label: this.typeOption[i],
        }
        this.typeOptions.push(add);
      }

      for (var i = 0; i < this.floorOption.length; i++) {
        var add = {
          value: this.floorOption[i],
          label: this.floorOption[i],
        }
        this.floorOptions.push(add);
      }
      /*console.log(this.floorOption);*/

    },
    delRoom(id) {
      axios
          .get(this.http + "delRoom?id=" + id)
          .then(
              (res) => {
                /*console.log(res.data);*/
                this.getRoom(this.nowpage);
              },
              (res) => {
              }
          );

    },
    editStatus() {
      axios
          .get(
              this.http + "editRoom?id="+this.editId+"&type=" +
              this.form.type +
              "&floor=" +
              this.form.floor + "&status=预定"  +
              "&standardPrice=" + this.form.standardPrice +
              "&discountPrice=" + this.form.discountPrice +
              "&memberPrice=" + this.form.memberPrice +
              "&vipPrice=" + this.form.vipPrice +
              "&remarks=" + this.form.remarks
          )
          .then(
              (res) => {
                this.getRoom(this.nowpage);
              },
              (res) => {
              }
          );
    },
    selectRoom() {
      axios
          .get(
              this.http + "selectRoom?id=" +
              this.formInline.searchId + "&type=" + this.formInline.type + "&floor=" + this.formInline.floor + "&status=" + this.formInline.status + "&standardPrice=" + this.formInline.standardPrice
          )
          .then(
              (res) => {
                /* console.log(res);*/

                this.UserList = res.data.List;
                this.nowpage = 1;
              },
              (res) => {
              }
          );
    },
    addReserve()
    {
      console.log(this.Time[0]);
      axios
          .get(
              this.http + "addReserve?roomRegister="+this.GID+"&user=2"+"&remarks="+"&status=正常"+"&reserveDate="+this.arriveTime
          )
          .then(
              (res) => {
                this.resetForm();
              },
              (res) => {
              }
          );
    },

    addCheckIn()
    {
      this.setChoice();
      this.getNowDate();
      axios
          .get(
              this.http + "addCheckIn?user=2"+"&roomRegister="+this.GID+"&remarks="+this.form.remarks+"&provideBreakfast="+this.form.provideBreakfast+"&provideClock="+this.form.provideClock+"&checkInDate="+this.form.date

          )
          .then(
              (res) => {
                this.getRoom(this.nowpage);
              },
              (res) => {
              }
          );
    },
    addClick() {
      this.parseTime();

      console.log(this.Time[0]);
      axios
          .get(
              this.http + "addRoomRegister?room="+this.editId + "&deposit=100" + "&guestName=" +
              this.form.guestName +
              "&guestIdType=" +
              this.form.guestIdType + "&guestId=" + this.form.guestId +
              "&tel=" + this.form.tel +
              "&arriveTime=" + this.Time[0] +
              "&leaveTime=" + this.Time[1] +
              "&guestCount=" + this.form.guestCount +
              "&memberId=" + this.form.memberId
          )
          .then(
              (res) => {
                console.log(res.data);
                this.GID=res.data.id;
                /* this.addReserve();*/
                this.editStatus();
                this.addReserve();
              /*  this.resetForm();*/

              },
              (res) => {
              }
          );

    },
    addClickDirect() {
      this.parseTime();
      console.log(this.Time[0]);
      axios
          .get(
              this.http + "addRoomRegister?room="+this.editId + "&deposit=100" + "&guestName=" +
              this.form.guestName +
              "&guestIdType=" +
              this.form.guestIdType + "&guestId=" + this.form.guestId +
              "&tel=" + this.form.tel +
              "&arriveTime=" + this.Time[0] +
              "&leaveTime=" + this.Time[1] +
              "&guestCount=" + this.form.guestCount +
              "&memberId=" + this.form.memberId
          )
          .then(
              (res) => {
                this.GID=res.data.id;
                /* this.addReserve();*/
                this.addCheckIn();

              },
              (res) => {
              }
          );

    },

  },


  data() {
    return {
      GID:"",
      id:"",
      http: "http://localhost:8080/0_Hotel_Management_war/",
      UserList: [
        {}
      ],
      floorOption:[],
      typeOption:[],
      arriveTime:'',
      leaveTime:'',
      Time:[],
      page: 0,
      nowpage: 1,
      totalPage: 10,
      changeRoomDialog: false,
      checkinDialogVisible: false, //add彈出框屬性
      centerDialogVisible: false, //
      editId: "",
      form: {
        //用戶資料
        type: "",
        floor: "",
        guestName: "",
        standardPrice: "",
        guestIdType: "",
        guestId: "",
        tel: "",
        guestCount: "",
        memberId: "",

        date:"",
        status: "",
        discountPrice: "",
        memberPrice: "",
        vipPrice: "",
        roomRegisterId:"",
        provideBreakfast:"",
        provideClock:"",
        checkInDate:"",
        remarks: "",

        changeId:"",
        changeRoomId:"",
      },
      formInline: {
        //搜尋用戶
        searchId: "",
        type: "",
        floor: "",
        status: "",
        standardPrice:"",
      },
      typeOptions: [

      ],
      guestTypeOptions:
      [
        {
          value: "身份证",
          label: "身份证",
        },
        {
          value: "居住证",
          label: "居住证",
        },

      ],
      floorOptions: [

      ],
      statusOptions: [
        {
          value: "空房",
          label: "空房",
        },
        {
          value: "预定",
          label: "预定",
        },
        {
          value: "入住",
          label: "入住",
        },
        {
          value: "",
          label: "无",
        }
      ],
    };
  },
};
</script>

<style>
#reserve1 {
  width: 100%;
  height: 100%;
  position: relative;
}

#reserve1 #addAndSearch {
  padding: 20px;
  width: 100%;
  height: 50px;
}

#reserve1 #addAndSearch .el-input {
  width: 200px;
}

#reserve1 #addAndSearch #add {
  float: left;
}

#reserve1 #addAndSearch #search {
  float: right;
  margin-right: 60px;
}
#reserve1 #addAndSearch #search .searchSpan
{
  margin-left: 20px;
  font-size: 12px;
}
#reserve1 #addAndSearch #search .el-input {
  width: 120px;
}

#reserve1 #editDialog .el-input,#reserve1 #checkinDialog .el-input,#reserve1 #changRoomDialog .el-input {
  width: 280px;
}


#reserve1 #page {
  bottom: -50px;
  left: 50%;
  position: absolute;
}

#reserve1 #formDiv .el-table th, #reserve1 #formDiv .el-table tr, #reserve1 #formDiv .el-table__empty-block, #reserve1 .el-table__row td {
  border: 1px solid #CBCBCB;
  background-color: #EEEEEE;
}

#reserve1 .el-form-item__label {
  width: 100px !important;
}
#reserve1  .block
{
  margin-bottom: 20px;
  margin-left: 30px;
}
#reserve1 .el-dialog {
  margin-top: 20px !important;
}
</style>

