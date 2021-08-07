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
            <Card :homework="homework" :role="userRole"/>
        </div>
    </div>
    <div v-if="userRole === 'Teacher'">
        <div v-for="(homework, index) in filterHomeworks" v-bind:key="index" class="card">
            <Card :homework="homework" :role="userRole"/>
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
import CheckHomeworkForm from '../components/forms/CheckHomeworkForm.vue'
<<<<<<< HEAD
import Axios from 'axios'
=======
>>>>>>> origin/peang

export default {
    components: { Card, HomeworkSentForm, HomeworkAssignForm, CheckHomeworkForm },
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
        async filter() {
            let apiUrl = process.env.VUE_APP_API_HOST
            let res
            console.log(this.user.id)
            if (this.userRole == 'Student') {
                res = await Axios.get(apiUrl + `/student-homeworks?users_permissions_user.role=${this.user.role.id}&users_permissions_user=${this.user.id}&is_sent=0`)
            } else if (this.userRole == 'Teacher') {
                res = await Axios.get(apiUrl + `/student-homeworks?users_permissions_user.role=${this.user.role.id}&users_permissions_user=${this.user.id}&is_check=0`)
            }
            this.filterHomeworks = res.data
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

