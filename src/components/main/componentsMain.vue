<template>
  <div class="MainIndex">
    <div class="MainHeader">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in cardHeader" :key="item.id">
          <img :src="item.src" alt="" style="width: 100%; height:100%">
        </el-carousel-item>
      </el-carousel>
    </div>

    <el-row>
      <el-col :span="6" v-for="item in cardData" :key="item.id">
        <el-card :body-style="{ padding: '5px' }" shadow="hover">
          <img :src="item.cardSrc[0]" class="image" />
          <div style="padding: 14px">
            <span>{{ item.cardTitle }}</span>
            <p>&nbsp; {{ item.totalAmount }}&yen;</p>
            <div class="bottom clearfix">
              <!-- <time class="time">{{ currentDate }}</time> -->
              <el-button
                type="primary"
                class="buttom"
                size="mini"
                @click="getCard(item)"
                >立即进入</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="block">
      <el-pagination
        :current-page="pageNo"
        :page-sizes="[5, 10, 30, 50]"
        :page-size="pageSize"
        layout=" prev, pager, next "
        :total="totalCount"
        @current-change="handleCurrentChange"
      >
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
        {
          id: 1,
          title: "Card 1",
          src: "http://localhost:3000/header/OIP.jpg",
          totalAmount: 11,
          userId: "",
        },
        {
          id: 2,
          title: "Card 2",
          src: "http://localhost:3000/header/OIP.jpg",
          totalAmount: 11,
          userId: "",
        },
        {
          id: 3,
          title: "Card 3",
          src: "http://localhost:3000/header/OIP.jpg",
          totalAmount: 11,
          userId: "",
        },
        {
          id: 4,
          title: "Card 3",
          src: "http://localhost:3000/header/OIP.jpg",
          totalAmount: 11,
          userId: "",
        },
        // 添加更多的卡片数据...
      ],
      cardHeader: [
        { id: 1, src: "http://localhost:3000/header/OIP.jpg" },
        { id: 2, src: "http://localhost:3000/header/OIP.jpg" },
        { id:3, src: "http://localhost:3000/header/OIP.jpg" },
        { id: 4, src: "http://localhost:3000/header/OIP.jpg" },
        { id: 5, src: "http://localhost:3000/header/OIP.jpg" },
      ],
      pageNo: 1, //默认当前页面为第一页
      pageSize: 4, //默认当前每页的数据为4条
      totalCount: 0, //默认总数为0
      pageNumber:1,
    };
  },
  //通过路由缓存的方式来进行上一页面的更改
  mounted() {
    //这部分的函数是在页面的加载之前进行执行的函数
    this.getCount(); //获取当前数据的总数
    this.getList(); //依照当前的页号和每页的数据量进行查询
    this.getHeader(); //返回header的数据
  },
  watch: {
    pageNo: {
      handler() {
        this.getList();
      },
    },
  },
  methods: {
    handleCurrentChange(number){
        this.pageNumber=number,
        this.getList();
    },
    getCount() {
      this.$http.post("/api/seach/getCount",{},{headers: {"Content-Type": "application/x-www-form-urlencoded",Authorization: this.$cookie.get("token"),},}).then((res) => {
          this.totalCount = res.data.data;
        }).catch((err) => {
          console.log(err);
        });
    },
    getList() {
      let fromData = {
        pageNo: this.pageNumber,
        pageSize: this.pageSize,
      };
      this.$http.post("/api/seach/page", fromData).then((res) => {
        this.cardData = res.data.data;
      });
    },

    getHeader() {
      this.$http.post("/api/seach/getHeader").then((response) => {
        this.cardHeader = response.data.data;
      });
    },

    getCard(item) {
      const fromData={
        itemId:item.itemId,
        userId:item.userId,
      };
      this.$http.post("/api/userHistory/addHistory",fromData);
      //将值存储在vuex中，以便在其他的组件中使用
      this.$store.commit("setItemId", item.itemId);
      //转移到新的页面
      this.$router.push("/userItem");
    },
  },
};
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
  clear: both;
}

.el-carousel__item img {
  background-color: black;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>