<template>
  <el-table
    :data="
      tableData.filter(
        (data) =>
          !search ||
          data.reward_name.toLowerCase().includes(search.toLowerCase())
      )
    "
    style="width: 96%"
  >
    <template >
      <el-table-column type="index" width="60"> </el-table-column>
      <el-table-column label="ชื่อรางวัล" prop="reward_name" width="175">
      </el-table-column>
      <el-table-column label="แต้มรางวัลที่ใช้" prop="reward_point" width="140">
      </el-table-column>
      <el-table-column label="เหลือรางวัล" prop="reward_remain" width="140">
      </el-table-column>
      <el-table-column label="วันที่สร้าง" prop="created_at" width="250">
      </el-table-column>
      <el-table-column label="วันที่แก้ไข" prop="updated_at" width="220">
      </el-table-column>

      <el-table-column align="right" width="300">
        <template slot="header" >
          <el-input
            v-model="search"
            size="mini"
            placeholder="Type (ชื่อรางวัล) to search"
          />
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
  async mounted() {
    await EventBus.$on("trans-data", (data) => {
      this.fetch();
    });
  },
  methods: {
    async fetch() {
      await RewardStore.dispatch("fetch");
      this.tableData = RewardStore.getters.rewards;
      for (let index = 0; index < this.tableData.length; index++) {
        this.tableData[index].updated_at = moment(
          this.tableData[index].updated_at
        ).format("MMMM Do YYYY, h:mm:ss a");
        this.tableData[index].created_at = moment(
          this.tableData[index].created_at
        ).format("MMMM Do YYYY, h:mm:ss a");
        console.log(this.tableData[index]);
      }
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
        .then(async () => {
          this.$notify({
            type: "success",
            message: "Delete completed",
          });
          await RewardStore.dispatch("delete", row);
          this.fetch();
          // location.reload();
        })
        // .then(async () => {
        //   await this.fetch();
        // })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    routeItemPressed(index, row) {
      EventBus.$emit("route-data", { row, index });
    },
  },
};
</script>

<style></style>
