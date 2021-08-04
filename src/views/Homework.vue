<template>
  <div>
    <el-popover placement="right" width="400" trigger="click">
        <HomeworkAssignForm>
        </HomeworkAssignForm>
        <el-button slot="reference" type="primary" icon="el-icon-circle-plus" round>สั่งการบ้าน</el-button>
    </el-popover>

    <!-- <div>
        <homework-sent-form></homework-sent-form>
    </div> -->

    <!-- <insert-form></insert-form> -->

    <div v-for="(homework, index) in homeworks" v-bind:key="index">
        <Card :homework="homework"/>
    </div>
  </div>
</template>

<script>
import HomeworkStore from '@/store/HomeworkStore'
import Card from '../components/cards/HomeworkCard.vue'
import HomeworkSentForm from "../components/forms/HomeworkSentForm.vue"
import HomeworkAssignForm from '../components/forms/HomeworkAssignForm.vue'
import InsertForm from '../components/forms/InsertForm.vue'
export default {
    components: { Card,HomeworkSentForm,HomeworkAssignForm,InsertForm },
    data() {
        return {
            userRole: null,
            homeworks: []
        }
    },
    created() {
        this.fetch()
    },
    methods: {
        async fetch() {
            await HomeworkStore.dispatch("fetch")
            this.homeworks = HomeworkStore.getters.homeworks
        },
    }
}
</script>


<style>

</style>