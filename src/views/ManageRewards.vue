<template>
  <div>
    <header class="top-head" style="text-align:center">
        <br>
        <div class="cover-top"></div>
        <div>
            <label class="headerName">จัดการรางวัล</label>
        </div>
        <br>
    </header>

    <div class=""><reward-edit></reward-edit></div>
    <div class="reward_table"><admin-reward-table></admin-reward-table></div>
    <el-button type="primary" icon="el-icon-plus" round @click="changeRounter('rewards/create')" class="btn">เพิ่มรางวัล</el-button>
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

<style scoped lang="scss">
.reward_table{
  margin-left: 60px;
  margin-top: 20px;
}

.btn{

    position: absolute;
    right: 6%;
    top: 9%;

}

</style>
