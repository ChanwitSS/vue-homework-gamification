<template>
  <el-table
    class="center"
    :data="
      tableData.filter(
        (data) =>
          !search ||
          data.user.first_name.toLowerCase().includes(search.toLowerCase()) ||
          data.user.last_name.toLowerCase().includes(search.toLowerCase()) ||
          data.id === parseInt(search) || data.total_point === parseInt(search)
      )
    "
    :default-sort="{ prop: 'total_point', order: 'descending' }"
  >
    <el-table-column type="expand">
      <template slot-scope="props">
        <p>User ID: {{ props.row.user.user_ID }}</p>
        <p>Email: {{ props.row.user.email }}</p>
      </template>
    </el-table-column>
    <el-table-column type="index"> </el-table-column>
    <el-table-column label="first name" sortable prop="user.first_name">
    </el-table-column>
    <el-table-column label="last name" sortable prop="user.last_name">
    </el-table-column>
    <el-table-column label="Score" sortable prop="total_point">
    </el-table-column>
    <el-table-column label="ID" sortable prop="id"></el-table-column>

    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="Type to search" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import StudentStore from "@/store/StudentStore";
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
      await StudentStore.dispatch("fetch");
      this.tableData = StudentStore.getters.students;
      console.log(this.tableData);
    },
  },
};
</script>
<style>
.center {
  position: fixed;
  margin-top: 5rem;
  top: 50%;
  left: 15%;
}
</style>
