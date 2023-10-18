<template>
  <div>
    <div class="userInfo">
      <el-descriptions title="用户信息">
        <el-descriptions-item label="用户名">{{
          user.username
        }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{
          user.phoneNumber
        }}</el-descriptions-item>
        <el-descriptions-item label="居住地">{{
          user.address
        }}</el-descriptions-item>
        <el-descriptions-item label="备注">
          <!-- 最多三条 -->
          <el-tag size="small" v-for="item in user.remarks" :key="item.index">{{
            item.remark
          }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">{{
          user.workAddress
        }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="userInfoMain">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <el-input
                  v-if="props.row.isEdit"
                  v-model="props.row.name"
                  class="item"
                  size="small"
                ></el-input>
                <span v-else>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <el-input
                  v-if="props.row.isEdit"
                  v-model="props.row.userId"
                  class="item"
                  size="small"
                ></el-input>
                <span v-else>{{ props.row.userId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <el-input
                  v-if="props.row.isEdit"
                  v-model="props.row.category"
                  class="item"
                  size="small"
                ></el-input>
                <span v-else>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <el-input
                  v-if="props.row.isEdit"
                  v-model="props.row.address"
                  class="item"
                  size="small"
                ></el-input>
                <span v-else>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <el-input
                  v-if="props.row.isEdit"
                  v-model="props.row.desc"
                  class="item"
                  size="small"
                ></el-input>
                <span v-else>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品 ID" prop="userId"> </el-table-column>
        <el-table-column label="商品名称" prop="name"> </el-table-column>
        <el-table-column label="描述" prop="desc"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEditTure(scope.$index)"
              v-if="tableData.isEditBf"
              >编辑</el-button
            >
            <el-button
              size="mini"
              @click="handleEditFalse(scope.$index, scope.row)"
              v-else
              >完成</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="pagesize"
        :pager-count="pageNo"
        layout="prev, pager, next"
        :total="totalCount"
        :current-page="pageNumber"
        @current-change="handleCurrentChange"
        class="pagin">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        pageNumber:0,
      },
      tableNumber: 5,
      tableData: [],
      user: {
        username: "kooriookami",
        phoneNumber: "18100000000",
        address: "苏州市",
        remarks: [
          {
            remark: "学校",
          },
        ],
        workAddress: "江苏省苏州市吴中区吴中大道 1188 号",
      },
      pageNo: 7, //默认当前页面为第一页
      pagesize: 5, //默认当前每页的数据为4条
      totalCount: null, //默认总数为0
      deleteApiNumber: 0,
      pageNumber: null,
      currentPage:1,
    };
  },
  mounted() {
    this.getTableData(1); //获取tableData的数据
    this.getUser();
    this.getTotalCount();
  },
  watch: {
    pageNumber: {
      handler() {
      },
    },
  },
  methods: {
    handleDelete(index) {
      //删除选中的数据
      this.tableData.splice(index, 1);
      //将对应的pageNo发送给后端服务器。
      const fromData = {
        userId:this.tableData.userId,
        itemId:this.tableData.itemId,
      };
      this.$http.post("/api/userInfo/deleteTableData", fromData).then(()=> {
        this.handleCurrentChange(this.pageNumber);
      });
      this.deleteApiNumber++;
    },
    handleEditTure(index,row) {
      //设置为input可见
      this.tableData[index].isEdit = !this.tableData[index].isEdit;
      this.tableData[index].isEditBf = !this.tableData[index].isEditBf;
      row;
    },

    handleEditFalse(index, row) {
      this.tableData[index].isEdit = !this.tableData[index].isEdit;
      this.tableData[index].isEditBf = !this.tableData[index].isEditBf;
      this.tableData[index] = row;
      const fromData = row;
      //发送修改服务器的地址到后端去
      this.$http.post("/api/userIndo/getTableData", fromData);
    },

    handleCurrentChange(pageNumber){
      this.pageNumber = pageNumber;
      this.getTableData(pageNumber);
    },

    getTableData(PageNumber) {
      const fromData = {
        token: this.$cookie.get("token"),
        pageNo: PageNumber,
      };

      this.$http.post("/api/userInfo/tableData", fromData).then((req) => {
          this.tableData=[];   
          let arr=[];
          arr.push(Object.keys(req.data.data).map(function (key) {
            return req.data.data[key];
          }));
          this.tableData = arr[0];
          this.tableData.slice(1,this.tableData.length-1);
          this.tableData.forEach((item) => {
            item.isEditBf = true;
            item.isEdit = false;
          });
      });
    },

    getUser() {
      this.$http
        .post("/api/userInfo/user",{token:this.$cookie.get("token")})
        .then(req=> {
         this.user=req.data.data;
        });
    },

    getTotalCount() {
      this.$http
        .post("/api/userinfo/getTotalCount",{token:this.$cookie.get("token")})
        .then((res) => {
          this.totalCount = res.data.data;
        });
    },
  },
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.userInfoMain {
  width: 800px;
  border: 1px solid #eaeaea;
  margin: auto;
  padding: 25px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
}

.userInfo {
  width: 800px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 30px;
  border: 1px solid #eaeaea;
  padding: 25px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
}

.pagin {
  margin-top: 10px;
  text-align: center;
}

.item {
  height: 10px;
}
</style>

