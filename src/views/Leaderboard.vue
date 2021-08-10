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
    <boardTable></boardTable>
  </div>
</template>

<script>
import boardTable from "@/components/board/boardTable.vue";
export default {
  components: { boardTable, },
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
