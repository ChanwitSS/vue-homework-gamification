<template>
  <div>
    <el-table
      class="center"
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.first_name.toLowerCase().includes(search.toLowerCase()) ||
            data.last_name.toLowerCase().includes(search.toLowerCase()) ||
            data.user_ID.toString().includes(search)
        )
      "
      style="width: 100"
    >
      <template slot-scope="scope">
        <el-table-column type="expand">
          <template slot-scope="props">
            <p>username: {{ props.row.username }}</p>
            <p>email: {{ props.row.email }}</p>
            <p>created_at: {{ props.row.created_at }}</p>
            <p>updated_at: {{ props.row.updated_at }}</p>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column label="ชื่อ" prop="first_name" width="120">
        </el-table-column>
        <el-table-column label="นามสกุล" prop="last_name" width="120">
        </el-table-column>
        <el-table-column label="userID" prop="user_ID" width="120">
        </el-table-column>
        <el-table-column label="ตำแหน่ง" prop="role.name" width="130">
        </el-table-column>

        <el-table-column align="right" width="360">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="Type to search"
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
  </div>
</template>

<script>
import moment from "moment";
import UserStore from "@/store/UserStore";
import { EventBus } from "@/store/EventBus";
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
  async mounted() {
    await EventBus.$on("trans-data", (data) => {
      this.fetch();
    });
  },
  methods: {
    async fetch() {
      await UserStore.dispatch("fetchSelect");
      //   this.tableData = UserStore.getters.users;
      this.tableData = UserStore.getters.users;
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
    routeItemPressed(index, row) {
      EventBus.$emit("route-data", { row, index });
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
          // location.reload();
        })
        .then(async () => {
          await UserStore.dispatch("delete", row);
          this.fetch();
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
    // async success(row) {
    //   await UserStore.dispatch("delete", row);
    //   this.fetch();
    // },
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
