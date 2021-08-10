<template>
  <div>
    <header class="top-head" style="text-align:center">
      <br>
      <div class="cover-top"></div>
      <div>
        <label class="headerName">เพิ่มผู้ใช้งาน</label>
      </div>
      <br>
      </header>
    <create-user-form></create-user-form>
  </div>
</template>

<script>
import CreateUserForm from "../components/forms/CreateUserForm.vue";
export default {
  components: { CreateUserForm },
};
</script>

<style></style>
