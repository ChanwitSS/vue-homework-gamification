<template>
  <div class="board">
      
    <el-radio-group v-model="radio" >
      <el-radio-button label="use">ประวัติการใช้แต้ม</el-radio-button>
      <el-radio-button label="exchange">ประวัติการแลก</el-radio-button>
    </el-radio-group>

    <el-table
      class="center"
      :data="
        tableDataA.filter(
          (data) =>
            !search ||
            data.first_name.toLowerCase().includes(search.toLowerCase()) ||
            data.last_name.toLowerCase().includes(search.toLowerCase()) ||
            data.id === parseInt(search) || data.total_point === parseInt(search)
        )
      "
      :default-sort="{ prop: 'total_point', order: 'descending' }"
      v-if="radio == 'exchange'"
      style="width:75%"
      align="center"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>User ID: {{ props.row.user_ID }}</p>
          <p>Email: {{ props.row.email }}</p>
        </template>
      </el-table-column>
      <el-table-column type="index"> </el-table-column>
      <el-table-column label="ชื่อของรางวัล" sortable prop="reward.reward_name">
      </el-table-column>
      <el-table-column label="ประวัติการแลกรางวัล" sortable prop="point">
      </el-table-column>
    </el-table>

    <el-table
      class="center"
      :data="
        tableDataB.filter(
          (data) =>
            !search ||
            data.first_name.toLowerCase().includes(search.toLowerCase()) ||
            data.last_name.toLowerCase().includes(search.toLowerCase()) ||
            data.id === parseInt(search) || data.total_point === parseInt(search)
        )
      "
      :default-sort="{ prop: 'total_point', order: 'descending' }"
      v-if="radio == 'use'"
      style="width:75%"

    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>User ID: {{ props.row.user_ID }}</p>
          <p>Email: {{ props.row.email }}</p>
        </template>
      </el-table-column>
      <el-table-column type="index"> </el-table-column>
      <el-table-column label="วันที่" sortable prop="created_at">
      </el-table-column>
      <el-table-column label="คะแนน" sortable prop="point">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import UserStore from "@/store/UserStore";
import Axios from "axios"
import moment from 'moment'
import Auth from '../services/auth'

export default {
  data() {
    return {
      search: "",
      tableDataA: [],
      tableDataB: [],
      range: null,
      radio: 'use',
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      await UserStore.dispatch("fetch");
      this.filter()
    },
    async filter() {
      let apiUrl = process.env.VUE_APP_API_HOST
      let id = JSON.parse(localStorage.getItem('auth_key')).user.id
      let student_reward_res = await Axios.get(apiUrl + `/student-rewards?users_permissions_user=${id}`, Auth.getApiHeader)
      let student_homework_res = await Axios.get(apiUrl + `/student-homeworks?users_permissions_user=${id}`, Auth.getApiHeader)

      this.tableDataA = student_reward_res.data
      this.tableDataB = student_homework_res.data
      console.log(this.tableDataB)
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
