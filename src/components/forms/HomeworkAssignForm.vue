<template>
  <div class="move_form">
      <el-form label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" style="margin-left: 200px;margin-top: 100px;">
        <el-form-item label="ชื่อการบ้าน" prop="homework_name" class="hw_from">
          <el-input v-model="ruleForm.homework_name" placeholder="ชื่อการบ้าน" ></el-input>
        </el-form-item>
        <el-form-item label="วิชา" prop="subject" class="hw_from">
              <el-select v-model="ruleForm.subject" placeholder="ชื่อวิชา" >
                <el-option v-for="item in subjects" :key="item.id" :label="item.subject_name" :value="item.id">
                </el-option>
              </el-select>
        </el-form-item>
        <br><br>
        <el-form-item label="คำอธิบาย" prop="description" class="hw_from">
          <el-input v-model="ruleForm.description" placeholder="คำอธิบาย"></el-input>
        </el-form-item>
        <el-form-item label=กำหนดส่ง prop="due_date" class="hw_from">
          <v-date-picker v-model="ruleForm.due_date" >
            <template v-slot="{ inputValue, inputEvents }">
              <input
                class="bg-white border px-2 py-1 rounded"
                style="background: white; border: 1px; width: 200px; height: 30px; text-align: center;"
                :value="inputValue"
                v-on="inputEvents"
                placeholder="กำหนดส่ง"
              />
            </template>
          </v-date-picker>
        </el-form-item>
        <el-form-item label="คะแนน"> 
          <el-input-number v-model="ruleForm.point" :min="1" :max="99"></el-input-number>
        </el-form-item>
      </el-form>
      <br><br>
      <div class="addButton" >
        <el-button type="primary" round @click="onClickAdd('ruleForm')" icon="el-icon-plus">เพิ่มการบ้าน</el-button>
      </div>
  </div>
</template>

<script>
import Subject from "@/store/SubjectStore"
import Homework from "@/store/HomeworkStore"
import User from "@/store/UserStore"
import AuthUser from "@/store/AuthUser"
export default {
      data(){
        return {
          subjects: [],
          user_subject:AuthUser.getters.user.subjects,
          ruleForm:{
            subject: "",
            homework_name: "",
            description: "",
            point: "",
            due_date: "",
          },
          rules: {
            subject: [
              { required: true, message: 'กรุณาเลือกวิชา', trigger: 'blur' },
            ],
            homework_name: [
              { required: true, message: 'กรุณาใส่ชื่อการบ้าน', trigger: 'blur' }
            ],
            description: [
              {required: true, message: 'กรุณาใส่คำอธิบาย', trigger: 'blur' }
            ],
            due_date: [
              {type: 'date',required: true, message: 'กรุณากำหนดส่ง', trigger: 'change'  }
            ],
            point: [
              {required: true, message: 'กรุณาใส่คะแนน', trigger: 'blur' }
            ],
          },
        }
    },
    props: {
    homework: null
  },
  created() {
    this.fetchSubject()
  },
  methods:{
    async fetchSubject() {
      console.log("here");
      console.log(this.user_subject);
      for (let index = 0; index < this.user_subject.length; index++) {
        console.log(this.user_subject[index].id);
        await Subject.dispatch("find",this.user_subject[index].id)
        let keep = Subject.getters.subjects
        this.subjects.push(keep)   
      }
      
    },
    onClickAdd(formName) {
      let payload = {
        subject: this.ruleForm.subject,
        homework_name: this.ruleForm.homework_name,
        description: this.ruleForm.description,
        point: this.ruleForm.point,
        due_date: this.ruleForm.due_date,
      }

      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('สั่งการบ้าน', {
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
        type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'สั่งการบ้านสำเร็จ'
          });
        Homework.dispatch("add", payload)
        this.$refs[formName].resetFields(); 
        // this.clearForm()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'ยกเลิกสั่งการบ้าน'
          });          
          this.$refs[formName].resetFields(); 
        });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
      
      
    },
    clearForm(){
      this.ruleForm={
            subject: "",
            homework_name: "",
            description: "",
            point: "",
            due_date: ""
      }
    },

  }
}
</script>

<style>
.assign{
  margin-left: 200px;
  margin-top: 100px;
  

}

.addButton{
    margin-left: 500px;
}

.move_form{
    margin-left: 150px;
}

.hw_from{
    margin-bottom: 22px;
    width: 100;
    display: inline-block;
    margin: 15px;
}

</style>