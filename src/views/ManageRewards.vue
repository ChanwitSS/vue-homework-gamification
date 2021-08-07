<template>
<<<<<<< HEAD
<div>

   <!-- <el-button slot="reference" type="primary" icon="el-icon-receiving" round @click="changeRounter('rewardsHistory')">ประวัติการแลกรางวัล</el-button> -->

  <div>
    <!-- <label class="point">ยอดคะแนนคงเหลือ : {{who.left_point}}</label>  -->
    <el-button class="btn" slot="reference" type="primary" icon="el-icon-receiving" round @click="changeRounter('rewardsHistory')">ประวัติการแลกรางวัล</el-button>
    </div>

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
            if (this.rewards[index].reward_remain!==0 && this.rewards[index].reward_point <= this.who.left_point) {
              console.log("find");
              console.log(this.rewards[index]);

              await RewardStore.dispatch("find",this.rewards[index].id)
              let keep = RewardStore.getters.rewards
              console.log("keep");
              console.log(keep);
              arr.push(keep)
            }
            
          }
          // for (const re in this.rewards) {
          //   console.log(re);
          //   if (re.reward_remain!==0) {
          //     console.log("find");
          //     console.log(re);

          //     await RewardStore.dispatch("find",re.id)
          //     let keep = RewardStore.getters.rewards
          //     console.log("keep");
          //     console.log(keep);
          //     this.arr.push(keep)
          //   }
          // }
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
.btn{
  /* float: right; */


}

.point{
  font-size: 2.2em;
}

</style>
=======
  <div class="">
    <admin-reward-table></admin-reward-table>
    <reward-edit></reward-edit>
    <el-button type="primary" icon="el-icon-plus" circle @click="changeRounter('rewards/create')" ></el-button>
  </div>
</template>

<script>
import adminRewardTable from "@/components/board/adminRewardTable.vue";
import RewardEdit from "../components/board/rewardEdit.vue";
export default {
  components: { adminRewardTable, RewardEdit },
  methods: {
    changeRounter(route) {
      this.$router.push(`/${route}`);
    },
  },
};
</script>

<style></style>
>>>>>>> origin/Jerry
