<template>
    <div>
        <div class="leftsconcat">
            <div class="concat" v-for="item in items" :key="item.index"  @click="getUserName(item.userId)">
                <p>{{ item.message }}</p><br>
                <span>来自于:</span>
                <span class="username">{{ item.username }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {   userId:"1",
                    username: "2233",
                    message: "2ewe",
                },
                {
                    userId:"2",
                    username: "2211",
                    message: "2231",
                }, {
                    userId:"3",
                    username: "2233",
                    message: "2ewe",
                }
            ],
        }
    },
    mounted(){
        this.$store.commit('setConcatItems',this.items)
        console.log(this.$store.state.userMessageConcatItem);
    },
    methods: {
                emitEvent() {
                    this.$emit("passtofather", this.sonMsg);
                },
                getUserName(index){
                    this.$store.commit('setuserId',index);
                },
            },
}
</script>

<style lang="less" scoped>
.leftsconcat {
    margin: 20px;
    box-shadow: 5px 0 15px #cac6c6;
    border-radius: 15px;
    border: 1px solid #eaeaea;
    width: 200px;
    height: 575px;
    overflow: auto;

    .concat {
        height: 60px;
        border-bottom: 1px solid #ebeef5;
    }

    p {
        display: inline-block;
        font-family: 'Hiragino Sans GB';
        font-size: 15px;
        margin: 0;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-left: 3px;
    }

    span {
        display: inline-block;
        font-family: 'Hiragino Sans GB';
        font-size: 13px;
        margin-left: 3px;
    }

    .username {
        font-family: 'Hiragino Sans GB';
        font-size: 13px;
        text-decoration: none;
        color: #66d9ef;
        cursor: pointer;
    }
}
</style>