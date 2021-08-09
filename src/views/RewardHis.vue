<template>
<div>

    <header class="top-head" style="text-align:center">
      <br>
      <div class="cover-top"></div>
      <div>
        <label class="headerName">ประวัติการแลกรางวัล</label> 
      </div>
    <br>
    </header>


    <el-button class="btn" slot="reference" type="primary" icon="el-icon-present" @click="changeRounter('rewards/redeem')" round>แลกรางวัล</el-button>
    <div>
      
    </div>

    <div>
        <el-row >
            <el-col :span="6" v-for="reward in rewards" v-bind:key="reward">
                <RewardHistory :reward="reward" :who="who"/>
            </el-col>
        </el-row>
    </div>
</div>

  
</template>

<script>

import RewardStore from "../store/RewardStore"
import RewardHistory from "../components/cards/RewardHistory.vue"
import AuthUser from "../store/AuthUser"
export default {
    components: {RewardHistory},
  data(){
    return{
      rewards:[],
      check:1,
      who:[]
    }
  },  
  created() {
        this.fetch()
    },
    methods:{
        async fetch() {
          this.who = AuthUser.getters.user

          await RewardStore.dispatch("fetch")
          this.rewards = RewardStore.getters.rewards
          let arr = []


          for (let index = 0; index < this.who.rewards.length; index++) {
            await RewardStore.dispatch("find",this.who.rewards[index].id)
            let keep = RewardStore.getters.rewards
            arr.push(keep)
          }          
        },
        changeRounter(route) {
          this.$router.push(`/${route}`)
        }
    }
}

</script>

<style scoped lang="scss">
.btn{

    position: absolute;
    right: 6%;
    top: 9%;

}
.headerName{
  font-size: 5.5em;
  font-family: TAGonNon;
  text-shadow: 1px 0.5px;

}

</style>