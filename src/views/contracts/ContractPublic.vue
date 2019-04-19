<template>
<div class="public-contract">
    <div class="contract" v-if="contract">
      <div class="center-head background-head">
        <div class="container head-meta">
        <h2>HỢP ĐỒNG ĐIỆN TỬ</h2>
        <h5>eBillings</h5>
        <div class="header__logo"><a href="/home"><img src="../../assets/img/logo-main-black.png" style="width: 150px;" alt=""/></a></div>
        <h5>Mã code hoá đơn:  <b style="text-transform: uppercase"> {{contract.code}} </b></h5>
        <b>Tình trạng ảnh:</b>
        <el-tag type="danger" v-if="!contract.image_status">Thu thập file sửa</el-tag>
        <el-tag type="warning" v-if="contract.image_status == 1">Đang sửa</el-tag>
        <el-tag type="primary" v-if="contract.image_status == 2">Up ảnh</el-tag>
        <el-tag type="success" v-if="contract.image_status == 3">Full ảnh Sửa</el-tag>
        <el-tag type="danger" v-if="!contract.raw_status">Thu thập file gốc</el-tag>
        <el-tag type="primary" v-if="contract.raw_status == 1">Up ảnh</el-tag>
        <el-tag type="success" v-if="contract.raw_status == 2">Full ảnh gốc</el-tag><br>
        <b>Tình trạng Thanh Toán:</b>
        <el-tag type="danger" v-if="!contract.payment_status">Chưa đặt cọc</el-tag>
        <el-tag type="warning" v-if="contract.payment_status == 1">Đặt cọc</el-tag>
        <el-tag type="primary" v-if="contract.payment_status == 2">Chưa thanh toán đủ</el-tag>
        <el-tag type="success" v-if="contract.payment_status == 3">Đã thanh toán</el-tag><br>
        <b>Tình trạng Thuê:</b>
        <el-tag type="danger" v-if="!contract.clothes_status">Chưa trả xong</el-tag>
        <el-tag type="success" v-if="contract.clothes_status == 1">Trả hết trang phục</el-tag><br>
        <b>Tình trạng Video:</b>
        <el-tag type="danger" v-if="!contract.video_status">Thu thập</el-tag>
        <el-tag type="warning" v-if="contract.video_status == 1">Đang sửa</el-tag>
        <el-tag type="primary" v-if="contract.video_status == 2">Up video</el-tag>
        <el-tag type="success" v-if="contract.video_status == 3">Full Video</el-tag><br>
        <b>Tình trạng In: </b>
        <el-tag type="danger" v-if="!contract.print_status">Chưa in</el-tag>
        <el-tag type="warning" v-if="contract.print_status == 1">Xử lý File</el-tag>
        <el-tag type="primary" v-if="contract.print_status == 2">In ảnh xong, chờ giao</el-tag>
        <el-tag type="success" v-if="contract.print_status == 3">Đã giao ảnh</el-tag><br>
      
      </div>
      </div>
      <el-row>
        <h3 style="margin-top: 20px" class="center-head">
          Thông tin hợp đồng<br>
          <router-link class="center-head" tag="a" :to="`/contracts/${$route.params.id}`">
            <span class="gotoUrl">Đi đến hệ thống chăm sóc khách hàng tại đây</span>
          </router-link>
        </h3>
        <el-col class="center-head" :span="12">
          <h4 >Bên A</h4>
          <label>Họ và Tên: </label><b>  Đỗ Hồng Quân  </b><a target="_blank" href="https://www.fb.com/dhquan19"><i class="fa fa-facebook-official" aria-hidden="true"></i></a><br>
          <label>Đơn vị: </label><b>The Classic Studio</b><br>
          <label>Địa chỉ: </label><b>43 Tống Phước Phổ,<br> P. Hòa Cường Bắc, Q. Hải Châu, Đà Nẵng</b><br>
          <label>SĐT: </label><b><a :href="`tel: ${`0773420210`}`">{{`0773420210`}}</a></b><br>
        </el-col>
        <el-col class="center-head" :span="12">
          <h4>Bên B</h4>
          <label>Họ và Tên: </label><b>  {{contract.name}}  </b><a target="_blank" :href="contract.member.link_facebook"><i class="fa fa-facebook-official" aria-hidden="true"></i></a><br>
          <label>Số lượng thành viên: </label><b> {{ contract.total_member }}</b><br>
          <label>Đại diện của: </label><b>{{contract.group}} - {{contract.school.name}}</b><br>
          <label>SĐT: </label>
          <b><a :href="`tel: ${contract.member.phone_number}`">{{contract.member.phone_number}}</a></b><br>
          <!-- <b><a :href="`tel: ${contract.phone1}`">{{contract.phone1}}</a></b> -
          <b><a :href="`tel: ${contract.phone2}`">{{contract.phone2}}</a></b><br> -->
        </el-col>
      </el-row>
      <hr>
      <div id="contract center-head">
        <h3 class="center-head">Lịch trình</h3>
        <el-row>
          <el-col :span="12">
            <div v-if="contract.date_takens && contract.date_takens.length > 0">
              <div v-for="date in contract.date_takens" :key="date.id">
                <el-timeline style="width: 80%; margin-top: 15px">
                  <el-timeline-item
                    v-for="(plan, ip) in date.plans" :key="ip"
                    :timestamp="plan.plan_time | dateFormat">
                    <div v-if="plan._destroy !== 1">
                      <b>{{plan.plan_time | timeFormat}}</b>: {{plan.costume}} - {{plan.content}}
                    </div>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </div>
            <h5 class="price-contract">Thông tin bổ sung</h5>
            <p><b>Tiền cọc:</b> {{contract.deposit}}</p>
            <b>Ghi chú:</b> <p style="white-space: pre-wrap;">{{contract.note}}</p>
          </el-col>
          <el-col :span="12">
            <h5 class="price-contract">Các gói dịch vụ đã chọn</h5>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="Tên cụ thể"
                width="180">
              </el-table-column>
              <el-table-column
                prop="type"
                label="Cách tính tiền">
              </el-table-column>
            </el-table>
            <h5 class="price-contract">Những gói mở rộng</h5>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="Tên cụ thể"
                width="180">
              </el-table-column>
              <el-table-column
                prop="type"
                label="Cách tính tiền">
              </el-table-column>
            </el-table>
            <h5 class="price-contract">Phát sinh</h5>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="Tên cụ thể"
                width="180">
              </el-table-column>
              <el-table-column
                prop="type"
                label="Cách tính tiền">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
      <div class="photographer-container photo-back" id="contract">
        <div class="container photo-meta">
          <h3 class="title">Thợ chụp / quay</h3>
          <div class="photographer-list" v-if="photographers">
            <div class="detail-container" v-for="(item, index) of photographers" :key="index">
              <div class="detail">
                <img src="../../assets/img/photographer.png" alt="Si" class="detail-image">
              </div>
              <h4 class="detail-name">{{item.user.name}}</h4>
              <span class="description">{{item.photographer_role}}</span><br>
              <b>{{item.date_taken | dateFormat}}</b>
              <div class="contact-container">
                <a :href="`tel: ${item.user.phone}`"><i class="fa fa-phone" aria-hidden="true"></i></a>
                <a target="_blank" href="https://www.fb.com/dhquan19"><i class="fa fa-facebook-official" aria-hidden="true"></i></a>
                <a target="_blank" href="https://www.fb.com/dhquan19"><i class="fa fa-instagram" aria-hidden="true"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div class="no-photo" v-if="photographers.length == 0">
          <p>Chưa rõ thợ chụp</p>
        </div>
      </div>
      <hr>
      <el-collapse>
        <h3 class="center-head">Các điều khoản</h3>
        <el-collapse-item title="Các điều khoản của hợp đồng" name="4">
          <div>Điều khoản về thanh toán</div>
          <div>Điều khoản về việc thuê trang phục</div>
          <div>Điều khoản về sửa ảnh, video</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { APIService } from "../../service/apiService.js";
import { format } from "date-fns";

const apiService = new APIService()

export default {
  name: 'Contract',
  data() {
    return {
      activeNames: 1,
      contract: null,
      photographers: [],
      messageWhenNoItems: 'There are not items',
      tableData: [{
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          tag: 'Home'
        }, {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          tag: 'Office'
        }],
      dataTimeline: [
        {
          from: new Date(2018, 7),
          title: 'Name',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius earum architecto dolor, vitae magnam voluptate accusantium assumenda numquam error mollitia, officia facere consequuntur reprehenderit cum voluptates, ea tempore beatae unde.'
        },
        {
          from: new Date(2016, 1),
          title: 'Name',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius earum architecto dolor, vitae magnam voluptate accusantium assumenda numquam error mollitia, officia facere consequuntur reprehenderit cum voluptates, ea tempore beatae unde.'
        },
        {
          from: new Date(2016, 6),
          title: 'Name',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius earum architecto dolor, vitae magnam voluptate accusantium assumenda numquam error mollitia, officia facere consequuntur reprehenderit cum voluptates, ea tempore beatae unde.'
        },
        {
          from: new Date(2012, 1),
          title: 'Name',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius earum architecto dolor, vitae magnam voluptate accusantium assumenda numquam error mollitia, officia facere consequuntur reprehenderit cum voluptates, ea tempore beatae unde.'
        }
      ]
    }
  },
  filters: {
    dateFormat: function(value) {
      if (!value) return "";
      console.log(typeof value);
      return format(new Date(value), "DD/MM");
    },
    timeFormat: function(value) {
      if (!value) return "";
      return format(new Date(value), "HH:mm");
    }
  },
  created () {
    apiService.get(['contracts', this.$route.params.id]).then(data => {
      if(data.contract.secret_key === this.$route.query.code ) {
        this.contract = data.contract;
        this.contract.date_takens.forEach(x => {
          let a = x.photographer_date_takens.map(y => ({...y, date_taken: x.date_taken}));
          this.photographers = [...this.photographers, ...a];
        })
      }
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
  padding-top: 80px;
}
.center-head {
  text-align: center;
}
h2 {
  font-size: 2rem;
}
h3 {
  font-size: 1.5rem;
  padding-bottom: 20px;
}
h4 {
  font-size: 1rem;
}
b {
  font-weight: 700;
}
hr {
  margin: 20px 0;
}
.public-contract {
  background-color: white;
}
.no-photo {
  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.contract {
  &-detail {
    padding: 30px 0;
    width: 50%;
    margin: 0 auto;
    white-space: nowrap;
    h5 {
      padding: 10px 0;
    }

  }
}
.fa {
  font-size: 25px;
}
.gotoUrl {
  font-size: 15px;
}
.photographer-container {
    position: relative;
    height: 450px;
    background: #f0f0f0;
    .container {
      padding-top: 0;
      padding-bottom: 0;
    }
    .title {
      text-align: center;
      padding: 30px 0 50px 0;
    }
    .photographer-list {
      display: flex;
      justify-content: space-evenly;
      .detail-container {
        text-align: center;
        padding: 20px 40px;
        background-color: rgba(255,255,255, 0.3);
        border-radius: 10px;
        .detail {
          width: 10rem;
          height: 10rem;
          background-color: white;
          border-radius: 50%;
          shape-outside: circle(50% at 50% 50%);
          border: 2px solid white;
          overflow: hidden;
          position: relative;
          &:hover {
              .detail-image {
                -webkit-transform: scale(1.1);
                transform: scale(1.1);
                vertical-align: middle;
              }
            }
          &-image {
            height: 100%;
            backface-visibility: hidden;
            transition: all 0.2s;
            width: 100%;
            object-fit: cover;
            -webkit-transition: all 0.6s;
            transition: all 0.6s;
          }
          &-name {
            padding-top: 20px;
            font-weight: bold;
            font-size: larger;
          }
        }
        .contact-container {
          display: flex;
          justify-content: space-around;
        }
      }
    }
}
.price-contract {
  padding: 10px 0;
}
.container {
  padding-top: 80px;
}
.center-head {
  text-align: center;
}
h2 {
  font-size: 2rem;
}
h3 {
  font-size: 1.5rem;
  padding-bottom: 20px;
}
h4 {
  font-size: 1rem;
}
b {
  font-weight: 700;
}
hr {
  margin: 20px 0;
}
.background-head {
  background-image: url(../../assets/img/main.jpg);
  background-size: cover;
  background-position: center;
  position: relative;
  height: 520px;
  .head-meta {
    position: relative;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255, 0.7);
  }
}
.photo-back {
  background-image: url(../../assets/img/photo-back.jpg);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  position: relative;
  .photo-meta {
    position: relative;
    color: white;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0, 0.7);
  }
}


.el-tag {
  font-weight: 700;
  background-color: rgba(255,255,255,0.6);
}
</style>
