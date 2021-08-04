<template>
  <div id="login">
    <el-card class="box-card2" style="background: linear-gradient(to right, #409EFF 0%, #409EFF 35%, #FFFFFF 35%, #FFFFFF 100%);">
      <img src="../assets/homework.png" class="logo"/>
      <div id="welcome">
        <p>ยินดีต้อนรับสู่โลกที่จะทำให้คุณสนุกกับการบ้าน</p>
      </div>
      <div id="login-form">
        <div style="margin-top: 15px;">
          <span class="username">Username or Email</span>
          <el-input placeholder="Username" v-model="form.username" style="margin-top: 10px;"/>
        </div>

        <div style="margin-top: 20px;">
          <span class="password">Password</span>
          <el-input placeholder="Password" type="password" v-model="form.password" style="margin-top: 10px;"/>
        </div>
      </div>
      <div class="loginBtn">
        <el-button type="primary" :plain="true" @click="login">Login</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser";

export default {
  data() {
    return {
      accountDataList: [],
      form: {
        username: "",
        password: "",
        role: "",
      },
    };
  },
  methods: {
    async fetchAccount() {
      //await AccountStore.dispatch("fetch");
     // this.accountDataList = Auth.getters.account;
    },
    async login() {
      let payload = {
        identifier: this.form.username,
        password: this.form.password,
      };
      let res = await AuthUser.dispatch("login", payload)
      if (res.success) {
          await this.$message({
            message: 'Congrats, Login Success',
            type: 'success'
          });
          this.$router.push("/home")
      } else {
          this.$message.error('Oops, Username or Password Incorrect');
      }
    },

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
  background: #8F00FF;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
</style>
