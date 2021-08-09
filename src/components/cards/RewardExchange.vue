<template>
    <div>
        <el-card :body-style="{ padding: '0'}" style="margin: 15px" class="rcard"> 
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div style="padding: 14px;text-align:center">
              <label>{{reward.reward_name}}</label>
              <div class="bottom clearfix" v-if="check==1">
              <el-button type="primary" @click="checkPoint(reward)" round>{{reward.reward_point}} คะแนน</el-button>
              </div>
              <div class="confirm" v-else-if="check==0">
                <span><el-button type="success" round @click="exchange(reward)" >ยืนยัน</el-button>
                <el-button type="danger" round @click="changeCheck()" >ยกเลิก</el-button></span>
              </div>   
          </div>
        </el-card>
    </div>
</template>

<script>
import RewardStore from "../../store/RewardStore"
import UserStore from "../../store/UserStore"
export default {
  data(){
    return{
      check:1
    }
  },  
  props:{
    reward: null,
    who: []
  },
    methods:{
      async checkPoint(rerward){
        if (this.who.left_point >= rerward.reward_point) {
          this.changeCheck()
        } else if(rerward.reward_remain === 0){
          this.$message.error('ขออภัย ของรางวัลหมดแล้ว');
        }else if (this.who.left_point < rerward.reward_point) {
          // this.$message.error('คะแนนของคุณไม่เพียงพอ โปดเลือกใหม่อีกคร้ง');
          this.$message.error('คุณมีคะแนนเพียง '+ this.who.left_point +' คะแนน กรุณาเลือกใหม่อีกครั้ง');
        }
      },
        changeCheck(){
          if(this.check==1){
            this.check = 0
          }
          else if(this.check==0){
            this.check = 1
          }

        },
        async exchange(r){
          await this.$message({
            message: 'แลกของรางวัลสำเร็จ ตอนนี้คุณเหลือ'+this.who.left_point+' คะแนน ',
            type: 'success'
          });
          r.reward_remain--
          console.log("remain : "+r.reward_remain);
          let payload = r
          this.who.left_point -= r.reward_point
          this.who.used_point += r.reward_point

          UserStore.dispatch("edit",this.who)
          payload.users.push(this.who)

          // if (payload.reward_remain==0) {
          //   RewardStore.dispatch("delete",payload)
          // } else {
          //   RewardStore.dispatch("edit",payload)
          // }
          RewardStore.dispatch("edit", payload)
          RewardStore.dispatch("addRecord", { userPayload: this.who, rewardPayload: payload })

          this.changeCheck()

          // console.log("Student :");
          // console.log(this.who);
        },
    }

}
</script>


<style>

  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;

  }

  .image {
    width: 100%;
    display: block;
  }

  .rcard{
    width: 250px;
  }

  .confirm{
    padding-top: 10px;
  }
  
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

</style>