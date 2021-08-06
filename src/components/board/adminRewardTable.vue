<template>
  <el-table
    :data="
      tableData.filter(
        (data) =>
          !search || data.reward_name.toLowerCase().includes(search.toLowerCase())
      )
    "
    style="width: 100%"
  >
    <el-table-column label="ID" prop="id"> </el-table-column>
    <el-table-column label="Name" prop="reward_name"> </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="Type to search" />
      </template>
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import RewardStore from "@/store/RewardStore";
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
      await RewardStore.dispatch("fetch");
      this.tableData = RewardStore.getters.rewards;
    },
  },
};
</script>

<style></style>
