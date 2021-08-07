<template>
  <div>
      <el-form label-width="100px" >
        <el-form-item label="ชื่อการบ้าน" >
          <el-input v-model="form.homework_name" placeholder="ชื่อการบ้าน"></el-input>
        </el-form-item>
        <el-form-item label="วิชา" >
              <el-select v-model="form.subject" placeholder="ชื่อวิชา">
                <el-option v-for="item in subjects" :key="item.id" :label="item.subject_name" :value="item.id">
                </el-option>
              </el-select>
        </el-form-item>
        <el-form-item label="คำอธิบาย" >
          <el-input v-model="form.description" placeholder="คำอธิบาย"></el-input>
        </el-form-item>
        <el-form-item label=กำหนดส่ง>
          <v-date-picker v-model="form.due_date" >
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
      </el-form>
      <div class="addButton" >
        <el-button type="primary" round @click="onClickAdd">เพิ่มการบ้าน</el-button>
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
          form:{
            subject: null,
            homework_name: null,
            description: null,
            point: null,
            due_date: null,
          }
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
      await Subject.dispatch("fetch")
      this.subjects = Subject.getters.subjects
    },
    onClickAdd() {
      let payload = {
        subject: this.form.subject,
        homework_name: this.form.homework_name,
        description: this.form.description,
        point: this.form.point,
        due_date: this.form.due_date,
      }
      
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'ยกเลิกสั่งการบ้าน'
        });          
      });
    },

  }
}
</script>

<style>
table{
  margin-left: 50px;
}

.addButton{
    margin-left: 130px;
}

</style>