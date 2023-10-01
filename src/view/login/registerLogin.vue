<template>
  <div class="registerLogin_main">
    <h3 class="login_title">注册</h3>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名:" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="phoneNumber">
        <el-input type="tell" v-model="ruleForm.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="验证码:" prop="checkPhoneNumber" class="checkPhoneNumber">
        <el-input type="text" v-model="ruleForm.checkPhoneNumber"></el-input>
      </el-form-item>
      <el-button class="cpn_button" @click="getCode()">{{ codeString }}</el-button>
      <el-form-item>
        <el-button type="primary" @click="submitForm()" class="ti_jiao">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var phoneNumber = (rule, value, callback) => {
      if (value === "") {   
        return callback(new Error('手机号码不能为空'));
      } else if(value.length !== 11){
      return callback(new Error('请输入一个正确的手机号码'));
      }else{
        return callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      }
      callback();
    }
    const checkPhoneNumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (value.length !== 4) {
        callback(new Error('验证码错误'))
      } else {
          callback();
      }
    }
    return {
      ruleForm: {
        username: '',
        pass: '',
        checkPass: '',
        phoneNumber: '',
        checkPhoneNumber: '',
      },
      codeString: '发送验证码',
      isTrigger: false,
      rules: {
        username: [{
          validator: validateUsername, trigger: 'blur'
        }],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        phoneNumber: [
          { validator: phoneNumber, trigger: 'blur' }
        ],
        checkPhoneNumber: [
          { validator: checkPhoneNumber, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm() {
          const fromData = {
            username: this.ruleForm.username,
            password: this.$md5(this.ruleForm.pass),
            phoneNumber: this.ruleForm.phoneNumber,
            checkPhoneNumber: this.ruleForm.checkPhoneNumber,
          }

          if(fromData.phoneNumber === '' ){
            this.$message.error('手机号为空');
          }else{
            this.$http.post('/api/login/signIn', fromData).then((response)=> {
            if(response.data.code === 300){
              this.$message.success('注册成功,请返回登录页面');
            }else if(response.data.code === 400){
              this.$message.error('验证码错误');
            }else if(response.data.code === 500){
              this.$message.error('该手机号已经注册');
            }
          }).catch((error)=> {
            console.log(error);
          })
          }
    },

    async getCode() {
      const phoneNumber = this.ruleForm.phoneNumber;

      if (phoneNumber !== "") {
        const fromData = {
          phoneNumber: phoneNumber,
        };
 
        this.$http.post('/api/login/getCode', fromData).then(response => {
              if(response.data.data){
                this.$message.success('验证码发送成功');
              }else{
                this.$message.error('验证码发送失败');
              }
        })
      } else {
        console.log('submit Error');
      }
      if (this.isTrigger) return
      let n = 60;
      let inval = setInterval(
        () => {
          if (n === 0) {
            this.codeString = '获取验证码'
            this.isTrigger = false
            clearInterval(inval)
          } else {
            this.isTrigger = true
            this.codeString = `${n--}秒后重发`
          }
        },
        1000
      );
    },
  }
}


</script>

<style lang="less" scoped>
.registerLogin_main {

  margin: auto;
  margin-top: 100px;
  width: 450px;
  border: 1px solid #eaeaea;
  padding-top: 30px;
  padding-right: 50px;
  box-shadow: 0 0 25px #cac6c6;
  border-radius: 15px;

  .checkPhoneNumber {
    width: 340px;
  }

}

.ti_jiao {
  position: relative;
  top: -20px;
  left: 110px;
}

.cpn_button {
  position: relative;
  top: -61px;
  left: 340px;
}
h3{
        font-size: 20px;
        font-weight: 100;
        position: relative;
        top: -15px;
        left: 230px;
}
</style>