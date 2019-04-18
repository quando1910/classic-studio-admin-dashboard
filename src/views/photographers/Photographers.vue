<template>
  <section id="contract" class="show-out">
    <div class="title-button m-b-10">
      <el-row class="w-100">
        <el-col :span="21">
          <h3>Thợ chụp</h3>
        </el-col>
        <el-col :span="3">
          <el-button class="to-the-right" @click="dialogFormVisible= true" type="primary" plain>Tạo thợ chụp</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%" @row-click="handleDetail">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="name" label="Tên" width></el-table-column>
      <el-table-column prop="phone" label="Số điện thoại" width></el-table-column>
      <el-table-column prop="address" label="Địa chỉ" width="180"></el-table-column>
    </el-table>
    <el-dialog :title="`Thông tin thợ chụp`" :visible.sync="dialogFormVisible">
      <el-form :model="formAddPhotographer">
        <el-form-item label="Tên" :label-width="formLabelWidth">
          <el-input v-model="formAddPhotographer.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Số điện thoại" :label-width="formLabelWidth">
          <el-input v-model="formAddPhotographer.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Thoát</el-button>
        <el-button type="primary" @click="handelCreate">Tạo thợ ảnh</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { APIService } from "../../service/apiService.js";
import { API_URL_DEV, END_POINT } from "../../service/apiRegister.js";
const api = new APIService();

export default {
  data() {
    return {
      formLabelWidth: '120px',
      dialogFormVisible: false,
      search: "",
      tableData: [],
      loading: true,
      formAddPhotographer: {
        name: null,
        phone: null,
        avatar: null,
        date_join: null,
        role: null,
        description: null,
        address: null
      }
    };
  },
  mounted() {
    api.get([END_POINT.photographers]).then(
      data => {
        this.tableData = data.users;
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  },
  methods: {
    handelCreate() {
      api.post([END_POINT.photographers], this.formAddPhotographer).then(
        data => {
          this.loading = false;
          this.dialogFormVisible = false;
          this.formAddPhotographer = {
            name: null,
            phone: null,
            avatar: null,
            date_join: null,
            role: null,
            description: null,
            address: null
          }
        },
        err => {
          this.loading = false;
        }
      );
    },
    handleDetail(row) {
      this.dialogFormVisible = true;
      api.get([END_POINT.photographers, row.id]).then(
        data => {
          this.loading = false;
          this.formAddPhotographer = data;
        });
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
