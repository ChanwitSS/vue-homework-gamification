<template>
  <div id="login">
  <el-card class="box-card2">
    <el-form label-width="10px" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <div class="right-form">
        <div id="login-form">
          <h2 class="text-1">เข้าสู่ระบบ</h2>
            <el-form-item class="login_field" prop="username">Username or Email
            <el-input placeholder="Username" v-model="ruleForm.username" style="margin-top: 10px;"/>
            </el-form-item>
            <el-form-item class="login_field" prop="password">Password
            <el-input placeholder="Password" type="password" v-model="ruleForm.password" style="margin-top: 10px;"/>
            </el-form-item>
        </div>
        <div class="loginBtn">
          <el-button type="primary" :plain="true" @click="login('ruleForm')" style="margin-top: 30px;">Login</el-button>
        </div>
      </div>
    </el-form>
    </el-card>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser";

export default {
  data() {
    return {
      accountDataList: [],
      ruleForm: {
        username: "",
        password: "",
        role: "",
      },
      rules: {
        username: [
          { required: true, message: 'กรุณาใส่username หรือ email', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'กรุณาใส่รหัสผ่าน', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    async fetchAccount() {
      //await AccountStore.dispatch("fetch");
     // this.accountDataList = Auth.getters.account;
    },
    async login(formName) {
      let payload = {
        identifier: this.ruleForm.username,
        password: this.ruleForm.password,
      };
      
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.checkLogin(payload)
          } else {
            console.log('error submit!!');
            return false;
          }
        });



    },
    async checkLogin(payload){
      let res = await AuthUser.dispatch("login", payload)
        if (res.success) {
            await this.$message({
              message: 'เข้าสู่ระบบสำเร็จ',
              type: 'success'
            });
            this.$router.push("/home")
        } else {
            this.$message.error('ชื่อผู้เข้าใช้หรือรหัสผ่านไม่ถูกต้อง');   
        }
    }

  },
};
</script>

<style>
.text {
  font-size: 14px;
}
.box-card2 {
  width: 800px;
  height: 500px;
  display: inline-block;
  margin: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(../assets/stationary.jpg) ;
  background-size: 55% 100%;
  background-repeat: no-repeat;
  background-position-x: -20%;
}
.loginBtn {
  position: fixed;
  margin-top: 350px;
  margin-left: 485px;
  z-index: 1;
}
#login {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
#login-form {
  width: 300px;
  height: 300px;
  position: absolute;
  margin-left: 370px;
  margin-top: 140px;
}
.logo {
  position: fixed;
  width: 100px;
  height: 100px;
  margin-left: 70px;
  margin-top: 100px;
}
#welcome {
  position: fixed;
  margin-top: 300px;
}
.text-1 {
  position: fixed;
  top: 80px;
  right: 130px;
  font-size: 40px;
}
.right-form{
  margin-left: 40px;
}
.login_field{
    width: 300px;
    display: inline-block;
    



}

</style>
