<template>
<div>

    <el-button slot="reference" type="primary" icon="el-icon-present" @click="changeRounter('rewards')" round>แลกรางวัล</el-button>
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
          console.log("Auth Reward");
          console.log(AuthUser.getters.user);
          this.who = AuthUser.getters.user
          console.log(this.who);

          await RewardStore.dispatch("fetch")
          this.rewards = RewardStore.getters.rewards
          console.log(this.rewards);
          let arr = []


          for (let index = 0; index < this.who.rewards.length; index++) {
            await RewardStore.dispatch("find",this.who.rewards[index].id)
            let keep = RewardStore.getters.rewards
            console.log("keep");
            console.log(keep);
            arr.push(keep)
            
          }
          


            
          this.rewards = arr
          console.log("Fetch reward");
          console.log(this.rewards);

        },
        changeRounter(route) {
          this.$router.push(`/${route}`)
        }
    }
}

</script>

<style>

</style>