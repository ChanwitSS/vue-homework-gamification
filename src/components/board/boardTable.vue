<template>
<div>
<header class="top-head" style="text-align:center">
        <br>
        <div class="cover-top"></div>
        <div>
            <label class="headerName" >กระดานคะแนน</label>
        </div>
        <br>
    </header>
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
    <el-table-column label="คะแนนทั้งหมด" sortable prop="total_point">
    </el-table-column>
    <el-table-column label="ID" sortable prop="id"></el-table-column>
  </el-table>
</div>
</template>

<script>
import UserStore from "@/store/UserStore";
export default {
  data() {
    return {
      search: "",
      tableData: [],
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      await UserStore.dispatch("fetch");
      this.tableData = UserStore.getters.users;
    },
  },
};
</script>
<style>
.center {
  position: fixed; /* or absolute */
  top: 20px;
  left: 10px;
}
</style>
