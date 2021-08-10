<template>
  <div>
      <div class="table_add" style="margin-top: 50px">
          <table class="top_form">
              <tr>
                  <td class="add_td">ชื่อ :  </td>
                  <td class="add_td">{{keep.first_name}}</td>
                  <td class="add_td">นามสกุล : </td>
                  <td class="add_td">{{keep.last_name}}</td>
                  <td class="add_td">
                      <el-dropdown>
                        <el-button size="medium" style="width:150px">{{chooseSubject}}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                            <el-dropdown-menu slot="dropdown">   
                                <el-dropdown-item v-for="(s, index) in subjects" v-bind:key = "index" @click.native="changeDropdown(s)">
                                {{s.subject_name}}
                                <!-- <select @click="changeDropdown(index)"> </select> -->
                                </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                  </td>
                  <td class="add_td" style="width:220px">
                      <el-button type="primary" @click="addSub()" size="small" style="margin-left:50px;width:80px">Add</el-button>
                        <el-button @click="reset()" size="small" style="width:80px">Reset</el-button>
                  </td>
              </tr>
          </table>     
          
      </div>
      <table class="table_add_sub">
                <thead>
                    <tr>
                        <td></td>
                        <td>ชื่อ</td>
                        <td>นามสกุล</td>
                        <td style="width:100px">ID</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(stu, index) in students" v-bind:key = "index" style="height:50px;border-bottom: 1px solid rgb(124, 117, 117);">
                        <th>{{index+1}}</th>

                        <td>{{stu.first_name}}</td>

                        <td>{{stu.last_name}}</td>

                        <td>{{stu.id}}</td>

                        <td style="width:20px;padding-right:50px">
                            <el-button type="primary" @click="addSubject(stu)" size="mini" icon="el-icon-circle-plus-outline" style="margin-left:px">เพิ่มวิชา</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
  </div>
</template>

<script>
import UserStore from "@/store/UserStore";
import Subject from "@/store/SubjectStore"
import Axios from "axios"
import Auth from '../../services/auth'
export default {
  data() {
    return {
      search: "",
      students: [],
      keep:{
          first_name:"",
          last_name:"",
          id:"",
      },
      chooseSubject:"เลือกวิชา",
      subjects:[],
      sub:""

    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      await UserStore.dispatch("fetch");
      UserStore.getters.users.map((item, index) => {if (item.role.name == "Student") { this.students.push(item)}});
      console.log(this.students);
      await Subject.dispatch("fetch")
        this.subjects = Subject.getters.subjects
        console.log(this.subjects);
    },
    addSubject(stu){
        this.keep = stu
    },
    changeDropdown(s){
           this.chooseSubject = s.subject_name
           console.log("sub");
           console.log(this.chooseSubject);
           this.sub = s
           console.log(this.sub);
    },
    reset(){
        this.chooseSubject = "เลือกวิชา"
        this.keep.first_name =""
        this.keep.last_name=""
        this.keep.id=""
    },
    async addSub(){
        if (this.keep.first_name==="" && this.chooseSubject === "เลือกวิชา") {
            this.$message.error('กรุณาเลือกคนที่ต้องการเพิ่มวิชา');
            return false
        }
        else if(this.chooseSubject === "เลือกวิชา"){
            this.$message.error('กรุณาเลือกวิชาเรียน');
            return false
        }
        console.log("here");
        console.log(this.keep.id);
        await UserStore.dispatch("find",this.keep.id)
        let check = UserStore.getters.users
        console.log(check);
        console.log(this.sub);

        let apiUrl = process.env.VUE_APP_API_HOST

        let body = {
          id: this.sub.id.id,
          users:[{
              id:check.id
          }]
      }
        
        Axios.put (apiUrl + '/subjects/'+this.sub.id, body, Auth.getApiHeader)

        this.chooseSubject = "เลือกวิชา"
        this.keep.first_name =""
        this.keep.last_name=""
        this.keep.id=""

    }
  },
};
</script>
<style>
.center {
  position: fixed; /* or absolute */
  top: 20px;
  left: 10px;
}

.table_add_sub{
  margin-top: 30px;
margin-left: 100px;
  width: 70%;
  background-color: white;
  
}
.table_add_sub.td{
    border-bottom: 1px solid rgb(124, 117, 117);
}

.add_td{
    padding-left: 20px;
    width: 100px;
}

.top_form{
    background-color: rgb(255, 255, 255);
    padding: 10px;
    padding-left: 10px;
    padding-right: 60px;
}
.table_add{
    margin-left: 100px;
}

</style>
