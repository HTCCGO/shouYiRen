<template>
    <div>
      <div class="my-component-main">
        <el-form ref="form" :model="form" label-width="110px">
            <el-form-item label="手艺人名称" style="width: 330px;">
                <el-input v-model="form.name" ></el-input>
            </el-form-item>
            <el-form-item label="手艺人地区" style="width: 330px;">
                <el-select v-model="form.address" placeholder="请选择商店地区" >
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手艺人工作地区" style="width: 330px;">
               <el-input v-model="form.workAddress" ></el-input>
            </el-form-item>
            <el-form-item label="手艺人类型" style="width: 450px;">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="手艺人简介" style="width: 360px;">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item >
                <el-button type="primary" @click="onSubmit()" style="margin-right: 40px; margin-left: 20px;">注册</el-button>
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
        form: {
          name: '',
          address: '',
          workAddress:"",
          type: [],
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
          const formDate={
              name:this.form.name,
              address:this.form.address,
              workAddress:this.form.workAddress,
              type:this.form.type,
              desc:this.form.desc,
          }
          //提交表单数据
          this.$http.post("/api/reset/merchant",formDate).then(req=>{
            if(req.data.data.code !== 200){
                this.$router.push('/succes');
            }else{
              this.$store.commit("setRouter","/merchant")
              this.$router.push('/error');
            }
          }
          ).catch(()=>{
            this.$store.commit("setRouter","/merchant")
            this.$router.push('/error')
          }
            );
          this.$store.commit("setRouter","/merchant");
      },
      black(){
        //返回路由
        this.$router.push(this.$store.state.router);
      },
    }
  }
</script>

<style>
.my-component-main {
    width: 500px;
    height: 490px;
    border: 1px solid #ccc;
    border-radius: 15px;
     box-shadow: 0 0 25px #cac6c6;
     margin: auto;
    margin-top: 150px;
    padding-top: 15px;
    padding-left: 15px;
    padding-bottom: 20px;
}

.el-form{
  padding-top: 35px;
  padding-left: 50px;
  padding-bottom: 50px;
  padding-right: 15px;
}
</style>