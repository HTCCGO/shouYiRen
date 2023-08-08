<template>
    <div style=" display: flex;">
        <!-- 可以通过将父元素设置为display: flex;的布局容器下以实现能够将多个div对象放置在同一行中 -->
        <div class="left">
            <div class="aMessage">
                <span>你好</span>
                <tr></tr>
                <span>这条消息来自:</span>
                <a href="" class="from"></a>
            </div>
        </div>
        <div class="main">
            <div>
                <div class="block_left" style="display: flex;"><el-avatar :size="40" :src="circleUrl"></el-avatar>
                    <div class="block_son">
                        <div class="aLitellsanjiao"></div><span></span>
                    </div>
                </div>
                <div class="block_right" style="display: flex; margin-top: 20px; position: relative; left: 800px;">
                    <div class="block_son">
                        <div class="aLitellsanjiao"></div><span></span>
                    </div>
                    <el-avatar :size="40" :src="circleUrl" style="margin-left: 20px;"></el-avatar>
                </div>
            </div>
            <div class="pinglun">
                <div class="pinglun_top">
                    <!-- 设置图标，以方便完成上传操作 -->

                    <span></span>
                </div>
                <div class="pinglun_main" style="height: 100px; position: relative; top: 60px; left: 860px;">
                    <el-button type="primary" size="small">发送</el-button>
                    <el-button type="danger" size="small">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style lang="less" scoped>
.left {
    height: 700px;
    width: 200px;
    border: 1px solid black;
    margin-top: 20px;
    margin-left: 40px;
    margin-bottom: 20px;
}

.main {
    height: 700px;
    width: 1000px;
    border: 1px solid black;
    margin-top: 20px;
    margin-left: 80px;
    margin-bottom: 20px;
}

.aMessage {
    border-bottom: 1px solid black;
    padding-top: 4px;
    padding-bottom: 7px;
    padding-left: 4px;
}

.block_left {
    margin-left: 5px;
    margin-top: 10px;

    div {
        div {
            width: 0;
            height: 0;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-right: 8px solid black;
            //可以用boder中的透明和black属性来创建一个小三角形
            position: relative;
            left: -8px;
            top: 11px;
        }
    }
}

.block_right {
    margin-left: 5px;

    div {
        div {
            width: 0;
            height: 0;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-left: 8px solid black;
            //可以用boder中的透明和black属性来创建一个小三角形
            position: relative;
            left: 100px;
            top: 11px;
        }
    }
}

.block_son {
    height: 40px;
    width: 100px;
    border: 1px solid black;
    margin-left: 20px;
    border-radius: 10px;
}

// .aLitellsanjiao {
//     width: 0;
//     height: 0;
//     border-top: 8px solid transparent;
//     border-bottom: 8px solid transparent;
//     border-right: 8px solid black;
//     //可以用boder中的透明和black属性来创建一个小三角形
//     position: relative;
//     left: -8px;
//     top: 11px;
// }

.pinglun {
    position: relative;
    top: 485px;
    border: 1px solid black;
}
</style>