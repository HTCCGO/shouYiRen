<template>
  <div>
    <div class="userInfo">
      <el-descriptions title="用户信息">
        <el-descriptions-item label="用户名">{{ user.username }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ user.phoneNumber }}</el-descriptions-item>
        <el-descriptions-item label="居住地">{{ user.address }}</el-descriptions-item>
        <el-descriptions-item label="备注">
          <!-- 最多三条 -->
          <el-tag size="small" v-for="item in user.remarks" :key="item.index">{{ item.remark }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">{{ user.workAddress }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="userInfoMain">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <el-input v-if="props.row.isEdit" v-model="props.row.name" class="item"  size="small"></el-input>
                <span v-else>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <el-input v-if="props.row.isEdit" v-model="props.row.id" class="item"  size="small"></el-input>
                <span v-else>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <el-input v-if="props.row.isEdit" v-model="props.row.category" class="item"  size="small"></el-input>
                <span v-else>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <el-input v-if="props.row.isEdit" v-model="props.row.address" class="item"  size="small"></el-input>
                <span v-else>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <el-input v-if="props.row.isEdit" v-model="props.row.desc" class="item"  size="small"></el-input>
                <span v-else>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品 ID" prop="id">
        </el-table-column>
        <el-table-column label="商品名称" prop="name">
        </el-table-column>
        <el-table-column label="描述" prop="desc">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEditTure(scope.$index)" v-if="scope.row.isEditBf">编辑</el-button>
            <el-button size="mini" @click="handleEditFalse(scope.$index, scope.row)" v-else>完成</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000" class="pagin">
      </el-pagination>
    </div>

  </div>
</template>



<script>
export default {
  data() {
    return {
      props:{

      },
      tableNumber:5,
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
        isEdit:false,
        isEditBf:true
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        isEditBf:true,
        isEdit:false,
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
        isEditBf:true,
        isEdit:false,
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
        isEditBf:true,
        isEdit:false,
      },{
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
        isEditBf:true,
        isEdit:false,
      }],
      user:{
        username:"kooriookami",
        phoneNumber:"18100000000",
        address:"苏州市",
        remarks:[
          {
              remark:"学校",
          }
        ],
        workAddress:"江苏省苏州市吴中区吴中大道 1188 号",
      },
    }
  },
  mounted(){
      // this.getTableData();//获取tableData的数据
      this.getUser();
  }
  ,
  methods: {
    handleDelete(index, row) {
      this.tableData.splice(index,1);
      this.$http.post('/api/userInfo/deletTableData',row.id);
    },
    handleEditTure(index) {
      //设置为input可见
        this.tableData[index].isEdit=!this.tableData[index].isEdit;
        this.tableData[index].isEditBf=!this.tableData[index].isEditBf;
    },
    handleEditFalse(index,row){
      this.tableData[index].isEdit=! this.tableData[index].isEdit;
      this.tableData[index].isEditBf=! this.tableData[index].isEditBf;
      this.tableData[index]=row;
      const fromData=row;
      //发送修改服务器的地址到后端去
      this.$http.post("/api/userIndo/getTableData",fromData);
    },
    getTableData(){
      this.$http.post('/api/userInfo/tableData',this.$cookie.get("token")).then(req=>{
        this.tableData=req.data;
      });
    },
    getUser(){
      this.$http.post('/api/userInfo/user',this.$cookie.get("token")).then(req=>{
        this.tableData=req.data;
      });
    }
  }
}
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

.item{
  height: 10px;
}
</style>

