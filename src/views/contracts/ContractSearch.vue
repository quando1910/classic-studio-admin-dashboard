<template>
  <div>
    <div class="title-button m-b-10">
      <el-row class="w-100">
        <el-col :span="16">
          <h3>Tìm kiếm hợp đồng</h3>
        </el-col>
        <el-col :span="8">
          <el-input
            placeholder="Nhập code hợp đồng"
            prefix-icon="el-icon-search"
            v-model="code">
          </el-input>
        </el-col>
      </el-row>
    </div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%" @row-click="handleDetail">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="name" label="Hợp đồng" width></el-table-column>
      <el-table-column prop="group" label="Nhóm/Lớp" width="180"></el-table-column>
      <el-table-column prop="code" label="Mã hợp đồng" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { APIService } from "../../service/apiService.js";
import { API_URL_DEV, END_POINT } from "../../service/apiRegister.js";
import { format, isSameDay } from "date-fns";
const api = new APIService();

export default {
  data() {
    return {
      search: "",
      tableData: [],
      loading: true,
      contracts: [],
      dateContracts: [],
      code: null
    };
  },
  mounted() {
    api.get([END_POINT.contracts]).then(
      data => {
        this.contracts = data.contracts;
        this.tableData = this.contracts;
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    )
  },
  filters: {
    dateFormat: function(value) {
      if (!value) return "";
      return format(new Date(value), "DD/MM");
    },
  },
  watch: {
    code: function(value) {
      if(value && value != '') {
        this.tableData = this.contracts.filter(x => x.code.toLowerCase().indexOf(this.code.toLowerCase()) >=0);
      } else {
        this.tableData = this.contracts;
      }
    }
  },
  methods: {
    handleDetail(row) {
      this.$router.push(`/contracts/${row.id}`);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style>

</style>
