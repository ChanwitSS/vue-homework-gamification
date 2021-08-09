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

    <div class="assign_form"><HomeworkAssignForm/> </div>
  
</div>
</template>

<script>
import HomeworkAssignForm from '../components/forms/HomeworkAssignForm.vue'
export default {
    components: { HomeworkAssignForm }
}
</script>

<style scoped lang"scss">


</style>