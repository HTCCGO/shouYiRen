<template>
    <div>
        <div class="Main">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.username" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <el-upload
                         class="avatar-uploader"
                         action="https://jsonplaceholder.typicode.com/posts/"
                         :show-file-list="false"
                         :on-success="handleAvatarSuccess"
                         :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                         <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                </el-form-item>
                <el-form-item label="电话号码">
                    <el-input v-model="form.phoneNumber" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="注册地点">
                    <el-select v-model="form.adress" placeholder="请选择注册地点">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="个人标签">
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                        <el-checkbox label="地推活动" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="个人简介">
                    <el-input type="textarea" v-model="form.desc" style="width: 400px;" class="text"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="setUser()" class="">修改</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="Botton">
            <p>注册成为一名手艺人?</p>
            <el-button type="primary" @click="signIn()" class="'button'">立即注册</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        imageUrl: '',
        form: {
          username: '',
          phoneNumber:"",
          adress:"",
          type: [],
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        const formData={
          username: this.form.username,
          phoneNumber: this.form.phoneNumber,
          adress: this.form.adress,
          type:  this.form.type,
          desc:  this.form.desc,
        };
        this.$http.post("/reset/user",formData).then(req=>{
          if(req.data.data.code !== 200){
            //转到成功页面
                this.$router.push('/success');
          }else{
            //转到失败页面
              this.$router.push('/error');
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      signIn(){
        //转到商户注册页面
        this.$router.push('/merchant');
      },
    }
  }
</script>

<style lang="less" scoped>
.Main {
    width: 700px;
    height: 100%;
    margin: auto;
    border: 1px solid #ccc;
    border-radius: 15px;
     box-shadow: 0 0 25px #cac6c6;
    padding-top: 35px;
    padding-bottom: 10px;
    padding-left: auto;
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
  .text{
    overflow: hidden; //消除滚动条
    outline: none;
    resize: none !important;

  }
  textarea{
resize:none
}
.Botton{
    width: 660px;
    height: 100px;
    margin: auto;
    border: 1px solid #ccc;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    margin-top: 20px;
    padding-top: 15px;
    padding-bottom: 20px;
    padding-left: 15px;
    padding-right: 25px;
    button{
        margin-left: 275px;
    }
    p{
        font-family:"Helvetica Neue";
        line-height: auto;
        text-align: center;
        font-size: 15px;
    }
}
</style>