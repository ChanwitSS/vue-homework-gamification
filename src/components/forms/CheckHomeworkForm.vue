<template>
  <div>
    <el-upload class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="picture">
    <el-button size="small" type="primary">Click to upload</el-button>
    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
    </el-upload>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>