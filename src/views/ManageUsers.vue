<template>
  <div>
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
