<template>
  <div id="app">
    <div id="main-app" >
      <Topbar v-if='this.$route.path != "/"'/>
      <Sidebar v-if='this.$route.path != "/"'/>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "./components/Sidebar.vue";
import Topbar from "./components/Topbar.vue";
import Login from "./views/Login.vue"
import AuthUser from "./store/AuthUser"

export default {
  components: { Sidebar, Login, Topbar },
  data() {
    return {
      isAuthen: AuthUser.getters.user,
    }
  },
  methods: {
    
  },
};
</script>

<style>
html {
  background: #daf0ff;
}
.content {
  position: absolute;
  top: 80px;
  left: 290px;
  width: 1215px;
  min-height: 735px;
}
</style>
