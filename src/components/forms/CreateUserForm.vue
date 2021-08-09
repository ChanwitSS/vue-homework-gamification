<template>
  <div>
    <header class="top-head" style="text-align:center">
        <br>
        <div class="cover-top"></div>
        <div>
            <label class="headerName">จัดการผู้ใช้งาน</label>
        </div>
        <br>
    </header>

    <div class="create_form">
    <el-form label-width="100px" >
        <el-form-item label="ชื่อ" class="user_item">
            <el-input v-model="form.first_name"></el-input>
        </el-form-item>
        <el-form-item label="นามสกุล"  class="user_item">
            <el-input v-model="form.last_name"></el-input>
        </el-form-item>
        <el-form-item label="ชื่อผู้ใช้" class="user_item">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="รหัสผ่าน" class="user_item">
            <el-input type="password" v-model="form.password" ></el-input>
        </el-form-item>
        <el-form-item label="อีเมล" class="user_item">
            <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="บทบาท" class="user_item">
            <el-select v-model="form.role" placeholder="บทบาท">
                <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <br><br>
    <el-button type="success" style="margin-left:540px; right:20;" @click="onClickSave">บันทึก</el-button>
    </div>
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