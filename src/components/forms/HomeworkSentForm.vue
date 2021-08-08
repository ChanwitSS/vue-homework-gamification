<template>
  <div>
  <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input">  </div>
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