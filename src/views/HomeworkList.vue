<template>
  <div>
    <!--<el-popover placement="right" width="400" trigger="click">
        <HomeworkAssignForm>
        </HomeworkAssignForm>
        <el-button slot="reference" type="primary" icon="el-icon-circle-plus" round>สั่งการบ้าน</el-button>
    </el-popover>-->

    <header class="top-head" style="text-align:center" v-if="userRole === 'Teacher'">
        <br>
        <div class="cover-top"></div>
        <div>
            <label class="headerName">ตรวจการบ้าน</label>
        </div>
        <br>
    </header>

    <header class="top-head" style="text-align:center" v-if="userRole === 'Student'">
        <br>
        <div class="cover-top"></div>
        <div>
            <label class="headerName">ส่งการบ้าน</label>
        </div>
        <br>
    </header>


    <div v-if="userRole === 'Student'">
        <div v-for="(homework, index) in filterHomeworks" v-bind:key="index" class="card">
            <Card :homework="homework" :role="userRole" :user="user"/>
        </div>
    </div>
    <div v-if="userRole === 'Teacher'">
        <div v-for="(homework, index) in filterHomeworks" v-bind:key="index" class="card">
            <Card :homework="homework" :role="userRole" :user="user"/>
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
import Axios from 'axios'
import Auth from '../services/auth'

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
            if (this.userRole == 'Student') {
                res = await Axios.get(
                    apiUrl + `/student-homeworks?users_permissions_user.role=${this.user.role.id}&users_permissions_user=${this.user.id}&is_sent=0`,
                    Auth.getApiHeader
                )
            } else if (this.userRole == 'Teacher') {
                res = await Axios.get(apiUrl + `/student-homeworks?users_permissions_user.role=${this.user.role.id}&users_permissions_user=${this.user.id}&is_check=0`,
                    Auth.getApiHeader
                )
            }
            console.log(res)
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
    left: 50px;
}
.headerName{
  font-size: 5.5em;
  font-family: TAGonNon;
  color: #000000;
  /* font-weight:bold; */
  text-shadow: 1px 1.5px;

}
.top-head{
    /* background-color: rgb(183, 199, 233); */
    background-image: url(../assets/stationary_fade3.jpg);  

    /* background: rgba(5, 103, 195, 0.411) */
}




</style>

