<template>
  <div
      <div class="cover-top"></div>
      <div>
      <label class="headerName">จัดการผู้ใช้งาน</label>
      </div>
      <br>
      </header>
    <user-table></user-table>
    <Form></Form>
  </div>
</template>

<script>
import UserTable from "../components/board/userTable.vue";
import Form from "../components/forms/EditUserForm.vue";
export default {
  components: { Form, UserTable },
};
</script>

<style></style>
