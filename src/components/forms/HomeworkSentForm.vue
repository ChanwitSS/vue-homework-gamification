<template>
  <div class='box'>
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
      <el-button size="medium" type="success" style="margin-left: 40%; margin-top: 100px;">ส่งงาน</el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      uploadFile:0
    }

  },
  methods:{
    uploadImage(event) {

    let apiUrl = process.env.VUE_APP_API_HOST

    let data = new FormData();
    // console.log(data);
    // data.append('name', 'my-picture');
    // console.log(data);
    // data.append('file', event.target.files[0]); 
    // console.log(data);

    console.log(event.target.files[0]);

    let config = {
      header : {
        'Content-Type' : 'Attachment'
      }
    }

    let body = {
      attachment_file: event.target.files[0],
      name: 'my-picture'
    }


    axios.post(apiUrl+"/attachments", body,config).then(
      response => {
        console.log('image upload response > ', response)
      }
    )
  },
    beforeRemove(file, fileList) {
      return this.$confirm(`ยกเลิกการอัพโหลดไฟล์ ${ file.name }`, 'คำเตือน', {
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกลง',
        type: 'warning'
      });
    },
    handleExceed(files, fileList) {
      this.$message.warning(`สามารถอัพโหลดได้ไม่เกิน 3 ไฟล์เท่านั้น`);
    },

  }

}
</script>

<style>
.box {
  width: 380px;
  height: 200px;
  display: inline-block;
  margin: 10px;
}

</style>