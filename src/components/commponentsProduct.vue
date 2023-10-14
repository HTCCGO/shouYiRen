<template>
    <div>
        <div class="main">
              <el-table :data="tableData" style="width: 100%" >
            <el-table-column prop="date" label="日期" width="130">
            </el-table-column>
            <el-table-column prop="name" label="物品名" width="100">
            </el-table-column>
            <el-table-column prop="address" label="发送地址" width="240">
            </el-table-column>
            <el-table-column prop="product" label="物品金额" width="90">
            </el-table-column>
        </el-table>
        </div>
        <el-pagination :page-size="pageSize" :pager-count="pagerCount" layout="prev, pager, next" :total="totalNumber" :current-page="currentPage" :current-change="currentChange()"  class="pagination">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                product: '123',
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            totalNumber:1000,//最大数值
            pageSize:10,//页面的大小
            pagerCount:10,//总页数
            currentPage:1,//当前页面
        }
    },
    mounted(){
        this.getTatalNumber(),
        this.currentChange()
    },
    methods:{
        currentChange(){
            this.$http.post('/api/product/getCurrentChange',this.currentPage).then(res=>{
                this.tableData=res.data.data;
            }).catch(err=>{
                console.log(err.message);
            })
    },
    getTatalNumber(){
        this.$http.post('/api/product/getTatalNumber').then(res=>{
            this.totalNumber=res.data.data;
        }).catch(err=>{
            console.log(err.message);
        })
    },
},
}
</script>

<style lang="less">
.main{
    width: 600px;
    padding-top: 20px;
    padding-bottom: 30px;
    padding-left: 25px;
    padding-right: 25px;
}

.pagination{
    margin-top: 20px;
    text-align: center;
}
</style>