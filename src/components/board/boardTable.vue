<template>
  <div>
    <el-radio-group v-model="radio">
      <el-radio-button label="receive">คะแนนที่ได้รับ</el-radio-button>
      <el-radio-button label="used">คะแนนที่ใช้</el-radio-button>
    </el-radio-group>

    <el-popover placement="right" width="400" trigger="click" style="position: fixed; right: 5%">
      <div align='center'>
        <v-date-picker v-model="range" isRange style="margin-top: 20px" align="cneter"/>
        <br>
        <el-button style="margin-top: 20px" @click="dateFilter">เลือก</el-button>
      </div>
      <el-button slot="reference">เลือกช่วงเวลา</el-button>
    </el-popover>
    <el-table
      class="center"
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.first_name.toLowerCase().includes(search.toLowerCase()) ||
            data.last_name.toLowerCase().includes(search.toLowerCase()) ||
            data.id === parseInt(search) || data.total_point === parseInt(search)
        )
      "
      :default-sort="{ prop: 'total_point', order: 'descending' }"
      v-if="radio == 'receive'"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>User ID: {{ props.row.user_ID }}</p>
          <p>Email: {{ props.row.email }}</p>
        </template>
      </el-table-column>
      <el-table-column type="index"> </el-table-column>
      <el-table-column label="ชื่อ" sortable prop="first_name">
      </el-table-column>
      <el-table-column label="นามสกุล" sortable prop="last_name">
        </el-table-column>
      <el-table-column label="คะแนนที่ได้รับ" sortable prop="total_point">
      </el-table-column>
      <el-table-column label="ID" sortable prop="id"></el-table-column>
    </el-table>

    <el-table
      class="center"
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.first_name.toLowerCase().includes(search.toLowerCase()) ||
            data.last_name.toLowerCase().includes(search.toLowerCase()) ||
            data.id === parseInt(search) || data.total_point === parseInt(search)
        )
      "
      :default-sort="{ prop: 'total_point', order: 'descending' }"
      v-if="radio == 'used'"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>User ID: {{ props.row.user_ID }}</p>
          <p>Email: {{ props.row.email }}</p>
        </template>
      </el-table-column>
      <el-table-column type="index"> </el-table-column>
      <el-table-column label="ชื่อ" sortable prop="first_name">
      </el-table-column>
      <el-table-column label="นามสกุล" sortable prop="last_name">
      </el-table-column>
      <el-table-column label="คะแนนที่ใช้" sortable prop="used_point">
      </el-table-column>
      <el-table-column label="ID" sortable prop="id"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import UserStore from "@/store/UserStore";
import moment from 'moment'
export default {
  data() {
    return {
      search: "",
      tableData: [],
      range: null,
      dialogFormVisible: false,
      radio: 'receive',
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      await UserStore.dispatch("fetch");
      UserStore.getters.users.map((item, index) => {if (item.role.name == "Student") { this.tableData.push(item)}});
    },
    /*dateFilter() {
      let start = moment(this.range.start)
      let end = moment(this.range.end)
      if (this.radio == 'receive') {
        for (let i=0; i<this.tableData.length; i++) {
          if ( )
        }
      } else {
        for (let i=0; i<this.tableData.length; i++) {
          if (tableData[i].rewards)
        }        
      }
    }*/
  },
};
</script>
<style>
.center {
  position: fixed; /* or absolute */
  top: 50%;
  left: 10px;
}
</style>
