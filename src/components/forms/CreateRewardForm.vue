<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
      style="width:120px;margin-left:400px;margin-top:60px"
    >
      <el-form-item label="ชื่อรางวัล" prop="reward_name" class="create_reward">
        <el-input
          type="text"
          v-model="ruleForm.reward_name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      
      <el-form-item label="เหลือรางวัล" prop="reward_remain" class="create_reward">
        <el-input
          v-model.number="ruleForm.reward_remain"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      
      <el-form-item label="แต้มรางวัลที่ใช้" prop="reward_point" class="create_reward">
        <el-input v-model.number="ruleForm.reward_point"></el-input>
      </el-form-item>
      
      <el-form-item style="margin-left:80px" class="create_reward">
        <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import RewardStore from "@/store/RewardStore";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (this.ruleForm.reward_point === "") {
        return callback(new Error("Please input the point"));
      } else if (!Number.isInteger(this.ruleForm.reward_point)) {
        return callback(new Error("input must be number"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (this.ruleForm.reward_name === "") {
        callback(new Error("Please input the Reward name"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (this.ruleForm.reward_remain === "") {
        return callback(new Error("Please input the remain"));
      } else if (!Number.isInteger(this.ruleForm.reward_remain)) {
        return callback(new Error("input must be number"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        reward_name: "",
        reward_point: "",
        reward_remain: "",
      },
      rules: {
        reward_name: [{ validator: validatePass, trigger: "blur" }],
        reward_remain: [{ validator: validatePass2, trigger: "blur" }],
        reward_point: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    async submitForm(formName) {
      if (
        this.ruleForm.reward_name !== "" &&
        this.ruleForm.reward_point !== "" &&
        this.ruleForm.reward_remain !== ""
      ) {
        this.$confirm(
          "This will permanently Create the file. Continue?",
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
              message: "Create completed",
            });
          })
          .then(() => {
            RewardStore.dispatch("addReward", this.ruleForm);
            this.$refs[formName].resetFields();
          })
          .catch(() => {
            this.$notify({
              type: "info",
              message: "Create canceled",
            });
          });
      }
      else{
           this.$notify({
              type: "info",
              message: "Please complete the form",
            });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.create_reward{
    width: 450px;
    display: inline-block;
    margin: 15px;
}

</style>
