<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
        <!-- <span>Subject: {{ homework.subject[0].subject_name }}</span> -->
        <span>Subject: {{}}</span>
        <el-popover placement="right" width="400" trigger="click" v-if="checkRole()">
          <Form>
          </Form>
            <el-button style="float: right; padding: 3px 0" slot="reference" type="text" >ส่งงาน</el-button>
        </el-popover>

    </div>
    <div class="text item">
        <p>Name: {{ homework.homework_name }}</p>
        <p>Description: {{ homework.description }}</p>
        <p>Due Date: {{ homework.due_date }}</p>
    </div>
    
  </el-card>
</template>

<script>
import Form from '../forms/HomeworkSentForm.vue'
import AuthUser from "@/store/AuthUser"
export default {
  components: { Form, },
  data() {
    return {
      homework_name: null,
      who:"",
      tcheck:"teacher"
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
          console.log(AuthUser.getters.user.role.type);
          this.who = AuthUser.getters.user
          console.log("id");
          console.log(this.who);

          // if (this.who === teacher) {
            
          // }

          // await TeacherStore.dispatch("find",this.who)

          // this.teachers = TeacherStore.getters.teachers
          // this.teachers = this.teachers.subjects;
          // console.log(this.teachers);



        },
        checkRole(){
          if (this.who.role.type === "teacher") {
            console.log("yes");
            return true;
          }
          console.log("no");
          return false
        }

  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 380px;
    display: inline-block;
    margin: 10px;
  }
</style>