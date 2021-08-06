<template>
    <div class="bar">
        <el-menu default-active="2" class="el-menu-vertical-demo" :popper-append-to-body="false">
            <el-submenu index="1" v-if="userRole == 'Student'" style="top: 60px">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">นักเรียน</span>
                </template>
                <el-menu-item index="1" @click="changeRounter('homeworks')">การบ้าน</el-menu-item>
                <el-menu-item index="1" @click="changeRounter('reward')">คะแนน - ประวัติการแลกรางวัล</el-menu-item>
            </el-submenu>

            
            <el-menu-item index="1" @click="changeRounter('homeworks')" v-if="userRole == 'Student'" :disabled="isDisabled">
                <i class="el-icon-document"></i>
                <span slot="title">การบ้าน</span>
            </el-menu-item>
            <el-menu-item index="2" @click="changeRounter('reward')" v-if="userRole == 'Student'" :disabled="isDisabled">
                <i class="el-icon-setting"></i>
                <span slot="title">คะแนน - ประวัติการแลกรางวัล</span>
            </el-menu-item>

            <el-menu-item index="1" @click="changeRounter('homeworks')" v-if="userRole == 'Teacher'" :disabled="isDisabled">
                <i class="el-icon-document-copy"></i>
                <span slot="title">ตรวจการบ้าน</span>
            </el-menu-item>
            <el-menu-item index="2" @click="changeRounter('homework/create')" v-if="userRole == 'Teacher'" :disabled="isDisabled">
                <i class="el-icon-document-add"></i>
                <span slot="title">สั่งการบ้าน</span>
            </el-menu-item>


            <el-menu-item index="1" :disabled="isDisabled" @click="changeRounter('leaderboard')">
                <i class="el-icon-medal-1"></i>
                <span slot="title">กระดานคะแนน</span>
            </el-menu-item>
            <el-menu-item index="2" @click="changeRounter('rewards/manage')" v-if="userRole == 'Admin'" :disabled="isDisabled">
                <i class="el-icon-setting"></i>
                <span slot="title">จัดการรางวัล</span>
            </el-menu-item>
            <el-menu-item index="3" @click="changeRounter('users/manage')" v-if="userRole == 'Admin'" :disabled="isDisabled">
                <i class="el-icon-setting"></i>
                <span slot="title">จัดการผู้ใช้งาน</span>
            </el-menu-item>
            <el-menu-item index="4" @click="changeRounter('users/create')" v-if="userRole == 'Admin'" :disabled="isDisabled">
                <i class="el-icon-setting"></i>
                <span slot="title">เพิ่มผู้ใช้งาน</span>
            </el-menu-item>
            
            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-user"></i>
                    <span slot="title">บัญชี</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="5-1" @click="changeRounter('info')">
                        <i class="el-icon-document-copy"></i>
                        <span slot="title">ข้อมูล</span>
                    </el-menu-item>
                    <el-menu-item index="5-2" @click="logout">
                        <i class="el-icon-switch-button"></i>
                        <span slot="title">ออกจากระบบ</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import AuthUser from '@/store/AuthUser'
export default {
  data() {
    return {
        isDisabled: false,
        userRole: JSON.parse(localStorage.getItem('auth_key')).user.role.name,
    }
  },
  methods: {
    async logout() {
        await AuthUser.dispatch("logout", )
        this.$confirm('ออกจากระบบ', '', {
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'ออกจากระบบสำเร็จ'
          });
          this.$router.push("/")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'ยกเลิกการออกจากระบบ'
          });          
        });
    },
    changeRounter(route) {
        this.$router.push(`/${route}`)
    }
  }  
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    margin-top: 0px;
}

.icon {
    margin-left: 25px;
    margin-top: 30px;
    width: 50px;
}

.el-menu-item {
    display: block;
}

.bar {
    display: inline-block;
    z-index: 1;
    position: fixed;
    bottom: 0;
    top: 60px;
    left: 0;
    background: white;
    width: 275px;
    height: 100%;
}
</style>