<template>
  <div v-if="partners.length > 0">
    <b-row>
      <b-col sm="4" xs="12">
        <b-card>
          <div slot="header">
            <strong>Tạo đơn thuê cho đối tác</strong>
          </div>
          <div>
            <b-row>
              <b-col sm="12">
                <b-form-group>
                  <label for="name"><b>Tìm đối tác</b></label>
                  <el-select class="full-width" v-model="partner_id" placeholder="Select">
                    <el-option
                      v-for="(item, index) in partners"
                      :key="`a-${index}`"
                      :label="`${item.name} - ${item.agency}`"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </b-form-group><hr>
                <b-form-group>
                  <label for="name"><b>Chọn ngày thuê đồ</b></label>
                  <el-date-picker
                    class="input-contract input-contract--time"
                    v-model="dateHire"
                    type="date"
                    placeholder="Pick a day"
                  ></el-date-picker>
                </b-form-group><hr>
                <b-form-group>
                  <label for="name"><b>Ghi chú</b></label>
                  <el-input v-model="invoice.note"></el-input>
                </b-form-group><hr>
                <b-form-group>
                  <label for="name">Chọn đồ thuê theo concept</label>
                  <el-select multiple class="full-width" @change="setPackagePropety" v-model="pickPackges" placeholder="Concept">
                    <el-option
                      v-for="(item, index) in packages"
                      :key="`b-${index}`"
                      :label="`${item.name}`"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </b-form-group>
                <b-form-group>
                  <label for="name">Chọn đồ thuê lẻ</label>
                  <el-select multiple class="full-width" @change="setPropety" v-model="pickProperties" placeholder="Trang phục lẻ">
                    <el-option
                      v-for="(item, index) in properties"
                      :key="`c-${index}`"
                      :label="`${item.name}`"
                      :disabled="partner_history_properties_attributes.map(x => x.id).includes(item.id)"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </b-form-group>
                <b-form-group>
                  <label for="name">Những đồ đã chọn</label><br>
                  <el-tag
                    type="success"
                    v-for="(sp,index1) in partner_history_properties_attributes"
                    :key="`d-${index1}`"
                  >{{sp.name}}</el-tag>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
        </b-card>
      </b-col>
      <b-col sm="8" xs="12">
        <b-card>
          <div slot="header">
            <strong>Chi tiết trang phục</strong>
          </div>
          <el-table
            row-key="id"
            :data="partner_history_properties_attributes"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="Nội dung"
              width="180">
            </el-table-column>
            <el-table-column
              prop="quantity"
              label="Số lượng">
              <template slot-scope="scope">
                <el-input v-model="scope.row.quantity"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="price"
              label="Đơn giá">
            </el-table-column>
            <el-table-column
              prop="total"
              label="Thành tiền">
              <template slot-scope="scope">
                <p>{{scope.row.price * scope.row.quantity | dateMoney}}</p>
              </template>
            </el-table-column>
          </el-table><br>
          <b-row>
            <b-col sm="4">
              <b-form-group>
                <label for="name">Tổng thành tiền:</label><br>
                <b>{{ partner_history_properties_attributes.reduce((sum, y) => sum + +y.price * y.quantity, 0) | dateMoney}}</b>
              </b-form-group>
            </b-col>
            <b-col sm="4">
               <b-form-group>
                <label for="name">Đặt cọc</label>
                <el-input placeholder="Số tiền đặt cọc" v-model="deposit"></el-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label for="name">Số tiền còn lại:</label><br>
                <b>{{ partner_history_properties_attributes.reduce((sum, y) => sum + +y.price * y.quantity, 0)  - deposit | dateMoney}}</b>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
        <el-button
          class="full-width"
          type="success"
          @click="createHireOffer"
          plain>
          Tạo đơn thuê
        </el-button>
      </b-col>
    </b-row>
  </div>
</template>
  
<script>
import { APIService } from "../../service/apiService.js";
import { API_URL_DEV, END_POINT } from "../../service/apiRegister.js";

const api = new APIService();

export default {
  data() {
    return {
      loading: true,
      partners: [],
      packages: [],
      dateHire: null,
      deposit: 0,
      properties: [],
      partner_history_properties_attributes: [],
      invoice: {
        title: null,
        description: null,
        note: null,
        return_status: 0,
        payment_status: 0,
        partner_history_properties_attributes: [],
        partner_payments_attributes: []
      },
      pickPackges: [],
      pickPackgesOld: [],
      pickProperties: [],
      pickPropertiesOld: [],
      partner_id: null,
      formHire: {
        partner_id: null,
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
    api
      .multipeGets([
        END_POINT.allPartners,
        END_POINT.packages,
        END_POINT.properties
      ])
      .then(data => {
        this.partners = data[0].partners;
        this.packages = data[1].packages.filter(x => x.kind_package == 4);
        this.properties = data[2].properties;
      });
  },
  methods: {
    createHireOffer() {
      this.invoice.partner_history_properties_attributes = this.partner_history_properties_attributes.map( x => ({
        id: null,
        property_id: x.id,
        status: 0,
        amount: x.quantity,
        history_date: new Date(this.dateHire),
        note: '',
        _destroy: 0
      }));
      api.post([END_POINT.partners, this.partner_id, END_POINT.invoices], this.invoice).then(
        data => {
          this.$notify({
            title: 'Success',
            message: 'Tạo đơn thành công',
            type: 'success'
          });
        },
        err => {
          this.$notify({
            title: 'Warning',
            message: 'Không thể tạo',
            type: 'warning'
          });
        }
      );
    },
    setPackagePropety(e) {
      let addQuantity = {quantity: 1};
      if (this.pickPackgesOld.length === 0) {
        let obj = this.packages.filter(x => e.includes(x.id)).map(x => x.properties);
        obj.forEach(y => {
          y = y.map(x => ({...x, ...addQuantity}) )
          this.partner_history_properties_attributes = [...this.partner_history_properties_attributes, ...y];
        });
      } else {
        let item = {};
        if (this.pickPackgesOld.length < e.length) {
          item = e.filter(x => !this.pickPackgesOld.includes(x))[0];
          let obj = this.packages.filter(x => item === x.id).map(x => x.properties);
          obj.forEach(y => {
            y = y.map(x => ({...x, ...addQuantity}) )
            this.partner_history_properties_attributes = [...this.partner_history_properties_attributes, ...y];
          });
        } else {
          item = this.pickPackgesOld.filter(x => !e.includes(x))[0];
          let obj = this.packages.filter(x => item === x.id)[0].properties.map(x => x.id);
          this.partner_history_properties_attributes = this.partner_history_properties_attributes.filter(x => !obj.includes(x.id));
        }
      }
      this.pickPackgesOld = e;
    },
    setPropety(e) {
      let addQuantity = {quantity: 1};
      if (this.pickPropertiesOld.length === 0) {
        let obj = this.properties.filter(x => e.includes(x.id)).map(x => ({...x, ...addQuantity}) );
        this.partner_history_properties_attributes = [...this.partner_history_properties_attributes, ...obj];
      } else {
        let item = {};
        if (this.pickPropertiesOld.length < e.length) {
          item = e.filter(x => !this.pickPropertiesOld.includes(x))[0];
          let obj = this.properties.filter(x => item === x.id).map(x => ({...x, ...addQuantity}));
          this.partner_history_properties_attributes = [...this.partner_history_properties_attributes, ...obj];
        } else {
          item = this.pickPropertiesOld.filter(x => !e.includes(x))[0];
          let obj = this.properties.filter(x => item === x.id)[0];
          this.partner_history_properties_attributes = this.partner_history_properties_attributes.filter(x => obj.id != x.id);
        }
      }
      this.pickPropertiesOld = e;
    }
  }
}
</script>

<style>

</style>
