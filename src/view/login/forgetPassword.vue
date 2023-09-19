<template>
    <div class="forget_password">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="手机号码 :" prop="phoneNumber">
                <el-input type="text" v-model="ruleForm.phoneNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码 :" prop="checkPhoneNumber">
                <el-input type="text" v-model="ruleForm.checkPhoneNumber" autocomplete="off" class="getCode"></el-input>
            </el-form-item>
            <el-button @click="getCode()" class="Code">{{ codeString }}</el-button>
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
            codeString: '发送验证码',
            isTrigger: false,
            rules: {
                phoneNumber: [
                    { validator: validatePhoneNumber, trigger: 'blur' }
                ],
                checkphoneNumber: [
                    { validator: validateCheckPhoneNumber, trigger: 'blur' }
                ],
            },
            noCheckPhoneNumber: 0,
            codeNumber: false,
        };
    },
    watch: {
        noCheckPhoneNumber: {
            handler() {
                if (this.noCheckPhoneNumber === 1) {
                    this.$message.error('验证码错误');
                    this.noCheckPhoneNumber = 0;
                }
            },
        },
        codeNumber: {
                handler() {
                    if (this.codeNumber === true) {
                        if (this.isTrigger) return
                        let n = 60;
                        let inval = setInterval(
                            () => {
                                if (n === 0) {
                                    this.codeString = '获取验证码'
                                    this.isTrigger = false
                                    clearInterval(inval)
                                } else {
                                    this.isTrigger = true;
                                    this.codeString = `${n--}秒后重发`;
                                }
                            },
                            1000,
                        );
                    }
                }
            }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const fromData = {
                        phoneNumber: this.ruleForm.phoneNumber,
                        code: this.ruleForm.checkPhoneNumber,
                    }
                    this.$http.post('/api/forgetPassword', fromData).then(function (response) {
                        //比较后端发回的code值,两者之间的值为一个对应的数值
                        if (response.data.data.code === this.ruleForm.checkPhoneNumber) {
                            //传到下一页面并且将电话号码放在vuex中
                            this.$router.push('/forgetPassword_');
                            this.$store.commit('getPhoneNumber', this.ruleForm.phoneNumber);
                        } else {
                            //noCheckPhoneNumber的值，说明两者之间并未对应
                            this.noCheckPhoneNumber = 1;
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

        getCode() {
            const phoneNumber = this.ruleForm.phoneNumber;

            if (phoneNumber !== '') {
                const fromData = {
                    phoneNumber: phoneNumber,
                }
                this.$http.post('/api/login/getCode', fromData).then(response => {
                
                    console.log(response.data);
                    if (response.data.code === 10000) {
                        this.codeNumber = true;
                    }
                });
            } else {
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

