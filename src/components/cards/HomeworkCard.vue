<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>Subject: {{ homework.subjects[0].subject_name }}</span>
      <el-popover placement="right" width="400" trigger="click">
        <Form> </Form>
        <el-button
          style="float: right; padding: 3px 0"
          slot="reference"
          type="text"
          >ส่งงาน</el-button
        >
      </el-popover>
    </div>
    <div class="text item">
      <p>Name: {{ homework.homework_name }}</p>
      <p>Description: {{ homework.description }}</p>
      <p>Due Date: {{ homework.due_date }}</p>
    </div>
  </el-card>
</template>

<script>
import Form from "../forms/HomeworkSentForm.vue";
export default {
  components: { Form },
  data() {
    return {
      homework_name: null,
    };
  },
  props: {
    homework: null,
  },
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 380px;
  display: inline-block;
  margin: 10px;
}
</style>
