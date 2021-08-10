<template>
  <div>
      <header class="top-head" style="text-align:center">
        <br>
        <div class="cover-top"></div>
        <div>
            <label class="headerName">เพิ่มรางวัล</label>
        </div>
        <br>
    </header>
    <el-button
      type="primary"
      icon="el-icon-arrow-left"
      @click="changeRounter('rewards/manage')"
      round
      class="btn"
      >กลับไปหน้าจัดการรางวัล</el-button
    >
    <create-reward-form></create-reward-form>
  </div>
</template>

<script>
import CreateRewardForm from "../components/forms/CreateRewardForm.vue";
export default {
  components: { CreateRewardForm },
  methods: {
    changeRounter(route) {
      this.$router.push(`/${route}`);
    },
  },
};
</script>

<style scoped lang="scss">
.btn{

    position: absolute;
    right: 6%;
    top: 9%;

}</style>
