<template>
    <div class="bar">
        <el-menu default-active="2" class="el-menu-vertical-demo" :popper-append-to-body="false">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">นักเรียน</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1" @click="changeRounter('homework')">การบ้าน</el-menu-item>
                    <el-menu-item index="1-2" @click="changeRounter('reward')">คะแนน - ประวัติการแลกรางวัล</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2" :disabled="isDisabled">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">อาจารย์</span>
                </template>
                <el-menu-item-group >
                    <el-menu-item index="2-1">
                        <router-link to="/homework">สั่งการบ้าน</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-2">
                        <router-link to="/reward">ตรวจการบ้าน</router-link>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3" :disabled="isDisabled">
                <i class="el-icon-document"></i>
                <span slot="title">กระดานคะแนน</span>
            </el-menu-item>
            <el-menu-item index="4" :disabled="isDisabled">
                <i class="el-icon-setting"></i>
                <span slot="title">ตั้งค่า</span>
            </el-menu-item>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-user"></i>
                    <span slot="title">บัญชี</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="4-1">
                        <router-link to="/info">ข้อมูล</router-link>
                    </el-menu-item>
                    <el-menu-item index="4-2" @click="logout">ออกจากระบบ</el-menu-item>
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
        isDisabled: false
    }
  },
  methods: {
    async logout() {
        await AuthUser.dispatch("logout", )
        this.$confirm('Logout', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Logout completed'
          });
          this.$router.push("/")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Logout canceled'
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
    width: 275px;
    min-height: 750px;
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
    top: 0;
    left: 0;
}
</style>