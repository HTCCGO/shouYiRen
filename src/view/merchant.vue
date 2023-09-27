<template>
    <div class="main">
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="手艺人名称">
                <el-input v-model="form.name" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="手艺人地区">
                <el-select v-model="form.address" placeholder="请选择商店地区">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手艺人工作地区">
               <el-input v-model="form.workAddress" style="width: :250px;"></el-input>
            </el-form-item>
            <el-form-item label="手艺人类型">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="手艺人简介">
                <el-input type="textarea" v-model="form.desc" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit()">立即注册</el-button>
                <el-button @click="black()">取消</el-button>
            </el-form-item>
        </el-form>
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
            }
          }
          ).catch(err=>{
            err;
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
.main {
    width: 500px;
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 15px;
     box-shadow: 0 0 25px #cac6c6;
    margin-top: 150px;
    margin-left: 400px;
    padding-top: 30px;
    padding-left: 15px;
    padding-bottom: 20px;
}
</style>