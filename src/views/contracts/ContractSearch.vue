<template>
  <div>
    <div class="title-button m-b-10">
      <el-row class="w-100">
        <el-col :span="6">
          <h3>Tìm kiếm hợp đồng</h3>
        </el-col>
        <el-col :span="4">
          <el-checkbox v-model="paid">Chưa trả tiền</el-checkbox>
        </el-col>
        <el-col :span="4">
          <el-checkbox v-model="returnClothes">Chưa trả trang phục</el-checkbox>
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
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="member.name" label="Người đại diện" width="200">
      </el-table-column>
      <el-table-column label="SĐT" width="200">
        <template slot-scope="scope">
          <c-phone :phone="scope.row.member.phone_number"/>
        </template>
      </el-table-column>
      <el-table-column label="Hợp đồng">
        <template slot-scope="scope">
          <p>{{scope.row.group}} - {{scope.row.school.name}}</p>
        </template>
      </el-table-column>
      <el-table-column label="Ngày chụp" width="100">
        <template slot-scope="scope">
          <div v-for="(date,index) of scope.row.date_takens" :key="index">
            <span>{{date.date_taken | dateFormat}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="Mã hợp đồng" width="180"></el-table-column>
      <el-table-column
        align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleDetail(scope.row)">Sửa</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handlePayment(scope.row)">Thanh toán</el-button>
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
      paid: null,
      returnClothes: null,
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
  watch: {
    code: function(value) {
      if(value && value != '') {
        this.tableData = this.contracts.filter(x => x.code.toLowerCase().indexOf(this.code.toLowerCase()) >=0);
      } else {
        this.tableData = this.contracts;
      }
    },
    paid: function(value) {
      if(value) {
        this.tableData = this.tableData.filter(x => !x.paid_at);
      } else {
        this.tableData = [...this.tableData, ...this.contracts.filter(x => x.paid_at)];
      }
    },
    returnClothes: function(value) {
      if(value) {
        this.tableData = this.tableData.filter(x => x.clothes_status !== 1);
      } else {
        this.tableData = [...this.tableData, ...this.contracts.filter(x => x.clothes_status == 1)];
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
