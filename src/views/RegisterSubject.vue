<template>
    <div>
        <header class="top-head" style="text-align:center">
            <br>
            <div class="cover-top"></div>
            <div>
                <label class="headerName">เพิ่มวิชาให้นักเรียน</label>
            </div>
            <br>
        </header>
       
        <div class="add_sub_board">
            <add-subject-stu></add-subject-stu>
        </div>
    </div>
</template>

<script>
import AddSubjectStu from "../components/board/AddSubjectStu.vue"
export default {
    components:{AddSubjectStu}
    
}
</script>

<style scoped lang="scss" >
.add_sub_board{
    margin-top: 20px;
    margin-left: 100px;
    width: 100%;
}


</style>