<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="Reward name" prop="reward_name">
        <el-input
          type="text"
          v-model="ruleForm.reward_name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Reward Remain" prop="reward_remain">
        <el-input
          v-model.number="ruleForm.reward_remain"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Reward Point" prop="reward_point">
        <el-input v-model.number="ruleForm.reward_point"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >Submit</el-button
        >
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
      await RewardStore.dispatch("add", this.ruleForm);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
