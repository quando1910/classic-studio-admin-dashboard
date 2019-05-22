<template>
  <div class="animated fadeIn" v-if="contract">
    <b-row>
      <b-col sm="6">
        <b-card>
          <div slot="header">
            <strong>Thông tin hợp đồng</strong>
            <router-link
              :to="`/contracts/${$route.params.id}/payment`"
            >
              <el-button
                v-if="id"
                class="to-the-right"
                style="margin-right: 20px"
                type="success"
                icon="el-icon-document"
              ></el-button>
            </router-link>
            <router-link :to="`/contracts/${$route.params.id}`">
              <el-button
                v-if="id"
                class="to-the-right"
                style="margin-right: 20px"
                type="primary"
                icon="el-icon-edit"
              ></el-button>
            </router-link>
            <router-link
              target="_blank"
              :to="`/public/contracts/${$route.params.id}?code=${contract.secret_key}`"
            >
              <el-button
                v-if="id"
                class="to-the-right"
                style="margin-right: 20px"
                type="warning"
                icon="el-icon-share"
              ></el-button>
            </router-link>
          </div>
          <div v-if="contract.member">
            <b-row>
              <b-col sm="12">
                <b-form-group>
                  <label>Tên đại diện:</label>
                  <b>
                    <span type="text">{{contract.member.name}}</span>
                  </b>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group>
                  <label for="ccnumber">Số điện thoại</label>
                  <b>
                    <span type="text"><c-phone :phone="contract.member.phone_number"/></span>
                  </b>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group>
                  <label for="ccnumber">Link facebook</label>
                  <b>
                    <span type="text">{{contract.member.link_facebook}}</span>
                  </b>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group>
                  <label for="ccnumber">Giới tính</label>
                  <b>
                    <span type="text">{{contract.member.gender? 'Nữ': 'Nam'}}</span>
                  </b>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label for="ccnumber">Trường</label>
                <b>
                  <span type="text">{{contract.school.name}}</span>
                </b>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group>
                <label for="ccnumber">Nhóm/ Lớp</label>
                <b>
                  <span type="text">{{contract.group}}</span>
                </b>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group>
                <label for="ccnumber">Năm học</label>
                <b>
                  <span type="text">{{contract.label}}</span>
                </b>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="4">
              <b-form-group>
                <label for="ccnumber">Sĩ số lớp</label>
                <b>
                  <span type="text">{{contract.total_member}}</span>
                </b>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label for="ccnumber">Tổng nam</label>
                <b>
                  <span type="text">{{contract.male_number}}</span>
                </b>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label for="ccnumber">Tổng nữ</label>
                <b>
                  <span type="text">{{contract.female_number}}</span>
                </b>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
        <b-card>
          <div slot="header">
            <strong>Gói chụp - quay</strong>
            <small>Form</small>
          </div>
          <el-row v-if="budgets">
            <el-col :xs="24" :span="24">
              <h5 class="price-contract">Các gói dịch vụ đã chọn</h5>
              <el-table :data="budgets.filter(x => x.type == 0)" style="width: 100%">
                <el-table-column label="Tên cụ thể" width="150">
                  <template slot-scope="scope">
                    <p>{{scope.row.name}}</p>
                  </template>
                </el-table-column>
                <el-table-column label="Cách tính tiền">
                  <template slot-scope="scope">
                    <p>{{statusCalc[scope.row.type]}}</p>
                  </template>
                </el-table-column>
                <el-table-column label="Số lượng">
                  <template slot-scope="scope">
                    <p>{{scope.row.quantity}}</p>
                  </template>
                </el-table-column>
                <el-table-column label="Giá">
                  <template slot-scope="scope">
                    <p>{{scope.row.price}}</p>
                  </template>
                </el-table-column>
                <el-table-column label="Giá">
                  <template slot-scope="scope">
                    <p>{{scope.row.quantity * scope.row.price | dateMoney}}</p>
                  </template>
                </el-table-column>
              </el-table>
              <h5 class="price-contract">Các nội dung phát sinh</h5>
              <el-table :data="budgets.filter(x => x.type == 1)" style="width: 100%">
                <el-table-column label="Tên cụ thể" width="150">
                  <template slot-scope="scope">
                    <p>{{scope.row.name}}</p>
                  </template>
                </el-table-column>
                <el-table-column label="Cách tính tiền">
                  <template>
                    <p>Theo số lượng thuê</p>
                  </template>
                </el-table-column>
                <el-table-column label="Số lượng">
                  <template slot-scope="scope">
                    <p>{{scope.row.quantity}}</p>
                  </template>
                </el-table-column>
                <el-table-column label="Giá">
                  <template slot-scope="scope">
                    <p>{{scope.row.price}}</p>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row><br>
          <h3>Thanh toán dự kiến</h3>
          <b-row>
            <b-col sm="4">
              <b-form-group disabled="true">
                <label>Thành tiền dự kiến</label>
                <span>{{calcTotal() | dateMoney}}</span>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label>Đặt cọc</label><br>
                <b>
                  <span type="text">{{contract.deposit | dateMoney}}</span>
                </b>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label>Số dư còn lại</label>
                <b>
                  <span type="text">{{(total - contract.deposit) | dateMoney}}</span>
                </b>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Lịch trình</strong>
          </div>
          <h3 class="center-head">Lịch trình</h3>
          <el-col :xs="24" :span="24">
            <div v-if="contract.date_takens && contract.date_takens.length > 0">
              <div v-for="date in contract.date_takens" :key="`a-${date.id}`">
                <c-timeline :datePlan="date" :canDelete="false"/>
              </div>
            </div>
          </el-col>
        </b-card>
        <b-card>
          <div slot="header">
            <strong>Ghi chú</strong>
          </div>
          <b>
            <span type="text">{{contract.note}}</span>
          </b>
        </b-card>
        <b-card>
          <div class="photographer-container photo-back" id="contract">
            <div class="container photo-meta">
              <h3 class="title">Thợ chụp / quay</h3>
              <div class="photographer-list" v-if="photographers">
                <div
                  class="detail-container"
                  v-for="(photo, index) of photographers"
                  :key="`b-${index}`"
                >
                  <el-row style="padding-bottom: 10px">
                    <el-col :span="2">
                      <div class="avatar">
                        <img
                          src="https://m.media-amazon.com/images/M/MV5BMjM2OTkyNTY3N15BMl5BanBnXkFtZTgwNzgzNDc2NjE@._V1_CR132,0,761,428_AL_UY268_CR82,0,477,268_AL_.jpg"
                          class="img-avatar"
                          alt
                        >
                      </div>
                    </el-col>
                    <el-col :span="10">
                      <b>{{photo.user.name}}</b>
                      <br>
                      <span>{{photo.photographer_role}}</span>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="no-photo" v-if="photographers.length == 0">
                <p>Chưa rõ thợ chụp</p>
              </div>
            </div>
          </div>
        </b-card>
        <b-card>
          <div slot="header">
            <strong>Phí phát sinh</strong>
          </div>
          <el-table :data="items" style="width: 100%">
            <el-table-column prop="name" label="Tên sản phẩm" width="150"></el-table-column>
            <el-table-column prop="price" label="Giá" width="120"></el-table-column>
            <el-table-column prop="quantity" label="Số lượng" width="120"></el-table-column>
            <el-table-column prop="content" label="Mô tả" width="150"></el-table-column>
            <el-table-column prop="total" label="Thành tiền" width="120">
              <template
                slot-scope="scope"
              >{{ parseInt(scope.row.price) * parseInt(scope.row.quantity) | dateMoney}}</template>
            </el-table-column>
          </el-table>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { APIService } from "../../service/apiService.js";
import { API_URL_DEV, END_POINT } from "../../service/apiRegister.js";
import { format } from 'date-fns'

const api = new APIService();

export default {
  data() {
    return {
      contract: null,
      formLabelWidth: "120px",
      statusCalc: ["Tính theo đầu người", "Tính theo gói"],
      plan: {
        id: null,
        plan_time: "08:00",
        content: null,
        places: null,
        costume: [],
        _destroy: 0
      },
      planDate: null,
      dialogFormVisible: false,
      id: null,
      priorities: [],
      loading: false,
      photographers: [],
      schools: [],
      packages: [],
      package_id: [],
      properties: [],
      propertyMore: [],
      addProperty: [],
      subProperty: [],
      dateProperty: [],
      budgets: [],
      genders: [
        {
          value: 0,
          label: "Nữ"
        },
        {
          value: 1,
          label: "Nam"
        }
      ],
      total: 0,
      selected: [], // Must be an array reference!
      show: true,
      value: "",
      value7: "",
      reverse: true,
      items: []
    };
  },
  created() {
    this.id = this.$route.params.id;
    api.get([END_POINT.contracts, this.id]).then(data => {
      this.deposit = data.contract.deposit;
      this.payment = data.contract.payment_status;
      this.contract = data.contract;
      console.log(data);
      this.items = data.contract.items;
      data.contract.budgets.forEach(x => {
        if (x.price) {
          let obj = {};
          obj.type = x.budgetable_type === "Package" ? 0 : 1;
          obj.name = x.budgetable.name;
          obj.quantity = x.quantity;
          obj.id = x.id;
          obj.price = x.price;
          obj.note = x.note;
          obj.total = obj.quantity * obj.price;
          this.budgets.push(obj);
        }
      });
      this.contract.date_takens.forEach(x => {
        let a = x.photographer_date_takens.map(y => ({
          ...y,
          date_taken: x.date_taken
        }));
        this.photographers = [...this.photographers, ...a];
        // x.plans.forEach(p => {
        //   p.plan_time = format(new Date(p.plan_time), "HH:mm");
        // });
      });
    });
  },
  methods: {
    calcTotal() {
      if (this.contract.budgets) {
        this.total = this.contract.budgets.reduce(
          (sum, curr) => sum + +curr.price * curr.quantity,
          0
        );
        return this.total;
      }
      return 0;
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
label {
  padding-right: 20px;
}
.img-avatar,
.avatar > img,
.img-circle {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
</style>
