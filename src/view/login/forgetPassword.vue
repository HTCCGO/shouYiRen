<template>
    <div class="forget_password">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="手机号码 :" prop="phoneNumber">
                <el-input type="text" v-model="ruleForm.phoneNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码 :" prop="checkPhoneNumber">
                <el-input type="text" v-model="ruleForm.checkPhoneNumber" autocomplete="off" class="getCode"></el-input>
            </el-form-item>
            <el-button @click="getCode()" class="Code">获取验证码</el-button>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formName)" class="ti_jiao">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        var validatePhoneNumber = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号码'));
            } else {
                if (value.length !== 11) {
                    callback(new Error('请输入一个正确的手机号码'))
                }
                callback();
            }
        };
        const validateCheckPhoneNumber = (rule, value, callback) => {
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
                phoneNumber: '',
                checkPhoneNumber: '',
            },
            rules: {
                phoneNumber: [
                    { validator: validatePhoneNumber, trigger: 'blur' }
                ],
                checkphoneNumber: [
                    { validator: validateCheckPhoneNumber, trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getCode() {
            console.log(this.ruleForm);
            const phoneNumber = this.ruleForm.phoneNumber; 

            if (!phoneNumber) {
                const fromData = {
                    phoneNumber: phoneNumber,
                };
                console.log(fromData);
                this.$http.post('/api/getCode', fromData).then(response => {
                    console.log(response.data);
                    //打印返回的数据
                    // 处理响应数据
                })
            }else{
                console.log('submit Error');
            }
        },
    }
}
</script>

<style lang="less" scoped>
.forget_password {
    width: 340px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding-top: 60px;
    padding-right: 50px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
}

.getCode {
    width: 130px;
}

.Code {
    position: relative;
    top: -62px;
    left: 230px;
}

.ti_jiao {
    position: relative;
    top: -25px;
    left: 58px;
}
</style>

