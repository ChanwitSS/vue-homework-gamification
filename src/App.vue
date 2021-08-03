<template>
  <div id="app">
    <!-- <Login v-if="!isAuthen"/> -->
    <div id="main-app" >
      <Sidebar v-if='this.$route.path != "/"'/>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "./components/Sidebar.vue";
import Login from "./views/Login.vue"
import AuthUser from "./store/AuthUser"

export default {
  components: { Sidebar, Login },
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
  left: 290px;
  width: 1215px;
  min-height: 735px;
}
</style>
