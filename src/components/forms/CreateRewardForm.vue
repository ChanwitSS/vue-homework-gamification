<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      style="width:120px;margin-left:400px;margin-top:40px"
    >
      <el-form-item label="ชื่อรางวัล" prop="reward_name" >
        <el-input
          type="text"
          v-model="ruleForm.reward_name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      
      <el-form-item label="เหลือรางวัล" prop="reward_remain">
        <el-input
          v-model.number="ruleForm.reward_remain"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      
      <el-form-item label="แต้มรางวัลที่ใช้" prop="reward_point">
        <el-input v-model.number="ruleForm.reward_point"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:100px">
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
          "ยืนยันการสร้างรางวัล",
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
              message: "สร้างรางวัลสำเร็ข",
            });
          })
          .then(() => {
            RewardStore.dispatch("addReward", this.ruleForm);
            this.$refs[formName].resetFields();
          })
          .catch(() => {
            this.$notify({
              type: "info",
              message: "ยกเลิกการสร้างรางวัล",
            });
          });
      }
      else{
           this.$notify({
              type: "info",
              message: "โปรดกรอกข้อมูล",
            });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
