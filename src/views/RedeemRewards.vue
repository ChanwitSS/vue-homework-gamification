<template>
<div>

   <!-- <el-button slot="reference" type="primary" icon="el-icon-receiving" round @click="changeRounter('rewardsHistory')">ประวัติการแลกรางวัล</el-button> -->

  <header class="top-head" style="text-align:center">
        <br>
        <div class="cover-top"></div>
        <div>
            <label class="headerName">แลกรางวัล</label>
        </div>
        <br>
    </header>

  <el-button class="btn" slot="reference" type="primary" icon="el-icon-receiving" round @click="changeRounter('rewardsHistory')">ประวัติการแลกรางวัล</el-button>

    <div>
        <el-row >
            <el-col :span="6" v-for="reward in rewards" v-bind:key="reward">
                <RewardExchange :reward="reward" :who="who"/>
            </el-col>
        </el-row>
    </div>
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
          console.log("Auth Reward");
          console.log(AuthUser.getters.user);
          this.who = AuthUser.getters.user
          console.log(this.who);

          await RewardStore.dispatch("fetch")
          this.rewards = RewardStore.getters.rewards
          console.log(this.rewards);
          let arr = []
          for (let index = 0; index < this.rewards.length; index++) {
              console.log(this.rewards[index]);
              console.log("reward point "+index+": "+this.rewards[index].reward_point);
              console.log(this.who.left_point);
            if (this.rewards[index].reward_remain!==0) {
              console.log("find");
              console.log(this.rewards[index]);

              await RewardStore.dispatch("find",this.rewards[index].id)
              let keep = RewardStore.getters.rewards
              console.log("keep");
              console.log(keep);
              arr.push(keep)
            }
            
          }

          //sort by reward_point
          arr.sort(function (a, b) {
            return a.reward_point - b.reward_point;
          });

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

<style scoped lang="scss">
.btn{

    position: absolute;
    right: 6%;
    top: 6%;

}
.headerName{
  font-size: 5.5em;
  font-family: TAGonNon;
  text-shadow: 1px 0.5px;

}



</style>
