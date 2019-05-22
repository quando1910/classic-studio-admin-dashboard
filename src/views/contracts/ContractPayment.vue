<template>
  <b-row>
    <b-col sm="12">
      <b-card>
        <div slot="header">
          <router-link :to="`/contracts/${$route.params.id}`">
            <el-button style="margin-right: 20px" type="primary" icon="el-icon-arrow-left"></el-button>
          </router-link>
          <strong> Thanh Toán hợp đồng </strong> <small @click="captureInvoice">chụp hóa đơn</small>
          <a :href="output" :download="`[Hóa đơn]${contract.group}-${contract.school.name}.jpg`" @click="captureInvoice">
            <el-button
              class="to-the-right"
              style="margin-right: 20px"
              :type="!output? 'warning' : 'success'"
              :icon="!output? 'el-icon-picture-outline' : 'el-icon-download'">
              {{!output? 'Xuất ảnh hóa đơn' : 'Tải xuống hóa đơn'}}
            </el-button>
          </a>
        </div>
      <div ref="printMe" class="container" v-if="contract && budgets.length > 0">
        <div class="pay-box">
          <div class="header__logo"><a href="/home"><img src="../../assets/img/logo-main-black.png" style="width: 150px;" alt=""/></a></div>
          <h3 class="pay-header"><b>{{contract.group}} - {{contract.school.name}}</b></h3>
        </div>
        <h5>Gói chụp</h5>
          <el-table
            row-key="id"
            :data="budgets.filter(x => x.type == 'Package')"
            style="width: 100%"
            :row-class-name="tableRowClassName">
          <el-table-column
            prop="content"
            label="Nội dung"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="Chú thích"
            width="180">
            <template slot-scope="scope">
              <p v-if="contract.paid_at">{{scope.row.note}}</p>
              <input v-else v-model="scope.row.note">
            </template>
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="Số lượng">
            <template slot-scope="scope">
              <p>{{scope.row.quantity}}</p>
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
        <h5>Gói concept</h5>
        <el-table
            row-key="id"
          :data="budgets.filter(x => x.type == 'Property')"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="content"
            label="Nội dung"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="Chú thích"
            width="180">
            <template slot-scope="scope">
              <p v-if="contract.paid_at">{{scope.row.note}}</p>
              <input v-else v-model="scope.row.note">
            </template>
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="Số lượng">
            <template slot-scope="scope">
              <p v-if="contract.paid_at">{{scope.row.quantity}}</p>
              <input v-else v-model="scope.row.quantity">
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
        <h5>Phát sinh</h5>
        <el-table
            row-key="id"
          :data="budgets.filter(x => x.type == 'Item')"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="content"
            label="Nội dung"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="Chú thích"
            width="180">
            <template slot-scope="scope">
              <p v-if="contract.paid_at">{{scope.row.note}}</p>
              <input v-else v-model="scope.row.note">
            </template>
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="Số lượng">
            <template slot-scope="scope">
              <p v-if="contract.paid_at">{{scope.row.quantity}}</p>
              <input v-else v-model="scope.row.quantity">
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
        <div class="pay-meta" v-if="contract && deposit && budgets.length > 0">
          <div class="grid-content label-contract">Tổng cộng: <b>{{ budgets.reduce((x,y) => (x + y.price * y.quantity), 0) | dateMoney}}</b></div>
          <div class="grid-content label-contract">Đặt cọc: <b>{{deposit | dateMoney}}</b></div>
          <div class="grid-content label-contract">Số tiền còn lại phải trả: <b>{{(budgets.reduce((x,y) => (x + y.price * y.quantity), 0) - deposit) | dateMoney}}</b></div>
          <el-tag type="success" v-if="payment == 2">Đã hoàn tất thanh toán</el-tag>
        </div>
        <el-row class="alige-center">
          <el-col :span="7">
            <el-button
            class="w-100"
            type="warning"
            @click="goBack"
            plain
          > Quay lại</el-button>
          </el-col>
          <el-col :span="1">
          </el-col>
          <el-col :span="16"   v-if="payment == 0">
            <el-button
              class="w-100"
              type="primary"
              @click="verifyContract"
              plain
            > Xác thực thông tin thanh toán
            </el-button>
          </el-col>
          <el-col :span="7"  v-if="payment == 1">
            <el-button
              v-if="payment == 1"
              class="w-100"
              type="primary"
              @click="lockContract"
              plain
              > 
              Khóa thanh toán
            </el-button>
          </el-col>
          <el-col :span="1" v-if="payment == 1">
          </el-col>
          <el-col :span="8"  v-if="payment == 1">
            <el-button
              @click="open7"  
              class="w-100"
              type="success"
              plain>
              Thanh toán hợp đồng
            </el-button>
          </el-col>
        </el-row>
      </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { APIService } from "../../service/apiService.js";
import { API_URL_DEV, END_POINT } from "../../service/apiRegister.js";
import { format } from "date-fns";

const api = new APIService()

export default {
  name: 'Payment',
  data() {
    return {
      budgets:  [],
      deposit: null,
      payment: null,
      contract: null,
      output: null
    }
  }, 
  created() {
    api.get([END_POINT.contracts, this.$route.params.id]).then(data => {
      this.deposit = data.contract.deposit;
      this.payment = data.contract.payment_status;
      this.contract = data.contract;
      data.contract.budgets.forEach(x => {
        if (x.budgetable.kind_package !== 4) {
          let obj = {};
          obj.content = x.budgetable.name;
          obj.type = x.budgetable_type;
          obj.quantity = x.quantity;
          obj.id = x.id;
          obj.price = x.price;
          obj.note = x.note;
          obj.total = obj.quantity * obj.price;
          this.budgets.push(obj);
        }
      })
    });
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      return 'success-row';
    },
    lockContract() {
      let payment = {};
      payment.payment_status = 0;
      api.put([END_POINT.contracts, this.$route.params.id], payment).then(
        data => {
          this.payment = 0;
          this.$message({
            message: 'Đã khóa thanh toán!',
            type: 'message'
          });
        },
        err => {
        }
      );
    },
    captureInvoice() {
      const el = this.$refs.printMe;
      const options = {
          type: 'dataURL'
      }
      this.$html2canvas(el, options).then((a) => {
        this.output = a;
      });
    },
    open7() {
      this.$confirm('Bạn có chắc muốn thanh toán hợp đồng này không?', 'Success', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'success',
        center: true
      }).then(() => {
        this.paymentContract();
      }).catch(() => {
      });
    },
    paymentContract() {
      let payment = {};
      payment.budgets_attributes = this.budgets;
      payment.paid_at = new Date();
      payment.payment_status = 3;
      api.put([END_POINT.contracts, this.$route.params.id], payment).then(
        data => {
          this.$message({
            message: 'Thanh toán hợp đồng thành công!',
            type: 'success'
          });
          this.$router.push(`/contracts/${this.$route.params.id}`);
        },
        err => {
          this.$router.push(`/contracts/${this.$route.params.id}`);
        }
      );
    },
    verifyContract() {
      let payment = {};
      payment.budgets_attributes = this.budgets;
      payment.payment_status = 1;
      api.put([END_POINT.contracts, this.$route.params.id], payment).then(
        data => {
          this.payment = 1;
          this.$message({
            message: 'Đã xác nhận thông tin thanh toán!',
            type: 'message'
          });
        },
        err => {
          this.$message({
            message: 'Lỗi xác nhận!',
            type: 'error'
          });
        }
      );
    },
    tableRowClassName({row, rowIndex}) {
      // return 'success-row';
      // return '';
    },
    goBack() {
      this.$router.push(`/contracts/search`);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.pay-box {
  display: flex;
}
.pay-header {
  padding-left: 100px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.pay-meta {
  direction: rtl;
  .label-contract {
    padding-top: 10px;
  }
}
b {
  font-weight: 700;
}
.alige-center {
  padding-top: 20px; 
}
</style>
