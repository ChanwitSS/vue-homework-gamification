<template>
  <div>
    <header class="top-head" style="text-align:center">
        <br>
        <div class="cover-top"></div>
        <div>
            <label class="headerName">กระดานคะแนน</label>
        </div>
        <br>
    </header>
    <BoardTable/>
  </div>
</template>

<script>
import BoardTable from "@/components/board/BoardTable.vue";
export default {
  components: { BoardTable, },
  data() {
    return {
    }
  },
  methods: {
  }
};
</script>

<style>
</style>
