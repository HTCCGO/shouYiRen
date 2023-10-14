<template>
  <div>
    <div class="userHistoryMain">
      <el-table :data="tableData" style="width: 900px;margin: auto;">
        <el-table-column label="编号" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户姓名" width="130">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="订单描述" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.itemDescription }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开始时间" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.start_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.end_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">      
              <el-button size="mini" type="" @click="handleToUserItem(scope.$index, scope.row)">访问</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination :page-size="pagesize" :pager-count="pageNo" layout="prev, pager, next" :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      props: {

      },
      tableData: [{
        id: "2221",
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        start_time: "2016-05-02",
        end_time: "2016-05-02",
        itemDescription: "aaaaaaa",
      }, {
        id: "2221",
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        start_time: "2016-05-02",
        end_time: "2016-05-02",
        itemDescription: "aaaaaaa",
      }, {
        id: "2221",
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        start_time: "2016-05-02",
        end_time: "2016-05-02",
        itemDescription: "aaaaaaa",
      }, {
        id: "2221",
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        start_time: "2016-05-02",
        end_time: "2016-05-02",
        itemDescription: "aaaaaaa",
      }, {
        id: "2221",
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        start_time: "2016-05-02",
        end_time: "2016-05-02",
        itemDescription: "aaaaaaa",
      }, {
        id: "2221",
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        start_time: "2016-05-02",
        end_time: "2016-05-02",
        itemDescription: "aaaaaaa",
      }, {
        id: "2221",
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        start_time: "2016-05-02",
        end_time: "2016-05-02",
        itemDescription: "aaaaaaa",
      }, {
        id: "2221",
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        start_time: "2016-05-02",
        end_time: "2016-05-02",
        itemDescription: "aaaaaaa",
      }],
      pageNo: 1,//默认当前页面为第一页
      pagesize: 8,//默认当前每页的数据为4条
      totalCount: 0,//默认总数为0
      deleteApiNumber:0,
    }
  },
  mounted(){
      this.getUseHistory();//获取tableData的数据
      this.getTotalCount();//
  },
  watch:{
    pageNo:{
      handler(){
        this.getUseHistoryr();
      },
    }
  },
  methods: {
    handleDelete(index, row) {
     this.tableData.splice(index,1);
     this.deleteApiNumber++;
     const fromData={
          id:row.id,
          deleteApiNumber:this.deleteApiNumber,
          pageNo:this.pageNo,
          pagesize:this.pagesize,
     }
      this.$http.post('/api/userHistory/deleteTable',fromData,{
  headers:{
    'Authorization':this.$cookie.get('token'),
  }}).then(req=>{
        this.tableData.push(req.data);
      })
    },
    getUseHistory(){
      const fromData={
          token: this.$cookie.get("token"),
          pageNo:this.pageNo,
          pagesize:this.pagesize,
     }
      this.$http.post('/api/userHistory/user',fromData).then(req=>{
        this.tableData=req.data;
      })
    },
    getTotalCount(){
      this.$http.post('/api/userHistory/getTotalCount',{token:this.$cookie.get("token")}).then(req=>{
        this.totalCount=req.data;
      })
    },
    handleToUserItem(index){
      this.$store.commit("setUserId",this.tableData[index].id);
      this.$router.push("/userItem");
    }
  }
}
</script>

<style lang="less" scoped>
.userHistoryMain {
  width: 1200px;
  border: 1px solid #eaeaea;
  margin: auto;
  margin-top: 25px;
  margin-bottom: 30px;
  border-radius: 8px;
  box-shadow: 0 0 15px #cac6c6;
  padding-top: 50px;
  padding-bottom: 60px;
}

.pagination {
  text-align: center;
}
</style> 