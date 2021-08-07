<template>
  <div>
    <el-button type="success" style="margin:20px 20px 50px 1100px; right:20;" @click="onClickSave">บันทึก</el-button>
    <el-form label-width="100px" >
        <el-form-item label="ชื่อ" >
            <el-input v-model="form.first_name"></el-input>
        </el-form-item>
        <el-form-item label="นามสกุล" >
            <el-input v-model="form.last_name"></el-input>
        </el-form-item>
        <el-form-item label="ชื่อผู้ใช้" >
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="รหัสผ่าน">
            <el-input type="password" v-model="form.password" ></el-input>
        </el-form-item>
        <el-form-item label="อีเมล">
            <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="บทบาท">
            <el-select v-model="form.role" placeholder="บทบาท">
                <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser.js"
export default {
  data() {
      return {
          form: {
              username: null,
              password: null,
              first_name: null,
              last_name: null,
              email: null,
              role: null,
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
      }
  },
  methods: {
    async onClickSave() {
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
.el-form-item {
    margin-bottom: 22px;
    width: 500px;
    display: inline-block;
    margin: 15px;
}
</style>