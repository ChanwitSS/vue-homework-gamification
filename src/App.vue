<template>
  <div id="app">
    <Sidebar/>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'

export default {
  components: { Sidebar }
}
</script>

<style lang="scss">
html {
  background: #daf0ff
}

.top-bar {
  border-radius: 5px;
  height: 60px;
}
.content {
  position: absolute;
  left: 290px;
  width: 1215px;
  min-height: 735px;
}

</style>
