<template>
  <div id="checkin">
    <div id="addAndSearch">

      <div id="search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-select v-model="formInline.searchType" filterable placeholder="请选择">
            <el-option
                v-for="item in searchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>

          <el-input v-model="formInline.searchInfo" placeholder="搜寻"></el-input>
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
        <el-table-column  prop="checkIn.id" label="入住单号" width="100">
        </el-table-column>
        <el-table-column prop="roomRegisters[0].room" label="客房编号" width="100">
        </el-table-column>
        <el-table-column prop="rooms[0].type" label="客房类型" width="100">
        </el-table-column>
        <el-table-column prop="roomRegisters[0].deposit" label="押金" width="100">
        </el-table-column>
        <el-table-column prop="roomRegisters[0].guestName" label="预定人" width="100">
        </el-table-column>
        <el-table-column prop="roomRegisters[0].guestIdType" label="证件类别" width="100">
        </el-table-column>
        <el-table-column prop="roomRegisters[0].guestId" label="证件号码" width="100">
        </el-table-column>
        <el-table-column prop="roomRegisters[0].tel" label="联系电话" width="100">
        </el-table-column>
        <el-table-column prop="roomRegisters[0].arriveTime" label="抵店时间" width="180">
        </el-table-column>
        <el-table-column prop="roomRegisters[0].leaveTime" label="离店时间" width="180">
        </el-table-column>
        <el-table-column prop="roomRegisters[0].guestCount" label="入住人数" width="150">
        </el-table-column>
        <el-table-column prop="roomRegisters[0].memberId" label="会员编号" width="150">
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button @click="
            getRow(scope.row);
            centerDialogVisible = true;
            " type="text" size="small">打印入住单
            </el-button>
            <el-button type="text" @click="checkoutDialogVisible = true;checkoutButton(scope.row)"  size="small">结帐</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div id="editDialog">
      <el-dialog
          title="确认入住资料"
          :visible.sync="centerDialogVisible"
          width="30%"
          center
      >
        <div id="print">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="入住单号">
              <el-input v-model="form.checkInId"></el-input>
            </el-form-item>



            <el-form-item label="客房编号">
              <el-input v-model="form.room"></el-input>
            </el-form-item>


            <el-form-item label="标准价">
              <el-input v-model="form.standardPrice"></el-input>
            </el-form-item>

            <el-form-item label="折后价">
              <el-input v-model="form.discountPrice"></el-input>
            </el-form-item>

            <el-form-item label="押金">
              <el-input v-model="form.deposit"></el-input>
            </el-form-item>

            <el-form-item label="入住人">
              <el-input v-model="form.guestName "></el-input>
            </el-form-item>

            <el-form-item label="证件类别">
              <el-input v-model="form.guestIdType "></el-input>
            </el-form-item>

            <el-form-item label="证件号码">
              <el-input v-model="form.guestId "></el-input>
            </el-form-item>

            <el-form-item label="联系电话">
              <el-input v-model="form.tel "></el-input>
            </el-form-item>

            <el-form-item label="抵店时间">
              <el-input v-model="form.arriveTime "></el-input>
            </el-form-item>

            <el-form-item label="离店时间">
              <el-input v-model="form.leaveTime "></el-input>
            </el-form-item>

            <el-form-item label="入住人数">
              <el-input v-model="form.guestCount "></el-input>
            </el-form-item>

            <el-form-item label="会员编号">
              <el-input v-model="form.memberId "></el-input>
            </el-form-item>

            <el-form-item label="会员价">
              <el-input v-model="form.memberPrice"></el-input>
            </el-form-item>

            <el-form-item label="提供早餐">
              <el-input v-model="form.provideBreakfast "></el-input>
            </el-form-item>

            <el-form-item label="定时叫醒">
              <el-input v-model="form.provideClock"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button v-print="'#print'">打印</el-button>
        </span>
      </el-dialog>
    </div>



    <div id="checkInDialog">
      <el-dialog
          title="账单"
          :visible.sync="checkoutDialogVisible"
          width="30%"
          center
      >
        <div>

          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="入住单号">
              <el-input v-model="form.checkInId"></el-input>
            </el-form-item>
            <el-form-item label="客房编号">
              <el-input v-model="form.room"></el-input>
            </el-form-item>
            <el-form-item label="房价">
              <el-input v-model="form.discountPrice"></el-input>
            </el-form-item>
            <el-form-item label="押金">
              <el-input v-model="form.deposit"></el-input>
            </el-form-item>

            <el-form-item label="住宿天数">
              <el-input v-model="form.stayPeriod"></el-input>
            </el-form-item>

            <el-form-item label="住宿费">
              <el-input v-model="form.cost"></el-input>
            </el-form-item>


            <el-form-item label="实际应收">
              <el-input v-model="form.pay"></el-input>
            </el-form-item>

            <el-form-item label="付款方式 ">
              <el-radio-group v-model="form.payType">
                <el-radio label="现金"></el-radio>
                <el-radio label="微信"></el-radio>
                <el-radio label="支付宝"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="实收">
              <el-input v-model="form.getCost"></el-input>
            </el-form-item>

            <el-form-item label="找零">
              <el-input v-model="form.returnCost"></el-input>
            </el-form-item>
            <el-form-item label="备注 ">
              <el-input v-model="form.remarks "></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="checkoutDialogVisible = false;resetForm()">取 消</el-button>
          <el-button @click="getReturnCost()">找回零钱</el-button>
          <el-button
              type="primary"
              @click="
              checkoutDialogVisible = false;
              checkOut();0
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
    this.getRoom("1");
  },
  methods: {

    changeStatus(object)
    {
      if(object==true)
      {
        return "需要";
      }
      else
      {
        return "不需要";
      }
    },
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
      console.log(this.form);
      if (this.inspectInput()) {
        alert("请输入完整信息");
      } else {
        this.addRoom();
      }
    },
    getReturnCost()
    {

      if(this.form.getCost=="")
      {
        alert("请输入付款金额");
      }
      else
      {
        if(this.form.getCost-this.form.pay<0)
        {
          alert("付款金额不足");
        }
        else
        {
          this.form.returnCost=(this.form.getCost-this.form.pay);
          this.form.payType=this.form.payType;
        }

      }

    },
    inspectInput() {
      return this.form.type == "" || this.form.status == "" || this.form.floor == "" || this.form.memberPrice == "" || this.form.discountPrice == "" || this.form.standardPrice == "" || this.form.vipPrice == ""
    },
    inspectSearch() {
      return this.formInline.searchId=="" || this.formInline.type == "" || this.form.status == "" || this.formInline.floor == "" || this.form.standardPrice == ""
    },
    onSearch() {
      console.log(this.formInline);
      if(this.formInline.searchType=="入住单号")
      {
        this.getReserveById();
      }
      else if(this.formInline.searchType=="客房编号")
      {
        this.getReserveByRoomId();
      }
      else if(this.formInline.searchType=="客房类型")
      {
        this.getReserveByStatus();
      }
      else
      {
        this.getReserveByPersonName();
      }


      /* this.getReserveById(); */
    },

    onCheckin(row)
    {
      if( row.reserve.status!="正常"){
        alert("预定状态有误");
      }
      else
      {
        this.checkoutDialogVisible= true;
        this.form.guestName=row.roomRegisters[0].guestName;
        this.form.roomRegistersId = row.roomRegisters[0].id;
      }

    },


    delClick(row) {
      //刪除功能
      //row為當前用戶的數據
      /*console.log(row);*/
      if(row.reserve.status!="正常")
      {
        alert("预定状态有误");
      }
      else{
        this.delRoom(row.reserve.id);
      }

    },
    editButton(row) {
      console.log('test');
      this.form.guestName=row.roomRegisters[0].guestName;
      this.form.guestIdType=row.roomRegisters[0].guestIdType;
      this.form.guestId=row.roomRegisters[0].guestId;
      this.form.tel=row.roomRegisters[0].tel;
      this.form.guestCount=row.roomRegisters[0].guestCount;
      this.form.memberId=row.roomRegisters[0].memberId;
      /*  console.log(row);
        console.log(this.form);*/
      this.editId = row.roomRegisters[0].id;
    },

    resetForm() {
      this.form.guestName="";
      this.form.guestIdType="";
      this.form.guestId="";
      this.form.tel="";
      this.form.guestCount="";
      this.form.memberId="";
      this.form.payType="";
      this.form.getCost="";
      this.form.returnCost="";
    },
    checkoutButton(row)
    {
      this.resetForm();
      console.log(row);
      this.form.checkInId=row.checkIn.id;
      this.form.room=row.rooms[0].id;
      this.form.discountPrice=row.rooms[0].discountPrice;
      this.form.deposit=row.roomRegisters[0].deposit;
      this.form.stayPeriod=(this.stringToDate(row.roomRegisters[0].leaveTime)-this.stringToDate(row.roomRegisters[0].arriveTime))/86400000;
      this.form.cost=this.form.stayPeriod*this.form.discountPrice;
      this.form.pay=this.form.stayPeriod*this.form.discountPrice- this.form.deposit;

    },
    checkOut()
    {
      axios.get(this.http + "delCheckIn?checkInId=" + this.form.checkInId+"&roomId="+this.form.room).then(
          (res) => {
            console.log("成功");
            this.getRoom(1);
          },
          (res) => {
          }
      );


    },
    getRow(row){
      console.log(row);
      this.form.checkInId=row.checkIn.id;
      this.form.memberPrice=row.rooms[0].memberPrice;
      this.form.standardPrice=row.rooms[0].standardPrice;
      this.form.room=row.roomRegisters[0].room;
      this.form.discountPrice=row.rooms[0].discountPrice;
          this.form.guestName=row.roomRegisters[0].guestName;
          this.form.guestIdType=row.roomRegisters[0].guestIdType;
          this.form.guestId=row.roomRegisters[0].guestId;
          this.form.tel=row.roomRegisters[0].tel;
          this.form.arriveTime=row.roomRegisters[0].arriveTime;
          this.form.leaveTime=row.roomRegisters[0].leaveTime;
          this.form.guestCount=row.roomRegisters[0].guestCount;
          this.form.memberId=row.roomRegisters[0].memberId;
          this.form.deposit=row.roomRegisters[0].deposit;

          this.form.roomRegistersId=row.roomRegistersId;
          this.form.provideBreakfast=row.checkIn.provideBreakfast;
          this.form.provideClock=row.checkIn.provideClock;
          this.form.checkInDate=row.checkInDate;
          this.form.remarks=row.remarks;
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

    getRoom(page) {
      axios.get(this.http + "getCheckIn?page=" + page).then(
          (res) => {
            console.log(res);

            this.UserList = res.data.List;

            for(var i=0;i<this.UserList.length;i++)
            {
              this.UserList[i].roomRegisters[0].arriveTime=this.formatDate(this.UserList[i].roomRegisters[0].arriveTime);
              this.UserList[i].roomRegisters[0].leaveTime=this.formatDate(this.UserList[i].roomRegisters[0].leaveTime);
              this.UserList[i].checkIn.provideBreakfast=this.changeStatus( this.UserList[i].checkIn.provideBreakfast);
              this.UserList[i].checkIn.provideClock=this.changeStatus( this.UserList[i].checkIn.provideClock);
            }

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
            /* console.log(this.totalPage); */

          },
          (res) => {
          }
      );
    },
    addRoom() {
      axios
          .get(
              this.http + "addRoom?type=" +
              this.form.type +
              "&floor=" +
              this.form.floor + "&status=" + this.form.status +
              "&standardPrice=" + this.form.standardPrice +
              "&discountPrice=" + this.form.discountPrice +
              "&memberPrice=" + this.form.memberPrice +
              "&vipPrice=" + this.form.vipPrice +
              "&remarks=" + this.form.remarks
          )
          .then(
              (res) => {
                /* console.log("addFinish"); */
                this.getRoom(this.nowpage);
              },
              (res) => {
              }
          );
    },
    delRoom(id) {

      axios
          .get(this.http + "delReserve?id=" + id)
          .then(
              (res) => {
                /* console.log(res.data);*/
                this.getRoom(this.nowpage);
              },
              (res) => {
              }
          );

    },
    getReserveById() {
      axios
          .get(
              this.http + "selectCheckInById?id=" +this.formInline.searchInfo
          )
          .then(
              (res) => {
                /* console.log(res);*/

                this.UserList = res.data.List;
                for(var i=0;i<this.UserList.length;i++)
                {
                  this.UserList[i].roomRegisters[0].arriveTime=this.formatDate(this.UserList[i].roomRegisters[0].arriveTime);
                  this.UserList[i].roomRegisters[0].leaveTime=this.formatDate(this.UserList[i].roomRegisters[0].leaveTime);
                  this.UserList[i].checkIn.provideBreakfast=this.changeStatus( this.UserList[i].checkIn.provideBreakfast);
                  this.UserList[i].checkIn.provideClock=this.changeStatus( this.UserList[i].checkIn.provideClock);
                }
                this.nowpage = 1;
              },
              (res) => {
              }
          );
    },
    getReserveByRoomId() {
      axios
          .get(
              this.http + "selectCheckInByRoomId?id=" +this.formInline.searchInfo
          )
          .then(
              (res) => {
                /* console.log(res);*/

                this.UserList = res.data.List;
                for(var i=0;i<this.UserList.length;i++)
                {
                  this.UserList[i].roomRegisters[0].arriveTime=this.formatDate(this.UserList[i].roomRegisters[0].arriveTime);
                  this.UserList[i].roomRegisters[0].leaveTime=this.formatDate(this.UserList[i].roomRegisters[0].leaveTime);
                  this.UserList[i].checkIn.provideBreakfast=this.changeStatus( this.UserList[i].checkIn.provideBreakfast);
                  this.UserList[i].checkIn.provideClock=this.changeStatus( this.UserList[i].checkIn.provideClock);
                }
                this.nowpage = 1;
              },
              (res) => {
              }
          );
    },
    getReserveByStatus() {
      axios
          .get(
              this.http + "selectCheckInByRoomType?type=" +this.formInline.searchInfo
          )
          .then(
              (res) => {
                /* console.log(res);*/

                this.UserList = res.data.List;
                for(var i=0;i<this.UserList.length;i++)
                {
                  this.UserList[i].roomRegisters[0].arriveTime=this.formatDate(this.UserList[i].roomRegisters[0].arriveTime);
                  this.UserList[i].roomRegisters[0].leaveTime=this.formatDate(this.UserList[i].roomRegisters[0].leaveTime);
                  this.UserList[i].checkIn.provideBreakfast=this.changeStatus( this.UserList[i].checkIn.provideBreakfast);
                  this.UserList[i].checkIn.provideClock=this.changeStatus( this.UserList[i].checkIn.provideClock);
                }
                this.nowpage = 1;
              },
              (res) => {
              }
          );
    },
    getReserveByPersonName() {
      axios
          .get(
              this.http + "selectCheckInByGuestId?id=" +this.formInline.searchInfo
          )
          .then(
              (res) => {
                /* console.log(res);*/

                this.UserList = res.data.List;
                for(var i=0;i<this.UserList.length;i++)
                {
                  this.UserList[i].roomRegisters[0].arriveTime=this.formatDate(this.UserList[i].roomRegisters[0].arriveTime);
                  this.UserList[i].roomRegisters[0].leaveTime=this.formatDate(this.UserList[i].roomRegisters[0].leaveTime);
                  this.UserList[i].checkIn.provideBreakfast=this.changeStatus( this.UserList[i].checkIn.provideBreakfast);
                  this.UserList[i].checkIn.provideClock=this.changeStatus( this.UserList[i].checkIn.provideClock);
                }
                this.nowpage = 1;
              },
              (res) => {
              }
          );
    },
    editClick() {
      axios
          .get(
              this.http + "editroomRegisters?id="+this.editId+"&guestName="+this.form.guestName+"&guestIdType="+this.form.guestIdType+"&guestId="+this.form.guestId+"&tel="+this.form.tel+"&guestCount="+this.form.guestCount+"&memberId="+this.form.memberId
          )
          .then(
              (res) => {
                this.getRoom(this.nowpage);
                this.resetForm();
              },
              (res) => {
              }
          );
    },
  },

  data() {
    return {


      Time:[],
      http: "http://localhost/0_Hotel_Management_war/",
      UserList: [
        {}
      ],
      page: 0,
      nowpage: 1,
      totalPage: 10,
      checkoutDialogVisible: false, //add彈出框屬性

      centerDialogVisible: false, //
      editId: "",
      form: {
        //用戶資料
        guestName:"",
        guestIdType:"",
        guestId:"",
        tel:"",
        arriveTime:"",
        leaveTime:"",
        guestCount:"",
        memberId:"",
        room:"",
        deposit:"",

        checkInId:"",
        type: "",
        floor: "",
        status: "",
        standardPrice: "",
        discountPrice: "",
        memberPrice: "",
        vipPrice: "",
        roomRegistersId:"",
        provideBreakfast:"",
        provideClock:"",
        checkInDate:"",
        remarks:"",

        stayPeriod:"",
        cost:"",
        pay:"",
        payType:"",
        getCost:"",
        returnCost:"",


      },
      formInline: {
        //搜尋用戶
        searchInfo:"",
        searchType:"入住单号",
      },
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
      searchOptions: [
        {
          value: "入住单号",
          label: "入住单号",
        },
        {
          value: "客房编号",
          label: "客房编号",
        },
        {
          value: "客房类型",
          label: "客房类型",
        },
        {
          value: "证件号码",
          label: "证件号码",
        },

      ],
    };
  },
};
</script>

<style>
#checkin {
  width: 100%;
  height: 100%;
  position: relative;

}

#checkin #addAndSearch {
  padding: 20px;
  width: 100%;
  height: 50px;
}

#checkin #addAndSearch .el-input {
  width: 200px;
}

#checkin #addAndSearch #add {
  float: left;
}

#checkin #addAndSearch #search {
  float: right;
  margin-right: 60px;
}
#checkin #addAndSearch #search .searchSpan
{
  margin-left: 20px;
  font-size: 12px;
}
#checkin #addAndSearch #search .el-input {
  width: 120px;
}

#checkin #editDialog .el-input {
  width: 280px;
}

#checkin #checkInDialog .el-input {
  width: 280px;
}

#checkin #page {
  bottom:-40px;
  left:50%;
  position: absolute;
}

#checkin #formDiv .el-table th, #checkin #formDiv .el-table tr, #checkin #formDiv .el-table__empty-block, #checkin .el-table__row td {
  border: 1px solid #CBCBCB;
  background-color: #EEEEEE;
}

#checkin .el-form-item__label {
  width: 100px !important;
}

#checkin .el-dialog {
  margin-top: 20px !important;
}
</style>

