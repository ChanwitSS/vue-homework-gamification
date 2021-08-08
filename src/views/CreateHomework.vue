<template>
<div>
    <header class="top-head" style="text-align:center">
        <br>
        <div class="cover-top"></div>
        <div>
            <label class="headerName">สั่งการบ้าน</label>
        </div>
        <br>
    </header>

  <HomeworkAssignForm/> 
</div>
</template>

<script>
import HomeworkAssignForm from '../components/forms/HomeworkAssignForm.vue'
export default {
    components: { HomeworkAssignForm }
}
</script>

<style>

</style>