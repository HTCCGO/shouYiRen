<template>
    <div class="forget_password">
        <h3 class="login_title">忘记密码</h3>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="新密码" prop="phoneNumber">
                <el-input type="password" v-model="ruleForm.psd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="再次输入" prop="checkPhoneNumber">
                <el-input type="password" v-model="ruleForm.npsd" autocomplete="off" ></el-input>
            </el-form-item>
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
            if (this.ruleForm.psd === '') {
                callback(new Error('请输入一个新密码'));
            } else {
                if (this.ruleForm.psd.length !== 8) {
                    callback(new Error('密码的长度为8'));
                } else {
                    //验证密码是否为原密码
                    this.$http.post('/login/validatePassword', { phoneNumber: this.$store.state.phoneNumber,password:this.$md5(this.ruleForm.psd) }).then(res => {
                        if(res.data.data){
                            callback(new Error('新密码不能与原密码相同'));
                        }else{
                            callback();
                        }
                    })
                }
            }
        };
        const validateCheckPhoneNumber = (rule, value, callback) => {
            if (this.ruleForm.npsd === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.npsd !== this.ruleForm.psd) {
                    callback(new Error('前后密码不一致'));
                } else {
                    callback();
                }
            }
        }
        return {
            ruleForm: {
                psd: '',
                npsd: '',
            },
            rules: {
                phoneNumber: [
                    { validator: validatePhoneNumber, trigger: 'blur' }
                ],
                checkPhoneNumber: [
                    { validator: validateCheckPhoneNumber, trigger: 'blur' }
                ],
            },
        };
    },
    methods: {
        submitForm() {
                    const fromData = {
                        phoneNumber: this.$store.state.phoneNumber,//在vuex中得到phoneNumber的值
                        newPassword: this.ruleForm.psd,//新的密码
                    }
                    this.$http.post('/api/forgetPassword_', fromData).then( (response)=> {
                        //依照code的值来说明是否完成了数据的更改
                        if (response.data.data === 10000) {
                            //转移到登录的路由之中
                            this.$router.push('/login');
                        } else {
                            console.log(response.data.message);
                        }
                    }).catch( (error)=> {
                        console.log(error);
                    })
        }
    }
}
</script>

<style lang="less" scoped>
.forget_password {
    width: 340px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding-top: 40px;
    padding-right: 50px;
    padding-bottom: 10px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
}

.Code {
    position: relative;
    top: -62px;
    left: 230px;
}

.ti_jiao {
    position: relative;
    top: 0px;
    left: 58px;
}

h3{
        font-size: 20px;
        font-weight: 100;
        position: relative;
        top: -20px;
        left: 155px;
}
</style>

