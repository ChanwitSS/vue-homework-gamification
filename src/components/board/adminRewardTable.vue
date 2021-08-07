<template>
  <el-table
    :data="
      tableData.filter(
        (data) =>
          !search ||
          data.reward_name.toLowerCase().includes(search.toLowerCase())
      )
    "
    style="width: 100"
  >
    <template slot-scope="scope">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column label="ชื่อรางวัล" prop="reward_name" width="120">
      </el-table-column>
      <el-table-column label="แต้มรางวัลที่ใช้" prop="reward_point" width="120">
      </el-table-column>
      <el-table-column label="เหลือรางวัล" prop="reward_remain" width="120">
      </el-table-column>
      <el-table-column label="วันที่สร้าง" prop="created_at" width="120">
      </el-table-column>
      <el-table-column label="วันที่แก้ไข" prop="updated_at" width="120">
      </el-table-column>

      <el-table-column align="right" width="360">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="routeItemPressed(scope.$index, scope.row)"
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
    </template>
  </el-table>
</template>

<script>
import moment from "moment";
import RewardStore from "@/store/RewardStore";
import { EventBus } from "@/store/EventBus";
export default {
  data() {
    return {
      editIndex: -1,
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
    async handleDelete(index, row) {
      this.$confirm(
        "This will permanently delete the file. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
          center: true,
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "Delete completed",
          });
          RewardStore.dispatch("delete", row);
          this.fetch();
          location.reload();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
          // this.fetch();
        });
      // this.fetch();
    },
    routeItemPressed(index, row) {
      EventBus.$emit("route-data", { row, index });
    },
  },
};
</script>

<style></style>
