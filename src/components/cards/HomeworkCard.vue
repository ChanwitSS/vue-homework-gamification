<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>วิชา: {{ homework.homework.homework_name }}</span>
        <el-popover placement="bottom" width="400" trigger="click" v-if="role=='Student'">
          <!--<SentForm v-if="role=='Student'"/>-->
          <!-- <CheckHomeworkForm :homework="homework" v-if="role=='Teacher'"/> -->
          <el-button style="float: right; padding: 3px 0" slot="reference" type="text" v-if="role=='Student'" @click="submitUpload">ส่งงาน</el-button>
          <!-- <el-button style="float: right; padding: 3px 0" slot="reference" type="text"  v-if="role=='Teacher'">ตรวจงาน</el-button> -->
        </el-popover>
        <el-popover placement="bottom" width="600" trigger="click" v-if="role=='Teacher'">
          <!-- <SentForm v-if="role=='Student'"/> -->
          <CheckHomeworkForm :homework="homework" v-if="role=='Teacher'"/>
          <!-- <el-button style="float: right; padding: 3px 0" slot="reference" type="text" v-if="role=='Student'">ส่งงาน</el-button> -->
          <el-button style="float: right; padding: 3px 0" slot="reference" type="text"  v-if="role=='Teacher'">ตรวจงาน</el-button>
        </el-popover>

    </div>
    <div class="text item">
      <p>ชื่อการบ้าน: {{ homework.homework.homework_name }}</p>
      <p>คำอธิบาย: {{ homework.homework.description }}</p>
      <p>กำหนดส่ง: {{ homework.homework.due_date.substring(0,9) }} {{ homework.homework.due_date.substring(11,16) }}</p>
    </div>
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList" >
      <el-button size="small" type="primary">แนบเอกสาร</el-button>
    </el-upload>
    <el-button size="medium" type="success" style="margin-left: 40%;" @click="sendHomework">ส่งงาน</el-button>
  </el-card>
</template>

<script>
import SentForm from "../forms/HomeworkSentForm.vue";
import CheckHomeworkForm from "../forms/CheckHomeworkForm.vue"
export default {
  components: { SentForm, CheckHomeworkForm },
  data() {
    return {
      homework_name: null,
      fileList: []
    };
  },
  props: {
    homework: null,
    role: null,
  },
  methods: {
    beforeRemove(file, fileList) {
      return this.$confirm(`ยกเลิกการอัพโหลดไฟล์ ${ file.name }`, 'คำเตือน', {
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกลง',
        type: 'warning'
      });
    },
    handleExceed(files, fileList) {
      this.$message.warning(`สามารถเอกสารได้ไม่เกิน 2 ไฟล์เท่านั้น`);
    },
    sendHomework() {
      if (this.fileList.length < 1) {
        this.$message.warning(`โปรดแนบเอกสาร`);
      }
    }
  }
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

  .box-card {
    position: relative;
    width: 380px;
    min-height: 300px;
    display: inline-block;
    margin: 20px;
  }
</style>
