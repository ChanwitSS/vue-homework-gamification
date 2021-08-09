<template>
  <div @editItem="getClickedItem">
    <el-button
      type="success"
      style="margin:20px 20px 50px 1100px; right:20;"
      @click="onClickSave"
      >บันทึก</el-button
    >
    <el-button @click="resetForm('clickedItem')">Reset</el-button>
    <el-form label-width="100px" @editItem="getClickedItem">
      <el-form-item label="ชื่อ">
        <el-input v-model="clickedItem.first_name"></el-input>
      </el-form-item>
      <el-form-item label="นามสกุล">
        <el-input v-model="clickedItem.last_name"></el-input>
      </el-form-item>
      <el-form-item label="ชื่อผู้ใช้">
        <el-input v-model="clickedItem.username"></el-input>
      </el-form-item>
      <el-form-item label="รหัสผ่าน">
        <el-input type="password" v-model="clickedItem.password"></el-input>
      </el-form-item>
      <el-form-item label="อีเมล">
        <el-input v-model="clickedItem.email"></el-input>
      </el-form-item>
      <el-form-item label="บทบาท">
        <el-select v-model="stateForm" placeholder="บทบาท">
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { EventBus } from "@/store/EventBus";
import UserStore from "@/store/UserStore";
export default {
  data() {
    return {
      index: 0,
      servedata: [],
      stateForm: "",
      clickedItem: {
        username: null,
        password: null,
        first_name: null,
        last_name: null,
        email: null,
        role: "",
      },
      form: {
        username: null,
        password: null,
        first_name: null,
        last_name: null,
        email: null,
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
        if (
          this.servedata[index].email === this.clickedItem.email &&
          this.servedata[index].id !== this.clickedItem.id
        ) {
          return true;
        }
      }
      return false;
    },
    checkUsername: function() {
      for (let index = 0; index < this.servedata.length; index++) {
        if (
          this.servedata[index].username === this.clickedItem.username &&
          this.servedata[index].id !== this.clickedItem.id
        ) {
          return true;
        }
      }
      return false;
    },
  },
  mounted() {
    EventBus.$on("route-data", (data) => {
      this.clearForm();
      this.clickedItem = data.row;
      this.form.username = this.clickedItem.username;
      this.form.password = this.clickedItem.password;
      this.form.first_name = this.clickedItem.first_name;
      this.form.last_name = this.clickedItem.last_name;
      this.form.email = this.clickedItem.email;
      this.form.role = this.clickedItem.role;
      this.index = data.index;
      this.stateForm = this.clickedItem.role.name;
    });
  },
  methods: {
    async fetch() {
      await UserStore.dispatch("fetch");
      this.servedata = UserStore.getters.users;
    },
    getClickedItem(value) {
      this.clickedItem = value;
    },
    clearForm() {
      this.clickedItem = [];
    },
    async onClickSave() {
      // console.log(this.form.role);
      // console.log(this.clickedItem.role);
      let payload = {
        id: this.clickedItem.id,
        index: this.index,
        username: this.clickedItem.username,
        password: this.clickedItem.password,
        first_name: this.clickedItem.first_name,
        last_name: this.clickedItem.last_name,
        email: this.clickedItem.email,
        role: this.clickedItem.role,
      };
      console.log(payload.role);
      if (this.clickedItem.length !== 0) {
        if (this.checkEmail) {
          this.$message({
            type: "info",
            message: "ชื่ออีเมลซ้ำ",
          });
        } else if (this.checkUsername) {
          this.$message({
            type: "info",
            message: "ชื่อผู้ใช้ซ้ำ",
          });
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
              this.clickedItem.role.name = this.stateForm;
              if (payload.role.name === "Teacher") {
                payload.role.id = 4;
              } else if (payload.role.name === "Student") {
                payload.role.id = 5;
              }
              await UserStore.dispatch("editUser", payload);
              await EventBus.$emit("trans-data");
              this.clearForm();
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "ยกเลิกบันทึก",
              });
              console.log(this.clickedItem.role.name);
            });
        }
      } else {
        console.log(this.clickedItem);
        this.$message({
          type: "info",
          message: "กรุณาเลือกข้อมูลที่จะแก้ไข",
        });
      }
    },
    resetForm() {
      this.clickedItem.username = this.form.username;
      this.clickedItem.password = this.form.password;
      this.clickedItem.first_name = this.form.first_name;
      this.clickedItem.last_name = this.form.last_name;
      this.clickedItem.email = this.form.email;
      this.clickedItem.role = this.form.role;
      this.stateForm = this.form.role.name;
      console.log(this.stateForm);
    },
  },
};
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
.el-form-item {
  margin-bottom: 22px;
  width: 500px;
  display: inline-block;
  margin: 15px;
}
</style>
