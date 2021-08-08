<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-arrow-left"
      @click="changeRounter('rewards/manage')"
      >Previous Page</el-button
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

<style></style>
