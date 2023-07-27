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
      <el-button class="cpn_button" @click="getCode()">发送验证码</el-button>
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
      if (!value) {
        return callback(new Error('手机号码不能为空'));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
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
        callback();
      }
    }
    return {
      ruleForm: {
        username: '',
        pass: '',
        checkPass: '',
        phoneNumber: '',
        checkPhoneNumber: ''
      },
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
            checkPhoneNumber:this.ruleForm.checkPhoneNumber,
          }

          console.log(fromData);
          this.$http.post('/api/getCode', fromData).then(function (response) {
            console.log(response.data);
          }).catch(function (error) {
            console.log(error);
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    getCode() {
    
      const phoneNumber = this.ruleForm.phoneNumber;

      if (phoneNumber !== '') {
        const fromData = {
          phoneNumber: phoneNumber,
        };
        console.log(fromData);
        this.$http.post('/api/getCode', fromData).then(response => {
          console.log(response.data);
          //打印返回的数据
          // 处理响应数据
        })
      } else {
        console.log('submit Error');
      }
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