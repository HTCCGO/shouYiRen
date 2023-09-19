<template>
    <div class="MainIndex">
        <div class="MainHeader">
            <el-carousel indicator-position="outside">
                <el-carousel-item v-for="item in cardHeader" :key="item.id">
                    <!-- 利用静态的链接来完成 -->
               <img :src="cardHeader.src" alt="">
                </el-carousel-item>
            </el-carousel>
        </div>

        <el-row>
            <el-col :span="6" v-for="item in cardData" :key="item.id">
                <el-card :body-style="{ padding: '5px' }" shadow="hover">
                    <img :src="cardData.src"
                        class="image">
                    <div style="padding: 14px;">
                        <span>{{ item.title }}</span>
                        <div class="bottom clearfix">
                            <!-- <time class="time">{{ currentDate }}</time> -->
                            <el-button type="primary" class="buttom" size="mini" @click="getCard(item)">立即进入</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="block">
            <el-pagination 
            hide-on-single-page
             @size-change="handleSizeChange" 
             @current-change="handleCurrentChange"
            :current-page="pageNo" :page-sizes="[5, 10, 30, 50]" 
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper" 
            :total="totalCount">
            </el-pagination>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            currentDate: new Date(),
            cardData: [
                { id: 1, title: 'Card 1', itemId: 'Content 1', src: '', text: ' 11' },
                { id: 2, title: 'Card 2', content: 'Content 2', src: '', text: ' 11' },
                { id: 3, title: 'Card 3', content: 'Content 3', src: '', text: ' 11' },
                { id: 4, title: 'Card 3', content: 'Content 3', src: '', text: ' 11' },
                // 添加更多的卡片数据...
            ],
            cardHeader: [
                { id: '1', src: 'header1' },
                { id: '2', src: 'header2' },
                { id: '3', src: 'header3' },
                { id: '4', src: 'header4' },
                { id: '5', src: 'header5' },
            ],
            userList: [],
            pageNo: 1,//默认当前页面为第一页
            pagesize: 4,//默认当前每页的数据为4条
            totalCount: 0//默认总数为0
        }
    },
    //通过路由缓存的方式来进行上一页面的更改
    mounted() {//这部分的函数是在页面的加载之前进行执行的函数
        this.getCount();//获取当前数据的总数
        this.getList();//依照当前的页号和每页的数据量进行查询
        this.getHeader();//返回header的数据
    },
    watch:{
        pageNo:{
            handler(){
                let fromData={
                    pageNo:this.pageNo,
                    pageSize:this.pageSize,
                }
                this.$http.post('/api/seach/page',fromData).then(function(response){
                    this.cardData=response.data;
                })
            }
        }
    },
    destroyed: function () {
    console.log("我已经离开了！");
        this.stopTimer();
},
    methods: {
        getCount() {
            this.$http.post('/getCount').then(res => {
                this.totalCount = res.data;
            })
        },
        getList() {
            let fromData = new FormData();//一个web Api用于创建和处理包含表单数据的对象。它提供了一种方便的方式来捕获表单中的用户输入，并以键值对的形式进行处理
            fromData.append("pageNo", this.pageNo);
            fromData.append("pagesize", this.pagesize);
            //将页面完成数据修改后的两个参数改变为键值对的形式，并存储在fromdata中

            this.$http.post("/getUserList", fromData).then(res => {
                this.userList = res.data;
            })
        },
        getHeader(){
            this.$http.post('/api/seach/getHeader').then(response=>{
                this.cardHeader=response.data;
            })
        },
    },
    getCard(item){
            //将值存储在vuex中，以便在其他的组件中使用
            this.$store.commit('setItemId',item.itemId);
            //转移到新的页面
            this.$router.push('/userItem');
    },
}
</script>

<style lang="less" scoped>
.MainIndex {
    width: 800px;
    margin: auto;
}

.el-pagination {
    text-align: center;
}

.MainHeader {
    padding-bottom: 10px;
}

.el-main {
    padding: 0;
}

.el-card {
    height: 30vh;
    width: 20vh;
    margin: auto;
    margin-bottom: 30px;
}

.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>