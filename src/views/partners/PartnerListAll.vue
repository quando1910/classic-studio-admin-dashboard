<template>
  <section id="contract" class="show-out">
    <el-table v-loading="loading" :data="partners" style="width: 100%" @row-click="handleDetail">
      <el-table-column prop="id" label="ID" width="40"></el-table-column>
      <el-table-column prop="name" label="Tên" width="140"></el-table-column>
      <el-table-column prop="agency" label="Đơn vị" width="130"></el-table-column>
      <el-table-column label="Tình trạng" width="130">
        <template slot-scope="scope">
          Chưa trả xong
        </template>
      </el-table-column>
      <el-table-column label="SDT" width="110">
        <template slot-scope="scope">
          <c-phone :phone="scope.row.phone_number"/>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="Địa chỉ"></el-table-column>
      <el-table-column prop="link_facebook" label="Liên hệ facebook"></el-table-column>
    </el-table>
    <el-dialog :title="`Tạo đối tác mới`" :visible.sync="dialogFormVisible">
      <el-form :model="formAddPartner">
        <el-form-item label="Tên">
          <el-input v-model="formAddPartner.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Số điện thoại">
          <el-input v-model="formAddPartner.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Tên đơn vị">
          <el-input v-model="formAddPartner.agency" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Link Facebook">
          <el-input v-model="formAddPartner.link_facebook" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Thoát</el-button>
        <el-button type="primary" @click="handelCreate">Tạo đối tác</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { APIService } from "../../service/apiService.js";
import { API_URL_DEV, END_POINT } from "../../service/apiRegister.js";

const api = new APIService();

export default {
  name: 'PartnerAll',
  data() {
    return {
      loading: true,
      partners: [],
      formAddPartner: {
        name: null,
        phone_number: null,
        agency: null,
        link_facebook: null
      },
      dialogFormVisible: false
    }
  },
  mounted() {
    api.get([END_POINT.allPartners]).then(
      data => {
        this.partners = data.partners;
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  },
  methods: {
    handleDetail(value) {
      this.$router.push(`/partners/${value.id}`);
    },
    handlePayment(value) {

    },
    handelCreate() {
      api.post([END_POINT.partners], this.formAddPartner).then(
        data => {
          this.partners.push(data.partner);
          this.loading = false;
          this.formAddPartner = {
            name: null,
            phone: null,
            agency: null,
            link_facebook: null
          }
        },
        err => {
          this.loading = false;
        }
      );
      this.dialogFormVisible = false;
    }
  }
}
</script>

<style>

</style>
