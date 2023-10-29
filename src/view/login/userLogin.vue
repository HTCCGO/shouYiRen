<template>
    <div>
        <el-form :model="form" :rules="rules" class="login">
            <h3 class="login_title">登录</h3>
            <!-- prop需要与字段名相互对应 -->
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button style="margin-left: 90px; margin-top: 10px;" @click="login()"
                    class="login_button">登录</el-button>
            </el-form-item>
            <el-form-item>
                <el-link type="primary" :underline="false" @click="login_register()">立即注册</el-link>
                <el-link type="primary" :underline="false" class="link-right" @click="forget_password()">忘记密码</el-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'my-register',
    data() {
        return {
            form: {
                username: "",
                password: "",
            },
            rules: {
                username: [
                    { required: true, trigger: 'blur', message: '请输入用户名' }
                ],
                password: [
                    { required: true, trigger: 'blur', message: '请输入密码' }
                ]
            },
        }
    },
    methods: {
        login() {
            let formData = { // 将表单数据组织成适当的格式
                username: this.form.username,
                password: this.$md5(this.form.password),
                // 在此添加其他表单字段
            }
            this.$http.post('/api/login/userLogin', formData).then( (response)=> {
                //将token的值赋值给cookies
                if(response.data.code === 10000){
                       this.$cookie.set("token", response.data.data.token);
                       //修改user的值
                       this.$store.commit("setUser",response.data.data.user);
                       this.$router.push('/home');
                }else if(response.data.code === 200){
                    this.$message.error("用户名或密码错误");
                } 
            }).catch( (error) =>{
                console.log(error);
            });
            
        },
        login_register() {
            //将路由转移到对应的位置
            this.$router.push('/registeLogin')
        },
        forget_password() {
            //将路由转移到对应的位置
            this.$router.push('/forgetPassword')
        }
    }
}
</script>

<style lang="less" scoped>
.login {
    width: 250px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 25px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;

    .login_title {
        font-weight: 300;
        text-align: center;
    }

    .link-right {
        float: right;
    }
}
</style>