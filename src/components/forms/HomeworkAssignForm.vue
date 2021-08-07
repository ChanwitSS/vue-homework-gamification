<template>
  <div>
    <br>
    <table style="text-align:right">
            <tr>
                <td><label for="homework_name">วิชา :</label></td>
                <td><el-dropdown>
                      <el-button size="medium">{{chooseSubject}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </el-button>
                        <el-dropdown-menu slot="dropdown">   
                            <el-dropdown-item v-for="(s, index) in teachers" v-bind:key = "index" @click.native="changeDropdown(s.subject_name,s.id)">
                              {{s.subject_name}}
                              <!-- <select @click="changeDropdown(index)"> </select> -->
                            </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                </td>
            </tr>
            <tr>
                <td><label for="homework_name">ชื่อการบ้าน :</label></td>
                <td><input type="text" v-model="form.homework_name"></td>
                <el-input placeholder="Please input" v-model="input"></el-input>
            </tr>
            <tr>
                <td><label for="description">คำอธิบาย :</label></td>
                <td><input type="text" v-model="form.description"></td>
            </tr>
            <tr>
                <td><label for="point">คะแนน :</label></td>
                <td><input type="number" v-model="form.point"></td>
            </tr>
            <tr>
                <td><label for="point">กำหนดส่ง :</label></td>
                <td><input type="date" v-model="form.day"></td>
                <td><input type="time" v-model="form.time"></td>
            </tr>
        </table>
        <br>
        <div class="addButton" v-if="check==1">
          <el-button type="primary" round @click="changeCheck()">เพิ่มการบ้าน</el-button>
        </div>
        <div class="addButton" v-else-if="check==0">
          <el-button type="success" round @click="add()">ยืนยัน</el-button>
          <el-button type="danger" round @click="cancel()">ยกเลิก</el-button>
        </div>
        <br>
        
  </div>
</template>

<script>
import HomeworkStore from "../../store/HomeworkStore"
import SubjectStore from "../../store/SubjectStore"
import TeacherStore from "../../store/TeacherStore"
import AuthUser from "@/store/AuthUser"
export default {
      data(){
        return{
          teachers: [],
          stu:[],
          chooseSubject:"เลือกวิชาที่จะสั่ง",
          sub_ID: 0,
          t: 0,
          check:1,
            form:{
                homework_name:'',
                description: '',
                point:'',
                day:'',
                time:''
            }
        }
        
    },
    props: {
    homework: null
  },
  created() {
        this.find()
    },
    methods:{
        async find() {
          console.log("Auth");
          console.log(AuthUser.getters.user);
          this.t = AuthUser.getters.user.teacher.id
          console.log("id");
          console.log(this.t);
          await TeacherStore.dispatch("find",this.t)

          this.teachers = TeacherStore.getters.teachers
          this.teachers = this.teachers.subjects;
          console.log(this.teachers);
          // this.teachers = this.teachers[0].subjects
            // console.log(this.teachers[0].subjects);
            // console.log(this.teachers[0].subjects[0].subject_name);


        },

        cancel(){
            this.check=1
        },
        add(){
          let keep
          if (this.form.day === "") {
            keep = ""
          } 
          else if (this.form.day !== "" && this.form.time === "") {
            keep = this.form.day+"T00:00:00.000Z"
          }
          else{
            keep = this.form.day+"T"+this.form.time+":00.000Z"
          }

            for (let index = 0; index < this.teachers.length; index++) {
            console.log("id :"+this.teachers[index].id);
            this.stu.push(this.teachers[index].id)
            console.log(this.stu);
          }

          console.log("stu");
          console.log(this.stu);

          let payload = {
              homework_name: this.form.homework_name,
              description: this.form.description,
              point: this.form.point,
              due_date: keep,
              subjects: this.chooseSubject,
              subject_ID: this.sub_ID,
              teacher_ID: this.t,
              student_ID:this.stu
          }
          HomeworkStore.dispatch("add",payload)

            //send data to Store
          // console.log("here");
          console.log(payload)//use "form" -> not display => change to "div"
          this.clearForm()
        },
        changeCheck(){
          this.check = 0
          console.log(this.form.day);
          console.log(this.form.time);
        },
        changeDropdown(sub,id){
          this.chooseSubject = sub
          console.log(this.chooseSubject);
          this.sub_ID = id
        }
        
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