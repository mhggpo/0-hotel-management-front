<template>
  <div id="goodsManager">
    <div id="addAndSearch">
      <div id="add">
        <el-button type="text" @click="addDialogVisible = true"
        >增加商品
        </el-button
        >
        <el-dialog
            title="增加商品"
            :visible.sync="addDialogVisible"
            width="25%"
            :before-close="handleClose"
        >
          <div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="类型">
                <el-select v-model="form.type" filterable placeholder="请选择">
                  <el-option
                      v-for="item in addOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>


              <el-form-item label="商品名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>

              <el-form-item label="价格">
                <el-input v-model="form.price"></el-input>
              </el-form-item>

              <el-form-item label="单位">
                <el-input v-model="form.unit"></el-input>
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
        <el-table-column fixed prop="goods.id" label="商品代码" width="200">
        </el-table-column>
        <el-table-column prop="goods.name" label="商品名称" width="150">
        </el-table-column>
        <el-table-column prop="goodsTypeList[0].name" label="类别" width="150">
        </el-table-column>
        <el-table-column prop="goods.price" label="价格" width="149">
        </el-table-column>
        <el-table-column prop="goods.unit" label="单位" width="150">
        </el-table-column>
        <el-table-column prop="remarks" label="备注" width="180">
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
          title="修改商品资料"
          :visible.sync="centerDialogVisible"
          width="30%"
          center
      >
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="类型">
              <el-select v-model="form.type" filterable placeholder="请选择">
                <el-option
                    v-for="item in addOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>


            <el-form-item label="商品名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>


            <el-form-item label="价格">
              <el-input v-model="form.price"></el-input>
            </el-form-item>

            <el-form-item label="单位">
              <el-input v-model="form.unit"></el-input>
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
    this.getGoods("1");

  },
  methods: {
    changeGoodsType(type)
    {
      /*console.log(this.value);*/
      for (var i=0;i<this.typeOption.length;i++) {
        /*console.log(this.typeOption.name);*/
        if(type==this.typeOption[i].name)
        {
          return this.typeOption[i].id;
        }

      }

    },
    onSubmit() {
      //增加用戶按鈕
      /*console.log(this.form);*/
      this.form.type=this.changeGoodsType(this.form.type);
      this.addGoods();


    },
    getOption()
    {
      this.typeOptions=[];
      var share=  {
        value: "",
        label: "无",
      }
      this.typeOptions.push(share);

      for (var i=0;i<this.typeOption.length;i++)
      {
        var add=  {
          value: this.typeOption[i].name,
          label: this.typeOption[i].name,
        }

        this.typeOptions.push(add);
      }

      for (var i=0;i<this.typeOption.length;i++)
      {
        var add=  {
          value: this.typeOption[i].name,
          label: this.typeOption[i].name,
        }

        this.addOptions.push(add);
      }
    },
    inspectInput() {
      return this.form.type == "" || this.form.status == "" || this.form.floor == "" || this.form.memberPrice == "" || this.form.discountPrice == "" || this.form.standardPrice == "" || this.form.vipPrice == ""
    },

    onSearch() {
     /* console.log(this.formInline);*/
      this.searchGoods();

    },
    delClick(row) {
      //刪除功能
      //row為當前用戶的數據
      /* console.log(row);*/
      this.delGoods(row.goods.id);
    },
    editButton(row) {
      this.form.type = row.goodsTypeList[0].name;
      this.form.id = row.goods.id;
      this.form.price = row.goods.price;
      this.form.unit=row.goods.unit;
      this.form.name = row.goods.name;
      this.form.remarks=row.goods.remarks;
    },

    resetForm() {
      this.form.type = "";
      this.form.name= "";
      this.form.id = "";
      this.form.price = "";
      this.form.unit = "";
      this.form.remarks="";
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
      this.getGoods(val);
      this.nowpage = val;
    },

    getGoods(page) {
      axios.get(this.http + "getGoods?page=" + page).then(
          (res) => {
            /*console.log(res);*/

            this.UserList = res.data.List;
            this.typeOption=res.data.NameList;

            if (res.data.List.length == 0 && this.nowpage != 1) {
              this.nowpage--;
              this.getGoods(this.nowpage);
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
    addGoods() {
      axios
          .get(
              this.http + "addGoods?name=" +
              this.form.name + "&typeid=" + this.form.type +
              "&price=" + this.form.price +
              "&unit=" + this.form.unit +
              "&remarks=" + this.form.remarks
          )
          .then(
              (res) => {
                /* console.log("addFinish"); */
                this.getGoods(this.nowpage);
              },
              (res) => {
              }
          );
    },
    delGoods(id) {

      axios
          .get(this.http + "delGoods?id=" + id)
          .then(
              (res) => {
                /* console.log(res.data);*/
                this.getGoods(this.nowpage);
              },
              (res) => {
              }
          );

    },
    searchGoods() {
      console.log(this.formInline.type);
      if(this.formInline.type!="")
      {
        this.form.type=this.changeGoodsType(this.formInline.type);
      }
      else
      {
        this.form.type="";
      }
      axios
          .get(
              this.http + "searchGoods?id=" +
              this.form.type
          )
          .then(
              (res) => {
                /*console.log(res);*/

                this.UserList = res.data.List;
                this.typeOption=res.data.NameList;
                this.nowpage = 1;
              },
              (res) => {
              }
          );


    },

    editClick() {
      this.form.type=this.changeGoodsType(this.form.type);
      axios
          .get(
              this.http + "editGoods?id=" +
              this.form.id +
              "&name=" +
              this.form.name + "&typeid=" + this.form.type +
              "&price=" + this.form.price +
              "&unit=" + this.form.unit +
              "&remarks=" + this.form.remarks
          )
          .then(
              (res) => {
                this.getGoods(this.nowpage);
                this.resetForm();
              },
              (res) => {
              }
          );
    },
  },

  data() {
    return {
      value:"无",
      http: "http://localhost/0_Hotel_Management_war/",
      UserList: [
        {}
      ],
      floorOption:[],
      typeOption:[],
      page: 0,
      nowpage: 1,
      totalPage: 10,
      addDialogVisible: false, //add彈出框屬性
      centerDialogVisible: false, //
      editId: "",
      form: {
        //用戶資料
        type: "",
        id:"",
        name:"",
        price: "",
        unit:"",
        remarks:"",
      },
      formInline: {
        //搜尋用戶
        type: "",
      },
      statusOptions: [

      ],
      addOptions: [

      ],
      typeOptions: [


      ],

    };
  },
};
</script>

<style>
#goodsManager {
  width: 100%;
  height: 100%;
  position: relative;

}

#goodsManager #addAndSearch {
  padding: 20px;
  width: 100%;
  height: 50px;
}

#goodsManager #addAndSearch .el-input {
  width: 200px;
}

#goodsManager #addAndSearch #add {
  float: left;
}

#goodsManager #addAndSearch #search {
  float: right;
  margin-right: 60px;
}
#goodsManager #addAndSearch #search .searchSpan
{
  margin-left: 20px;
  font-size: 12px;
}
#goodsManager #addAndSearch #search .el-input {
  width: 120px;
}

#goodsManager #editDialog .el-input {
  width: 280px;
}

#goodsManager #page {
  bottom: 0;
  left: 50%;
  position: absolute;
}

#goodsManager #formDiv .el-table th, #goodsManager #formDiv .el-table tr, #goodsManager #formDiv .el-table__empty-block, #goodsManager .el-table__row td {
  border: 1px solid #CBCBCB;
  background-color: #EEEEEE;
}

#goodsManager .el-form-item__label {
  width: 100px !important;
}

#goodsManager .el-dialog {
  margin-top: 20px !important;
}
</style>

