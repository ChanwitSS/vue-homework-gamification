<template>
  <div id="login">
    <el-card class="box-card2">
      <div style="margin-top: 15px;">
        <span class="username">Username</span>
        <el-input placeholder="Username" v-model="form.username"/>
      </div>

      <div style="margin-top: 15px;">
        <span class="password">Password</span>
        <el-input placeholder="Password" v-model="form.password"/>
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
  width: 500px;
  height: 250px;
  display: inline-block;
  margin: 10px;
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loginBtn {
  margin-top: 25px;
  margin-left: 195px;
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
</style>
