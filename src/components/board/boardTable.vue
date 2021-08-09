<template>
  <div class="board">
      
    <el-radio-group v-model="radio" >
      <el-radio-button label="receive">คะแนนที่ได้รับ</el-radio-button>
      <el-radio-button label="used">คะแนนที่ใช้</el-radio-button>
    </el-radio-group>
<<<<<<< HEAD
    <el-popover placement="right" width="400" trigger="click" style="position: fixed; right: 5%">
=======



    <el-popover placement="right" width="400" trigger="click" style="position: fixed;margin-left:20px">
>>>>>>> origin/peang
      <div align='center'>
        <v-date-picker v-model="range" isRange style="margin-top: 20px" align="cneter"/>
        <br>
        <el-button style="margin-top: 20px" @click="onClickSelectRange">เลือก</el-button>
      </div>
      <el-button slot="reference">เลือกช่วงเวลา</el-button>
    </el-popover>
    <el-table
      class="center"
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.first_name.toLowerCase().includes(search.toLowerCase()) ||
            data.last_name.toLowerCase().includes(search.toLowerCase()) ||
            data.id === parseInt(search) || data.total_point === parseInt(search)
        )
      "
      :default-sort="{ prop: 'total_point', order: 'descending' }"
      v-if="radio == 'receive'"
      style="width:75%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>User ID: {{ props.row.user_ID }}</p>
          <p>Email: {{ props.row.email }}</p>
        </template>
      </el-table-column>
      <el-table-column type="index"> </el-table-column>
      <el-table-column label="ชื่อ" sortable prop="first_name" width="250">
      </el-table-column>
      <el-table-column label="นามสกุล" sortable prop="last_name" width="250">
        </el-table-column>
      <el-table-column label="คะแนนที่ได้รับ" sortable prop="total_point" width="250">
      </el-table-column>
      <el-table-column label="ID" sortable prop="id" width="250"></el-table-column>
    </el-table>

    <el-table
      class="center"
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.first_name.toLowerCase().includes(search.toLowerCase()) ||
            data.last_name.toLowerCase().includes(search.toLowerCase()) ||
            data.id === parseInt(search) || data.total_point === parseInt(search)
        )
      "
      :default-sort="{ prop: 'total_point', order: 'descending' }"
      v-if="radio == 'used'"
      style="width:75%"

    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>User ID: {{ props.row.user_ID }}</p>
          <p>Email: {{ props.row.email }}</p>
        </template>
      </el-table-column>
      <el-table-column type="index"> </el-table-column>
      <el-table-column label="ชื่อ" sortable prop="first_name" width="250">
      </el-table-column>
      <el-table-column label="นามสกุล" sortable prop="last_name" width="250">
      </el-table-column>
      <el-table-column label="คะแนนที่ใช้" sortable prop="used_point" width="250">
      </el-table-column>
      <el-table-column label="ID" sortable prop="id" width="250"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import UserStore from "@/store/UserStore";
import Axios from "axios"
import moment from 'moment'
export default {
  data() {
    return {
      search: "",
      tableData: [],
      range: null,
      dialogFormVisible: false,
      radio: 'receive',
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      await UserStore.dispatch("fetch");
      UserStore.getters.users.map((item, index) => {if (item.role.name == "Student") { this.tableData.push(item)}});
    },
    onClickSelectRange() {
      this.dateFilter()
    },
    async dateFilter() {
      try {
        let apiUrl = process.env.VUE_APP_API_HOST
        let start = moment(this.range.start)/*.subtract(7, 'hours')*/.format('YYYY-MM-DD')
        let end = moment(this.range.end)/*.subtract(7, 'hours')*/.format('YYYY-MM-DD')
        let student_homework_res = await Axios.get(apiUrl + `/student-homeworks?created_at_gte=${start}&created_at_lte=${end}`)
        let student_reward_res = await Axios.get(apiUrl + `/student-rewards?created_at_gte=${start}&created_at_lte=${end}`)
        for (let i=0; i<this.tableData.length; i++) {
          this.tableData[i].used_point = 0 
          this.tableData[i].total_point = 0
          for (let j=0; j<student_homework_res.data.length; j++) {
            if (student_homework_res.data[j].users_permissions_user.id == this.tableData[i].id) {
              this.tableData[i].total_point += student_homework_res.data[j].point
            }
          }
          for (let j=0; j<student_reward_res.data.length; j++) {
            if (student_reward_res.data[j].users_permissions_user.id == this.tableData[i].id) {
              this.tableData[i].used_point += student_reward_res.data[j].point
            }
          }
        }
      } catch {
        this.$message({
          showClose: true,
          message: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
          type: 'error'
        });
        return ;
      }
      this.$message({
        showClose: true,
        message: 'เลือกช่วงเวลาสำเร็จ',
        type: 'success'
      });
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

.board{
  margin-top: 30px;
  margin-left: 150px;
  width: 100%;
}
</style>
