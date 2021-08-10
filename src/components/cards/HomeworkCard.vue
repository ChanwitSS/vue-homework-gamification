<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>วิชา: {{ homework.homework.homework_name }}</span>
        <!-- <el-popover placement="bottom" width="400" trigger="click" v-if="role=='Student'"> -->
          <!--<SentForm v-if="role=='Student'"/>-->
          <!-- <CheckHomeworkForm :homework="homework" v-if="role=='Teacher'"/> -->
          
          <!-- <el-button style="float: right; padding: 3px 0" slot="reference" type="text"  v-if="role=='Teacher'">ตรวจงาน</el-button> -->
        <!-- </el-popover> -->
        <el-button style="float: right; padding: 3px 0" slot="reference" type="text" v-if="role=='Student'" @click="sendHomework">ส่งงาน</el-button>
        <el-button style="float: right; padding: 3px 0" slot="reference" type="text"  v-if="role=='Teacher'">ตรวจงาน</el-button>
        <!-- <el-popover placement="bottom" width="600" trigger="click" v-if="role=='Teacher'">
           <SentForm v-if="role=='Student'"/> 
          <CheckHomeworkForm :homework="homework" v-if="role=='Teacher'"/>
        </el-popover> -->

    </div>
    <div class="text item">
      <p>ชื่อการบ้าน: {{ homework.homework.homework_name }}</p>
      <p>คำอธิบาย: {{ homework.homework.description }}</p>
      <p>กำหนดส่ง: {{ homework.homework.due_date.substring(0,9) }} {{ homework.homework.due_date.substring(11,16) }}</p>
      <p>คะแนน: {{ homework.homework.point }}</p>
    </div>
    <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false" 
    :limit="3" :before-remove="beforeRemove" multiple :on-change="addAttachment" :on-remove="deleteAttachment" v-if="role=='Student'">
      <el-button slot="trigger" size="small" type="primary">แนบไฟล์</el-button>
    </el-upload>

    <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false" 
    :limit="3" :before-remove="beforeRemove" multiple :on-change="addAttachment" :on-remove="deleteAttachment"  v-if="role=='Teacher'">
    </el-upload>
  </el-card>
</template>

<script>
import SentForm from "../forms/HomeworkSentForm.vue";
import CheckHomeworkForm from "../forms/CheckHomeworkForm.vue"
import Attachment from "../../store/AttachmentStore"
import AuthUser from '../../store/AuthUser';
import UserStore from "../../store/UserStore"
import HomeworkStore from '@/store/HomeworkStore'
import Axios from 'axios'
let apiUrl = process.env.VUE_APP_API_HOST
export default {
  components: { SentForm, CheckHomeworkForm },
  data() {
    return {
      homework_name: null,
      attachments: [],
      dialogVisible: false,
      dialogFileUrl: null,
    };
  },
  props: {
    homework: null,
    role: null,
    user: null,
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
      this.$message.warning(`สามารถเอกสารได้ไม่เกิน 3 ไฟล์เท่านั้น`);
    },
    async sendHomework() {
      console.log(this.attachments)
      if (this.attachments.length == 0) {
        this.$message.warning(`โปรดแนบเอกสาร`);
      } else {
        this.$confirm('ยืนยันการส่งงาน', '', {
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'ส่งงานสำเร็จ'
          })
        }).then(
          this.success()
        ).catch(() => {
          this.$message({
            type: 'info',
            message: 'ยกเลิกการส่งงาน'
          }); 
        })
      }
    },
    addAttachment(file, fileList) {
      this.attachments.push(file)
    },
    deleteAttachment(file, fileList) {
      for (let i=0; i<this.attachments.length; i++) {
        if (this.attachments[i] === file) {
          this.attachments.splice(i, 1)
          break
        }
      }
    },
    handlePreview(file) {
      console.log(file)
      this.dialogFileUrl = file.raw;
      this.dialogVisible = true;
    },
    async success() {
      this.user.total_point = this.user.total_point + this.homework.homework.point
      this.user.left_point = this.user.left_point + this.homework.homework.point

      await Axios.put(apiUrl + '/student-homeworks/' + this.homework.id, {
        is_sent: true
      })
      console.log(this.user)
      await UserStore.dispatch("edit", this.user)
      await HomeworkStore.dispatch("filterHomeworks", this.user)
      console.log("Here",HomeworkStore.getters.homeworks)
      this.$emit('fetch')
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
