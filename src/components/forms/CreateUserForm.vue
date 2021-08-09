<template>
  <div>
<<<<<<< HEAD
    <header class="top-head" style="text-align:center">
        <br>
        <div class="cover-top"></div>
        <div>
            <label class="headerName">จัดการผู้ใช้งาน</label>
        </div>
        <br>
    </header>

    <div class="create_form">
    <el-form label-width="120px" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="ชื่อ" prop="first_name" class="user_item">
            <el-input v-model="ruleForm.first_name"></el-input>
        </el-form-item>
        <el-form-item label="นามสกุล" prop="last_name"  class="user_item">
            <el-input v-model="ruleForm.last_name"></el-input>
        </el-form-item>
        <el-form-item label="ชื่อผู้ใช้" prop="username" class="user_item">
            <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="รหัสผ่าน" prop="password" class="user_item">
            <el-input type="password" v-model="ruleForm.password" ></el-input>
        </el-form-item>
        <el-form-item label="อีเมล"  prop="email" class="user_item">
            <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="บทบาท" prop="role" class="user_item">
            <el-select v-model="ruleForm.role" placeholder="บทบาท">
                <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
=======
    <el-button
      type="success"
      style="margin:20px 20px 50px 1100px; right:20;"
      :model="form"
      @click="onClickSave('form')"
      >บันทึก</el-button
    >
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
      <el-form-item label="บทบาท">
        <el-select v-model="form.role" placeholder="บทบาท">
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
>>>>>>> origin/Jerry
    </el-form>
    <br><br>
    <el-button type="success" style="margin-left:540px; right:20;" @click="onClickSave('ruleForm')">บันทึก</el-button>
    </div>
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
<<<<<<< HEAD
      return {
          ruleForm: {
              username: '',
              password: '',
              first_name: '',
              last_name: '',
              email: '',
              role: '',
          },
          roles: [
            {
              value: 'Student',
              label: 'นักเรียน'
            },
            {
              value: 'Teacher',
              label: 'คุณครู'
            },
            {
              value: 'Admin',
              label: 'ผู้ดูแลระบบ'
            },
          ],
          rules: {
            username: [
              { required: true, message: 'กรุณาใส่username', trigger: 'blur' },
            ],
            password: [
              { required: true, message: 'กรุณาใส่รหัสผ่าน', trigger: 'blur' }
            ],
            first_name: [
              {required: true, message: 'กรุณาใส่ชื่อ', trigger: 'blur' }
            ],
            last_name: [
              {required: true, message: 'กรุณาใส่นามสกุล', trigger: 'blur' }
            ],
            email: [
              { required:true,message: 'กรุณาใส่อีเมล', trigger: 'blur' },
      { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
            ],
            role:[
              { required: true, message: 'กรุณาเลือกบทบาท', trigger: 'change'  }
            ],

          }
=======
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
>>>>>>> origin/Jerry
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
<<<<<<< HEAD
    onClickSave(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('ต้องการบันทึกข้อมูลหรือไม่', 'คำเตือน', {
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'บันทึกสำเร็จ'
          });
          let res = AuthUser.dispatch("register", this.form)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'ยกเลิกบันทึก'
          });   
          this.$refs[formName].resetFields();       
        });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    },
  }
}
</script>

<style>
.form {
    position: fixed;
    top: 100px;
    background: white;
    width: 1200px;
    height: 610px;
    margin-left: 10px;
    border-radius: 5px;
}
.field {
  position: relative;
  width: 100px;
  height: 40px;
  display: inline-block;
}
.user_item {
    margin-bottom: 22px;
    width: 500px;
    display: inline-block;
    margin: 15px;
}
.create_form{
  margin-left: 120px;
  margin-top:40px
}
</style>
=======
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
              await UserStore.dispatch("addUser", this.form);
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
>>>>>>> origin/Jerry
