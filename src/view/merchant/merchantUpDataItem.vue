<template>
    <div>
        <div class="Main">
            <el-form ref="form" :model="form" label-width="80px" enctype="multipart/form-data">
                <el-form-item label="物品名称">
                    <el-input v-model="form.username" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="物品图片">
                    <el-upload class="upload-demo" action="http://localhost:3000/post" :on-preview="handlePreview"
                        :on-remove="handleRemove" multiple :limit="5" :on-exceed="handleExceed" :on-error="handleError"
                        :on-success="handleSucces" :before-upload="beforeUpload" :file-list="fileList"
                        style="width: 200px;">
                        <el-button size="mini" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件,且不超过2MB</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="联系号码">
                    <el-input v-model="form.phoneNumber" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="物品价格">
                    <el-input v-model="form.totalAmount" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker v-model="form.data1" type="date" placeholder="选择日期" style="width: 200px;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker v-model="form.data2" type="date" placeholder="选择日期" style="width: 200px;">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="发货地区">
                    <el-select v-model="form.address" placeholder="请选择发货地区" style="width: 200px;">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="物品标签">
                    <el-checkbox-group v-model="form.type" style="width: 300px;">
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                        <el-checkbox label="地推活动" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="物品简介">
                    <el-input type="textarea" v-model="form.desc" style="width: 250px;" class="text"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()" class="">发布</el-button>
                    <el-button @click="black()">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fileList: [
                {
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }],
            imageUrl: '',
            form: {
                username: '',
                phoneNumber: "",
                totalAmount:0,
                address: "",
                type: [],
                desc: '',
                data1: "",
                daata2: "",
                time: [],
            }
        }
    },
    methods: {
        onSubmit() {
            const formData = {
                username: this.form.username,
                phoneNumber: this.form.phoneNumber,
                //将价格转化为分后进行传输
                totalAmount:(this.form.totalAmount)*100,
                adress: this.form.adress,
                type: this.form.type,
                desc: this.form.desc,
                data1:this.form.data1,
                data2:this.form.data2,
                fileList:this.fileList,
            };
            this.$http.post("/api/post/upDataItem", formData).then(req => {
                if (req.data.data.code !== 200) {
                    //转到成功页面
                    this.$router.push('/success');
                } else {
                    //转到失败页面
                    this.$router.push('/error');
                    //上传到vuex中
                    this.$store.commit("setRouter", "/resetUserInfo");
                }
            }).catch(() => {
                this.$store.commit("setRouter", "/resetUserInfo");
                this.$router.push('/error');
            })
        },
        black() {
            //返回到主页
            this.$router.push("/home");
        },

        //文件列表移除文件时的钩子
        handleRemove(file, fileList) {
            file;
            fileList;
        },

        //点击文件列表中已上传的文件时的钩子
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        handleError(file) {
            console.log(file);
            this.$message.warning(`${file.name}上传失败`);
        },
        handleSucces(response, file) {
            this.$message.success(`${file.name}上传成功`);
            //修改fileList的数值
            const data={
                name:file.name,
                url:response,
            };
            this.fileList.push(data);
        },
        
        beforeUpload(file) {
            //判断文件类型是否为jpg
            const isJPG = file.type === 'image/jpeg';
            //判断文件是否小于2M
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
}
</script>

<style lang="less" scoped>
.Main {
    width: 500px;
    height: 100%;
    margin: auto;
    margin-top: 50px;
    border: 1px solid #ccc;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    padding-top: 50px;
    padding-bottom: 40px;
    padding-left: 150px;
    padding-right: auto;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    border: 1px solid #d9d9d9;
    font-size: 18px;
    color: #8c939d;
    width: 108px;
    height: 108px;
    line-height: 108px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.text {
    overflow: hidden; //消除滚动条
    outline: none;
    resize: none !important;

}

textarea {
    resize: none
}

.upload-demo {
    height: 100%;
    width: 340px;
    margin-bottom: 10px;

    span {
        display: inline-block;
        margin-left: 8px;
    }
}
</style>