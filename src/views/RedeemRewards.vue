<template>
<div>

   <!-- <el-button slot="reference" type="primary" icon="el-icon-receiving" round @click="changeRounter('rewardsHistory')">ประวัติการแลกรางวัล</el-button> -->

  <div style="text-align:center">
    <label class="headerName">แลกของรางวัล</label> 
    <br>
        <div >
        <el-row >
            <el-col >
                <RewardExchange :reward="reward" :who="who"/>
            </el-col>
        </el-row>
    </div>
    <!-- <label style="margin:0">คะแนนคงเหลือของคุณคือ {{ who.left_point}} คะแนน</label> -->
  </div>

  <el-button class="btn" slot="reference" type="primary" icon="el-icon-receiving" round @click="changeRounter('rewardsHistory')">ประวัติการแลกรางวัล</el-button>


</div>

  
</template>

<script>

import RewardStore from "../store/RewardStore"
import RewardExchange from "../components/cards/RewardExchange.vue"
import AuthUser from "../store/AuthUser"
export default {
    components: {RewardExchange},
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
          for (let index = 0; index < this.rewards.length; index++) {
            if (this.rewards[index].reward_remain!==0) {
              await RewardStore.dispatch("find",this.rewards[index].id)
              let keep = RewardStore.getters.rewards
              arr.push(keep)
            } 
          }
          //sort by reward_point
          arr.sort(function (a, b) {
            return a.reward_point - b.reward_point;
          });

          this.rewards = arr

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
    right: 0%;
    top: 5%;

}
.headerName{
  font-size: 5.5em;
  font-family: TAGonNon;
  text-shadow: 1px 0.5px;

}



</style>
