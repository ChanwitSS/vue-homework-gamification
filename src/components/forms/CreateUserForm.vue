<template>
  <div align="center" style="margin-top: 100px;">
    <!-- <el-button
      type="success"
      style="margin:20px 20px 50px 1100px; right:20;"
      :model="form"
      @click="onClickSave('form')"
      >บันทึก</el-button
    > -->
    <el-form label-width="100px">
      <el-form-item label="ชื่อ">
        <el-input
          type="text"
          v-model="form.first_name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="นามสกุล">
        <el-input v-model="form.last_name"></el-input>
      </el-form-item>
      <el-form-item label="ชื่อผู้ใช้">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="รหัสผ่าน">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="อีเมล">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="User ID">
        <el-input v-model.number="form.user_ID"></el-input>
      </el-form-item>
      <el-form-item label="บทบาท" style="margin-right:10px">
        <el-select v-model="form.role" placeholder="บทบาท">
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <br /><br />
    <el-button type="success" style=";" @click="onClickSave('ruleForm')"
      >บันทึก</el-button
    >
  </div>
</template>
<script>
import Vue from "vue";
import UserStore from "@/store/UserStore";
import Axios from "axios";
var statefunction = new Vue({
  data: {
    messages: {
      type: "",
      message: "",
    },
  },
  methods: {
    statusMessage: function(type, message) {
      this.messages.type = type;
      this.messages.message = message;
      return { type: this.messages.type, message: this.messages.message };
    },
  },
});
export default {
  data() {
    return {
      servedata: [],
      form: {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        user_ID: "",
        role: "",
      },
      roles: [
        {
          value: "Student",
          label: "นักเรียน",
        },
        {
          value: "Teacher",
          label: "คุณครู",
        },
      ],
    };
  },
  created() {
    this.fetch();
  },
  computed: {
    checkEmail: function() {
      for (let index = 0; index < this.servedata.length; index++) {
        if (this.servedata[index].email === this.form.email) {
          return true;
        }
      }
      return false;
    },
    checkUsername: function() {
      for (let index = 0; index < this.servedata.length; index++) {
        if (this.servedata[index].username === this.form.username) {
          return true;
        }
      }
      return false;
    },
    checkUsernameID: function() {
      for (let index = 0; index < this.servedata.length; index++) {
        if (this.servedata[index].user_ID === this.form.user_ID) {
          return true;
        }
      }
      return false;
    },
    checkIsUser: function() {
      return this.form.username !== "";
    },
    checkIsPassword: function() {
      return this.form.password !== "";
    },
    checkIsFirstName: function() {
      return this.form.first_name !== "";
    },
    checkIsLastName: function() {
      return this.form.last_name !== "";
    },
    checkIsEmail: function() {
      return this.form.email !== "";
    },
    checkIsRole: function() {
      return this.form.role !== "";
    },
    checkIsUserID: function() {
      return this.form.user_ID !== "";
    },
    checkAllState: function() {
      return (
        this.checkIsUser &&
        this.checkIsPassword &&
        this.checkIsFirstName &&
        this.checkIsLastName &&
        this.checkIsEmail &&
        this.checkIsRole &&
        this.checkIsUserID
      );
    },
  },
  methods: {
    async fetch() {
      await UserStore.dispatch("fetch");
      this.servedata = UserStore.getters.users;
    },
    clearForm() {
      this.form = {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        user_ID: "",
        role: "",
      };
    },
    async onClickSave(formName) {
      let payload = {
        username: this.form.username,
        password: this.form.password,
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        email: this.form.email,
        user_ID: this.form.user_ID,
        role: this.form.role,
      };
      if (this.form.role === "Student") {
        payload.role = 5;
      } else if (this.form.role === "Teacher") {
        payload.role = 4;
      }
      console.log(payload);
      if (this.checkAllState) {
        if (this.checkEmail) {
          this.$message(statefunction.statusMessage("info", "email ซ้ำ"));
        } else if (this.checkUsername) {
          this.$message(statefunction.statusMessage("info", "ชื่อผู้ใช้ ซ้ำ"));
        } else if (this.checkUsernameID) {
          this.$message(statefunction.statusMessage("info", "UserID ซ้ำ"));
        } else if (!Number.isInteger(this.form.user_ID)) {
          this.$message(
            statefunction.statusMessage("info", "UserID ต้องเป็นตัวเลข")
          );
        } else {
          this.$confirm("ต้องการบันทึกข้อมูลหรือไม่", "คำเตือน", {
            confirmButtonText: "ตกลง",
            cancelButtonText: "ยกเลิก",
            type: "warning",
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "บันทึกสำเร็จ",
              });
            })
            .then(async () => {
              await UserStore.dispatch("addUser", payload);
              this.clearForm();
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "ยกเลิกบันทึก",
              });
            });
        }
      } else {
        if (!this.checkAllState) {
          if (!this.checkIsFirstName) {
            this.$message(statefunction.statusMessage("info", "กรุณาใส่ชื่อ"));
          } else if (!this.checkIsUser) {
            this.$message(
              statefunction.statusMessage("info", "กรุณาใส่ชื่อผู้ใช้")
            );
          } else if (!this.checkIsEmail) {
            this.$message(
              statefunction.statusMessage("info", "กรุณาใส่ Email")
            );
          } else if (!this.checkIsLastName) {
            this.$message(
              statefunction.statusMessage("info", "กรุณาใส่นามสกุล")
            );
          } else if (!this.checkIsPassword) {
            this.$message(
              statefunction.statusMessage("info", "กรุณาใส่รหัสผ่าน")
            );
          } else if (!this.checkIsUserID) {
            this.$message(
              statefunction.statusMessage("info", "กรุณาใส่ User ID")
            );
          } else if (!this.checkIsRole) {
            this.$message(
              statefunction.statusMessage("info", "กรุณาเลือก บทบาท")
            );
          }
        }
      }
    },
  },
};
</script>

<style></style>
