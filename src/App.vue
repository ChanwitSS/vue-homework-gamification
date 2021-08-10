<template>
  <div id="app">
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
  components: { Sidebar, Login},
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
  position: fixed;
  left: 275px;
  top: -1px;
  width: 1475px;
  min-height: 735px;
}

@font-face {
  font-family: "TAGonNon";
  src: local("TAGonNon"),
   url(UturnaRoundDEMO-Thin.ttf);
}
</style>