<template>
    <div>
        <div class="leftsconcat">
            <div class="concat" v-for="item in items" :key="item.index">
                <p>{{ item.message }}</p><br>
                <span>来自于:</span>
                <a href="">{{item.username}}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            items:[
                {
                    username:"2233",
                    message:"2ewe",
                },
                {
                    username:"2211",
                    message:"2231",
                }, {
                    username:"2233",
                    message:"2ewe",
                }
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.leftsconcat{  
    margin: 20px;
    box-shadow:5px 0 15px #cac6c6 ;
    border-radius: 15px;   
    border: 1px solid #eaeaea;
    width: 200px;
    height: 575px;
    overflow: auto;
 
    .concat{
        height: 60px;
        border-bottom: 1px solid #ebeef5;
    }
    p{
        display: inline-block;
        font-family: 'Hiragino Sans GB';
        font-size: 15px;
        margin: 0;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-left: 3px;
    }
    span{
        display: inline-block;
        font-family: 'Hiragino Sans GB';
        font-size: 13px;
        margin-left: 3px;
    }
    a{
        font-family: 'Hiragino Sans GB';
        font-size: 13px;
        text-decoration: none;
        color: #66d9ef;
    }
    a:hover{

    }
}

</style>