<template>
  <div>
    <p v-if="message.length">
      <label for="error in message">{{ message }}</label>
    </p>
    <input type="text" v-model="form.username" />
    <input type="text" v-model="form.password" />
    <button @click="loginAcc">Login</button>
  </div>
</template>

<script>
import AccountStore from "@/store/UserStore";
export function loginCheck(accountdatalist, payload) {
  for (let key in accountdatalist) {
    let text = accountdatalist[key];
    if (
      text.username === payload.username &&
      text.password === payload.password
    ) {
      return true;
    }
  }
  return false;
}
export default {
  data() {
    return {
      message: "",
      accountdatalist: [],
      form: {
        username: "",
        password: "",
        role: "",
      },
    };
  },
  created() {
    this.fetchAccount();
  },
  methods: {
    fetchAccount() {
      AccountStore.dispatch("fetchAccount");
      this.accountdatalist = AccountStore.getters.account;
    },
    loginAcc() {
      let payload = {
        username: this.form.username,
        password: this.form.password,
      };
      if (loginCheck(this.accountdatalist, payload)) {
        this.message = "";
        this.$router.push('/homework')
      } else {
        this.message = "Username or Password is not correct";
      }
    },
  },
};
</script>

<style></style>
