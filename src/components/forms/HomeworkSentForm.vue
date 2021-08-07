<template>
  <div>
    <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/"
    ref="upload"
      :auto-upload="false">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Drop file here or <em>Click to select file</em><br><label style="font-size:0.75em" @click="changeUpload"> with a size less than 500kb</label></div>
    </el-upload>
    <el-button style="margin-left: 150px;" size="small" type="success" @click="changeUpload">upload to server</el-button>
    
    <el-alert title="success" type="success" show-icon="" v-if="uploadFile==1"></el-alert>
  </div>
</template>

<script>
export default {
  data(){
    return{
      uploadFile:0
    }

  },
  methods:{
    changeUpload(){
      if (this.uploadFile==0) {
        this.uploadFile =1
        this.$refs.upload.submit();
      } else {
        this.uploadFile =0
      }
      
    }

  }

}
</script>

<style>
.box {
  width: 380px;
  height: 300px;
  display: inline-block;
  margin: 10px;
}
.upload-demo{
  margin-left: 20px;
}
</style>