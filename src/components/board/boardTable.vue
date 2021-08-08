<template>
  <div>
    <el-radio-group v-model="radio">
      <el-radio-button label="receive">คะแนนที่ได้รับ</el-radio-button>
      <el-radio-button label="used">คะแนนที่ใช้</el-radio-button>
    </el-radio-group>

    <el-popover placement="right" width="400" trigger="click" style="position: fixed; right: 5%">
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
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>User ID: {{ props.row.user_ID }}</p>
          <p>Email: {{ props.row.email }}</p>
        </template>
      </el-table-column>
      <el-table-column type="index"> </el-table-column>
      <el-table-column label="ชื่อ" sortable prop="first_name">
      </el-table-column>
      <el-table-column label="นามสกุล" sortable prop="last_name">
        </el-table-column>
      <el-table-column label="คะแนนที่ได้รับ" sortable prop="total_point">
      </el-table-column>
      <el-table-column label="ID" sortable prop="id"></el-table-column>
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
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>User ID: {{ props.row.user_ID }}</p>
          <p>Email: {{ props.row.email }}</p>
        </template>
      </el-table-column>
      <el-table-column type="index"> </el-table-column>
      <el-table-column label="ชื่อ" sortable prop="first_name">
      </el-table-column>
      <el-table-column label="นามสกุล" sortable prop="last_name">
      </el-table-column>
      <el-table-column label="คะแนนที่ใช้" sortable prop="used_point">
      </el-table-column>
      <el-table-column label="ID" sortable prop="id"></el-table-column>
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
      let apiUrl = process.env.VUE_APP_API_HOST
      //http://localhost:1337/
      let start = moment(this.range.start).format('YYYY-MM-DD')
      let end = moment(this.range.end).format('YYYY-MM-DD')
      let student_homework_res = await Axios.get(apiUrl + `/student-homeworks?created_at_gte=${start}&created_at_lte=${end}`)
      let reward_res = await Axios.get(apiUrl)

      for (let i=0; i<this.tableData.length; i++) {
        this.tableData[i].used_point = 0 
        this.tableData[i].total_poin = 0
        for (let j=0; i<student_homework_res.data.length; j++) {
          if (student_homework_res.data[j].users_permissions_user.id ==  this.tableData[i].id) {
            this.tableData[i].total_point += student_homework_res.data[j].point
          }
        }
      }


    }
  },
};
</script>
<style>
.center {
  position: fixed; /* or absolute */
  top: 50%;
  left: 10px;
}
</style>
