<template>
  <div @editItem="getClickedItem">
    <el-form
      :model="ruleForm"
      status-icon
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      @editItem="getClickedItem"
    >
      <el-form-item label="ชื่อรางวัล" prop="reward_name">
        <el-input
          type="text"
          v-model="clickedItem.reward_name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="แต้มรางวัลที่ใช้" prop="reward_point">
        <el-input
          type="text"
          v-model.number="clickedItem.reward_point"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="เหลือรางวัล" prop="reward_remain">
        <el-input v-model.number="clickedItem.reward_remain"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('clickedItem')"
          >Update</el-button
        >
        <el-button @click="resetForm('clickedItem')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { EventBus } from "@/store/EventBus";
import RewardStore from "@/store/RewardStore";
import moment from "moment";
export default {
  data() {
    return {
      clickedItem: [],
      ruleForm: {
        reward_name: "",
        reward_point: 0,
        reward_remain: 0,
      },
      index: 0,
    };
  },
  computed: {
    checkFormEmtry: function() {
      return (
        this.ruleForm.reward_name !== "" &&
        this.ruleForm.reward_point !== 0 &&
        this.ruleForm.reward_remain !== 0
      );
    },
    checkFormChange: function() {
      return (
        this.ruleForm.reward_name !== this.clickedItem.reward_name ||
        this.ruleForm.reward_point !== this.clickedItem.reward_point ||
        this.ruleForm.reward_remain !== this.clickedItem.reward_remain
      );
    },
  },
  mounted() {
    EventBus.$on("route-data", (data) => {
      this.clickedItem = data.row;
      this.ruleForm.reward_name = this.clickedItem.reward_name;
      this.ruleForm.reward_point = this.clickedItem.reward_point;
      this.ruleForm.reward_remain = this.clickedItem.reward_remain;
      this.index = data.index;
    });
  },
  methods: {
    getClickedItem(value) {
      this.clickedItem = value;
    },
    clearForm() {
      this.clickedItem = [];
    },
    async submitForm(formName) {
      if (this.checkFormEmtry) {
        if (this.checkFormChange) {
          let payload = {
            index: this.index,
            id: this.clickedItem.id,
            reward_name: this.clickedItem.reward_name,
            reward_remain: this.clickedItem.reward_remain,
            users: this.clickedItem.users,
            reward_point: this.clickedItem.reward_point,
          };
          this.$confirm(
            "This will permanently Change the file. Continue?",
            "Warning",
            {
              confirmButtonText: "OK",
              cancelButtonText: "Cancel",
              type: "warning",
            }
          )
            .then(() => {
              this.$notify({
                type: "success",
                message: "Change completed",
              });
            })
            .then(async () => {
              await RewardStore.dispatch("editReward", payload);
              await EventBus.$emit("trans-data");
              this.clearForm();
            })
            .catch(() => {
              this.$notify.info({
                type: "info",
                message: "Change canceled",
              });
            });
        } else {
          this.$notify.info({
            title: "Info",
            message: "You did not change some thing",
          });
        }
      } else {
        this.$notify.info({
          title: "Info",
          message: "Please select row to edit",
        });
      }
    },
    resetForm(formName) {
      this.clickedItem.reward_name = this.ruleForm.reward_name;
      this.clickedItem.reward_point = this.ruleForm.reward_point;
      this.clickedItem.reward_remain = this.ruleForm.reward_remain;
    },
  },
};
</script>

<style></style>
