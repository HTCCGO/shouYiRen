<template>
  <div class="registerLogin_main">
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
        <el-button type="primary" @click="submitForm('ruleForm')" class="ti_jiao">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var phoneNumber = (rule, value, callback) => {
      if (!value.length !== 11) {
        return callback(new Error('请输入一个正确的手机号码'));
      } else {
        return callback(new Error('手机号码不能为空'));
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
      } else if (value.length !== 6) {
        callback(new Error('验证码错误'))
      } else {
        this.$http.post('/api/login/getCode', this.ruleForm.phoneNumber).then(req => {
          if (req.data.data.code !== this.ruleForm.checkPhoneNumber) {
            callback(new Error('验证码错误'));
          } else {
            callback(new Error());
          }
        })
      }
      //查看code的值


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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {//
        if (valid) {
          alert('submit!');
          const fromData = {
            username: this.ruleForm.username,
            password: this.ruleForm.pass,
            phoneNumber: this.ruleForm.phoneNumber,
            checkPhoneNumber: this.ruleForm.checkPhoneNumber,
          }
          this.$http.post('/api/signIn', fromData).then(function (response) {
            //如果说两者的值并不相同，则
            if (response.data.code === 10000) {
              if (response.data.data.code !== this.ruleForm.checkPhoneNumber) {
                console.log("验证码错误");
              } else {
                //转移到对应的路由中去
                this.$router.push('/login');
              }
            } else {
              console.log("submit error !");
            }
          }).catch(function (error) {
            console.log(error);
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    async getCode() {
      const phoneNumber = this.ruleForm.phoneNumber;

      if (phoneNumber !== "") {
        const fromData = {
          phoneNumber: phoneNumber,
        };
        fromData;
        this.$http.post('/api/getCode', fromData).then(response => {
          console.log(response.data);
          //打印返回的数据
          // 处理响应数据
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}


</script>

<style lang="less" scoped>
.registerLogin_main {

  margin: auto;
  margin-top: 100px;
  width: 450px;
  border: 1px solid #eaeaea;
  padding-top: 70px;
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
</style>