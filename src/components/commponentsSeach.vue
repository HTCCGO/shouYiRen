<template>
    <div class="MainIndex">
        <div v-if="seach">
   <el-row style="height: 69vh;">
            <el-col :span="6" v-for="item in cardData" :key="item.id">
                <el-card :body-style="{ padding: '5px' }" shadow="always">
                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                        class="image">
                    <div style="padding: 14px;">
                        <span>{{ item.cardTitle }}</span>
                        <div class="bottom clearfix">
                            <el-button type="primary" class="buttom" size="mini" @click="getItem(item)">立即进入</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="block">
            <el-pagination
             hide-on-single-page
            :current-page="pageNo" 
            :page-sizes="[5, 10, 30, 50]" 
            :page-size="pagesize"
            layout="prev, pager, next" 
            :total="totalCount"
            @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        </div>

        <div v-else>
            <div class="Main">
                <span class="Main_span">未找到对应的数据</span>
            </div>
        </div>
     

    </div>
</template>

<script>
export default {
    data() {
        return {
            cardData: [
                { id: 1, title: 'Card 1', content: 'Content 1', src: '', text: ' 11' },
                { id: 2, title: 'Card 2', content: 'Content 2', src: '', text: ' 11' },
                { id: 3, title: 'Card 3', content: 'Content 3', src: '', text: ' 11' },
                { id: 4, title: 'Card 3', content: 'Content 3', src: '', text: ' 11' },
                { id: 5, title: 'Card 1', content: 'Content 1', src: '', text: ' 11' },
                { id: 6, title: 'Card 2', content: 'Content 2', src: '', text: ' 11' },
                { id: 7, title: 'Card 3', content: 'Content 3', src: '', text: ' 11' },
                { id: 8, title: 'Card 3', content: 'Content 3', src: '', text: ' 11' },
                // 添加更多的卡片数据...
            ],
            pageNo: 1,//默认当前页面为第一页
            pagesize: 8,//默认当前每页的数据为4条
            totalCount: 0,//默认总数为0
            pageNumber:1,
            seach:false,
        }
    },
    mounted() {//这部分的函数是在页面的加载之前进行执行的函数
        this.getCount();//获取当前数据的总数
        this.getSeach();//发送查询信息
    },
    methods: {
        handleCurrentChange(pageNumber){
            this.pageNumber=pageNumber;
            this.getSeach(pageNumber);
        },
        getCount() {
            this.$http.post('/api/seach/getCount',{ seach_txt:this.$store.state.seach_txt,}).then(res => {
                this.totalCount = res.data.data;
            })
        },
        getList(pageNumber) {
           const fromData = {
                pageNo: pageNumber,
                pageSize: this.pagesize,
                seach_txt:this.$store.state.seach_txt,
        }
            //将页面完成数据修改后的两个参数改变为键值对的形式，并存储在fromdata中

            this.$http.post("/api/seach/page", fromData).then(res => {
                if( res.data.data){
                this.cardData = res.data.data;
                this.seach=true;
                }
            });
        },
        getSeach(){
            const fromData={
                pageNo:this.pageNumber,
                pageSize:this.pagesize,
                seach_txt:this.$store.state.seach_txt,
            }
            this.$http.post('/api/seach',fromData).then(res =>{
                console.log(res);
                if( res.data.data.length !== 0){
                this.cardData = res.data.data;
                this.seach=true;
                }else{
                    this.seach=false;
                }
            }).catch(err=>{
                console.log(err.message);
            });
        },
        getItem(item){
            this.$http.post("/api/userItem/addView",item.itemId);
            //传递ItemId的值
            this.$store.commit("setItemId",item.itemId);
            //传到userItem界面
            this.$router.push("/userItem");
        }
    },

}
</script>

<style lang="less" scoped>
.Main{
    height: 72.6vh;
}
.Main_span{
    display: inline-block;
    margin-left: 40%;
    margin-top: 30%;
     font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;;
    font-size: 15px;
    color: #999;
    }
.MainIndex {
    width: 800px;
    margin: auto;
    margin-top: 20px;
    height: 72.6vh;
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