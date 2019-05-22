<template>
  <div>
    <div class="title-button m-b-10">
      <el-row class="w-100">
        <el-col :span="16">
          <h3>Danh sách & Tìm kiếm Đồ đạc</h3>
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
    <el-table
      v-loading="loading" 
      :data="costumes.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="name" label="Tên trang phục" width></el-table-column>
      <el-table-column prop="total" label="Tổng số lượng" width="180"></el-table-column>
      <el-table-column label="Giá thuê" width="180">
        <template slot-scope="scope">
          {{scope.row.price | dateMoney}}
        </template>
      </el-table-column>
      <el-table-column label="Giá mất" width="180">
        <template slot-scope="scope">
          {{scope.row.price_lost | dateMoney}}
        </template>
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="Type to search"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handlePayment(scope.row)">Sửa</el-button>
        </template>
      </el-table-column>
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
      costumes: [],
      code: null
    };
  },
  mounted() {
    api.get([END_POINT.properties], {property_type: 1}).then(
      data => {
        this.costumes = data.properties;
        console.log(this.costumes);
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    )
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
    handlePayment(row) {
      this.$router.push(`/contracts/${row.id}/payment`);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style>

</style>
