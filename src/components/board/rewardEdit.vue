<template>
  <div @editItem="getClickedItem" class="edit_reward">
    <el-form
      :inline="true" class="demo-form-inline"
      @editItem="getClickedItem"
      style="width:100%;"
    >
      <el-form-item label="ชื่อรางวัล" prop="reward_name" class="manage">
        <el-input
          type="text"
          v-model="clickedItem.reward_name"
          autocomplete="off"
          size="small"
          style="width:250px"
        ></el-input>
      </el-form-item>
      <el-form-item label="แต้มรางวัลที่ใช้" prop="reward_point" class="manage">
        <el-input
          type="text"
          v-model.number="clickedItem.reward_point"
          autocomplete="off"
          size="small"
          style="width:100px"
        ></el-input>
      </el-form-item>
      <el-form-item label="เหลือรางวัล" prop="reward_remain" class="manage">
        <el-input v-model.number="clickedItem.reward_remain" size="small" style="width:100px"></el-input>
      </el-form-item>
      <el-form-item class="manage" style="margin-left:100px">
        <el-button type="primary" @click="submitForm('clickedItem')" size="small" style="width:80px">Update</el-button
        >
        <el-button @click="resetForm('clickedItem')" size="small" style="width:80px">Reset</el-button>
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
            "ยืนยันการลบรางวัล",
            "",
            {
              confirmButtonText: "ตกลง",
              cancelButtonText: "ยกเลิก",
              type: "warning",
            }
          )
            .then(() => {
              this.$notify({
                type: "success",
                message: "แก้ไขรางวัลสำเร็จ",
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
                message: "ยกเลิกการแก้ไขรางวัล",
              });
            });
        } else {
          this.$notify.info({
            title: "Info",
            message: "โปรดกรอกข้อมูลที่ต้องการเปลี่ยน",
          });
        }
      } else {
        this.$notify.info({
          title: "Info",
          message: "โปรดเลือกข้อมูลที่ต้องการเปลี่ยน",
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

<style scoped lang="scss">
.edit_reward{
  margin-top: 20px;
  margin-left: 60px;
  width: 92%;
  background-color: rgb(255, 255, 255);
}
.manage{
  padding-left: 40px;
  margin: 20px;
}
</style>
