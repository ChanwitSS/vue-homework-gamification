<template>
  <!-- <el-table :data="student" style="width: 100%" height="250">
    <el-table-column prop="first_name" label="ชื่อ" width="120"></el-table-column>
    <el-table-column prop="last_name" label="นามสกุล" width="120"></el-table-column>
    <el-table-column prop="" label="สถานะ" width="120"></el-table-column>
    <el-table-column prop="" label="คะแนน" width="120"></el-table-column>
    <el-table-column prop="" label="" width="120" @click="handleEdit()"><el-button size="mini">Edit</el-button></el-table-column>
  </el-table> -->
  
  <div>
    <table>
      <thead>
        <tr>
          <th>ชื่อ</th>
          <th>นามสกุล</th>
          <th>สถานะ</th>
          <th>คะแนน</th>
          <th></th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(s,index) in student" v-bind:key="index">

          <td v-if="index !== editIndex">{{s.first_name}}</td>
          <td v-if="index === editIndex">
            <input type="date" v-model="form.first_name">
          </td>

          <td v-if="index !== editIndex">{{s.last_name}}</td>
          <td v-if="index === editIndex">
            <input type="date" v-model="form.last_name">
          </td>

        </tr>
      </tbody>
    </table>
  </div>
  
</template>
<script>
import AuthUser from '../../store/AuthUser'
import SubjectStore from "../../store/SubjectStore"
import UserStore from "../../store/UserStore"
export default {
  data(){
    return{
      user:AuthUser.getters.user,
      student:[],
      check:[],
      editIndex:-1
    }
  },
  props: {
    homework: null,
  },
  created() {
    this.fetch()
  },
    methods: {
        async fetch() {
          console.log("fetch!!");
          console.log(this.user);
          console.log("subject");
          console.log(this.homework.subject.id); 

          await SubjectStore.dispatch("find",this.homework.subject.id)

          this.student = SubjectStore.getters.subjects.users
          
          console.log(this.student);

          for (let index = 0; index < this.student.length; index++) {
            console.log(this.student[index]);
            await UserStore.dispatch("find",this.student[index].id)
            this.check = UserStore.getters.users
            console.log("user");
            console.log(this.check);
            if (this.check.role.type === "teacher") {
              this.student.splice(index, 1);
            }
            console.log("index :"+index);
            console.log(this.student);
            
          }

          console.log(this.student)
          
        },
        handleEdit(index, row) {
        console.log(index, row);
      },

    }
}
</script>

<style>
th{
  width: 200px
}


</style>