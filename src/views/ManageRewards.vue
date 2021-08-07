<template>
  <div class="">
    <admin-reward-table></admin-reward-table>
    <reward-edit></reward-edit>
    <el-button type="primary" icon="el-icon-plus" circle @click="changeRounter('rewards/create')" ></el-button>
  </div>
</template>

<script>
import adminRewardTable from "@/components/board/adminRewardTable.vue";
import RewardEdit from "../components/board/rewardEdit.vue";
export default {
  components: { adminRewardTable, RewardEdit },
  methods: {
    changeRounter(route) {
      this.$router.push(`/${route}`);
    },
  },
};
</script>

<style></style>
