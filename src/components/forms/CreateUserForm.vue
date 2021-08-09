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
    </el-form>
    <br><br>
    <el-button type="success" style="margin-left:540px; right:20;" @click="onClickSave('ruleForm')">บันทึก</el-button>
    </div>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser.js"
export default {
  data() {
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
      }
  },
  methods: {
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