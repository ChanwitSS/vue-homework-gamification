<template>
  <div>
    <!--<el-popover placement="right" width="400" trigger="click">
        <HomeworkAssignForm>
        </HomeworkAssignForm>
        <el-button slot="reference" type="primary" icon="el-icon-circle-plus" round>สั่งการบ้าน</el-button>
    </el-popover>-->

    <!-- <div>
        <homework-sent-form></homework-sent-form>
    </div> -->
    <div v-if="userRole === 'Student'">
        <div v-for="(homework, index) in filterHomeworks" v-bind:key="index" class="card">
            <Card :homework="homework" />
        </div>
    </div>
    <div v-if="userRole === 'Teacher'">
        <div v-for="(homework, index) in filterHomeworks" v-bind:key="index" class="card">
            <Card :homework="homework"/>
        </div>
    </div>

  </div>
</template>


<script>
import HomeworkStore from '@/store/HomeworkStore'
import Card from '../components/cards/HomeworkCard.vue'
import HomeworkSentForm from "../components/forms/HomeworkSentForm.vue"
import HomeworkAssignForm from '../components/forms/HomeworkAssignForm.vue'
import User from '../store/AuthUser'
export default {
    components: { Card,HomeworkSentForm,HomeworkAssignForm },
    data() {
        return {
            user: User.getters.user,
            userRole: User.getters.user.role.name,
            homeworks: [],
            filterHomeworks: []
        }
    },
    created() {
        this.fetch()
    },
    methods: {
        async fetch() {
            await HomeworkStore.dispatch("fetch")
            this.homeworks = HomeworkStore.getters.homeworks
            this.filter()
        },
        filter() {
            let subjects = this.user.subjects.map((obj) => obj.id) 
            if (this.userRole == 'Student') {
                for (var i=0; i<this.homeworks.length; i++) {
                    if (subjects.indexOf(this.homeworks[i].subject.id)!= -1) {
                        this.filterHomeworks.push(this.homeworks[i])
                    }
                }
            } else if (this.userRole == 'Teacher') {
                for (var i=0; i<this.homeworks.length; i++) {
                    if (subjects.indexOf(this.homeworks[i].subject.id)!= -1) {
                        this.filterHomeworks.push(this.homeworks[i])
                    }
                }
                console.log(this.filterHomeworks)
            }
        }
    }
}
</script>


<style>
.card {
    width: 380px;
    height: 300px;
    margin-right: 20px;
    position: relative;
    display: inline-block;
}
</style>

