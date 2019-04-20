<template>
<div class="public-contract">
  <span class="navbar-toggler-icon"></span>
  <el-menu class="el-menu-demo menu-fixed menu-mobile" mode="horizontal" >
    <el-menu-item index="1"><div class="header__logo"><a href="/home"><img src="../../assets/img/logo-main-black.png" style="width: 150px;" alt=""/></a></div></el-menu-item>
    <el-menu-item style="float: right;" index="2">
       <el-popover
      placement="top-start"
      title="Menu"
      width="250"
      trigger="click">
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      >
      <el-menu-item index="1">
        <a target="_blank" href="http://www.theclassic.studio">
          Trang chủ
        </a>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <span>Dịch vụ trang phục</span>
        </template>
        <el-menu-item index="2-1">Nhập lịch thử đồ</el-menu-item>
        <el-menu-item index="2-2">Nhập size</el-menu-item>
        <el-menu-item index="2-3">Tình trạng trả đồ</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <span>Xem sản phẩm</span>
        </template>
        <el-menu-item index="3-1">Xem ảnh sửa + gốc</el-menu-item>
        <el-menu-item index="3-2">Xem video</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <span>Dịch vụ khác</span>
        </template>
        <el-menu-item index="4-1">Chọn ảnh in</el-menu-item>
        <el-menu-item index="4-2">Gửi một yêu cầu</el-menu-item>
        <el-menu-item index="4-3">Nhật xét thợ chụp</el-menu-item>
      </el-submenu>
      <el-menu-item index="5">
        <router-link class="center-head" tag="a" :to="`/contracts/${$route.params.id}`">
          <el-button type="primary" class="full-width" plain size="small"><b class="el-icon-setting" ></b>Trình Quản Lý Lớp</el-button>
        </router-link><br>
      </el-menu-item>
      <el-menu-item index="6">
        <router-link class="center-head" tag="a" :to="`/contracts/${$route.params.id}/payment`">
          <el-button type="success" class="full-width" plain size="small"><b class="el-icon-document"></b>Thanh Toán</el-button>
        </router-link><br>
      </el-menu-item>
    </el-menu>
      <el-button class="popover" slot="reference"><i class="el-icon-more" style="font-size: 30px"></i></el-button>
      </el-popover>
    </el-menu-item>
  </el-menu>
  <el-menu class="el-menu-demo menu-pc menu-fixed" mode="horizontal" >
    <el-menu-item index="1"><div class="header__logo"><a href="/home"><img src="../../assets/img/logo-main-black.png" style="width: 150px;" alt=""/></a></div></el-menu-item>
      <el-menu-item index="2">
        <a target="_blank" href="http://www.theclassic.studio">
          Trang chủ
        </a>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">Dịch vụ trang phục</template>
        <el-menu-item index="2-1">Nhập lịch thử đồ</el-menu-item>
        <el-menu-item index="2-2">Nhập size</el-menu-item>
        <el-menu-item index="2-3">Tình trạng trả đồ</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">Xem sản phẩm</template>
        <el-menu-item index="2-1">Xem ảnh sửa + gốc</el-menu-item>
        <el-menu-item index="2-2">Xem video</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">Dịch vụ khác</template>
        <el-menu-item index="2-1">Chọn ảnh in</el-menu-item>
        <el-menu-item index="2-2">Gửi một yêu cầu</el-menu-item>
        <el-menu-item index="2-3" disabled>Nhật xét thợ chụp</el-menu-item>
      </el-submenu>
      <el-menu-item index="6" style="float: right">
        <router-link class="center-head" tag="a" :to="`/contracts/${$route.params.id}`">
          <el-button type="primary" plain size="small"><b class="el-icon-setting" ></b>Trình Quản Lý Lớp</el-button>
        </router-link>
        <el-button type="success" plain size="small"><b class="el-icon-document"></b>Thanh Toán</el-button>
      </el-menu-item>
    </el-menu>
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
      <el-row class="container contract-info-main">
        <h3 style="margin-top: 20px" class="center-head">
          Thông tin hợp đồng<br>
        </h3>
        <el-col class="" :xs="24" :span="12">
          <div class="contracts-form">
            <el-row>
              <el-col :span="8">
                <div class="avatar">
                  <img src="../../assets/img/photographer.png" alt="Si" class="avatar-image">
                  <h4 class="center-head">Bên A</h4>
                </div>
              </el-col>
              <el-col :span="16">
                <label>Họ và Tên: </label><b>  Đỗ Hồng Quân  </b><a target="_blank" href="https://www.fb.com/dhquan19"><i class="fa fa-facebook-official" aria-hidden="true"></i></a><br>
                <label>Đơn vị: </label><b>The Classic Studio</b><br>
                <label>Địa chỉ: </label><b>42 Tống Phước Phổ,<br> P. Hòa Cường Bắc, Q. Hải Châu, Đà Nẵng</b><br>
                <label>SĐT: </label><b><a :href="`tel: ${`0773420210`}`">{{`0773420210`}}</a></b><br>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col class="" :xs="24" :span="12">
          <div class="contracts-form">
            <el-row>
              <el-col :span="8">
                <div class="avatar">
                  <img src="../../assets/img/photographer.png" alt="Si" class="avatar-image">
                  <h4 class="center-head">Bên B</h4>
                </div>
              </el-col>
              <el-col :span="16">
                <label>Họ và Tên: </label><b>  {{contract.name}}  </b><a target="_blank" :href="contract.member.link_facebook"><i class="fa fa-facebook-official" aria-hidden="true"></i></a><br>
                <label>Số lượng thành viên: </label><b> {{ contract.total_member }}</b><br>
                <label>Đại diện của: </label><b>{{contract.group}} - {{contract.school.name}}</b><br>
                <label>SĐT: </label>
                <b><a :href="`tel: ${contract.member.phone_number}`">{{contract.member.phone_number}}</a></b><br>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <div id="contract center-head">
        <el-row class="container">
          <h3 class="center-head">Lịch trình</h3>
          <el-col :xs="24" :span="12">
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
            <div class="bonus-info">
            <h5 class="price-contract">Thông tin bổ sung</h5>
            <p><b>Tiền cọc:</b> {{contract.deposit}}</p>
            <b>Ghi chú:</b> <p style="white-space: pre-wrap;">{{contract.note}}</p>
            </div>
          </el-col>
          <el-col :xs="24" :span="12">
            <h5 class="price-contract">Các gói dịch vụ đã chọn</h5>
            <el-table
              :data="contract.budgets.filter(x => x.budgetable_type === 'Package' && x.budgetable.kind_package == 1)"
              style="width: 100%">
              <el-table-column
                label="Tên cụ thể"
                width="180">
                <template slot-scope="scope">
                  <p>{{scope.row.budgetable.name}}</p>
                </template>
              </el-table-column>
              <el-table-column
                label="Cách tính tiền">
                <template slot-scope="scope">
                  <p>{{statusCalc[scope.row.budgetable.package_type]}}</p>
                </template>
              </el-table-column>
            </el-table>
            <h5 class="price-contract">Những gói mở rộng</h5>
            <el-table
              :data="contract.budgets.filter(x => x.budgetable_type === 'Package' && x.budgetable.kind_package > 1)"
              style="width: 100%">
              <el-table-column
                label="Tên cụ thể"
                width="180">
                <template slot-scope="scope">
                  <p>{{scope.row.budgetable.name}}</p>
                </template>
              </el-table-column>
              <el-table-column
                label="Cách tính tiền">
                <template slot-scope="scope">
                  <p>{{statusCalc[scope.row.budgetable.package_type]}}</p>
                </template>
              </el-table-column>
            </el-table>
            <h5 class="price-contract">Phát sinh</h5>
            <!-- <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                label="Tên cụ thể"
                width="180">
                <template slot-scope="scope">
                  <p>{{scope.row.budgetable.name}}</p>
                </template>
              </el-table-column>
              <el-table-column
                label="Cách tính tiền">
                <template slot-scope="scope">
                  <p>{{statusCalc[scope.row.budgetable.package_type]}}</p>
                </template>
              </el-table-column>
            </el-table> -->
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
          <div class="no-photo" v-if="photographers.length == 0">
            <p>Chưa rõ thợ chụp</p>
          </div>
        </div>
      </div>
      <div class="container">
        <h3 class="center-head">Các điều khoản cơ bản</h3>
        <el-collapse v-model="activeNames">
            <el-collapse-item name="1">
              <template slot="title">
                Điều khoản về thanh toán <i class="header-icon el-icon-info"></i>
              </template>
              <div>
                <p>
                  <b>Về việc đặt cọc:</b> Hợp đồng chỉ có giá trị khi lớp tiến hành đặt cọc tiền và có lịch chụp cụ thể. Giá trị đặt cọc tối thiểu là 30% hợp đồng.<br><br>
                  <b>Về việc thanh toán:</b> Sau khi chụp xong, lớp tiến hành thanh toán hết toàn bộ số tiền còn lại (bao gồm các phát sinh). Ảnh sẽ bắt đầu tính ngày sửa, khi lớp đã hoàn thành xong các thủ tục thanh toán & trả đồ.<br>
                  Các lớp sẽ có 7 ngày để thanh toán, kể từ khi chụp xong. Nếu quá thời hạn, số tiền còn lại sẽ được tính <b>phát sinh nợ</b>, dựa trên lãi ngân hàng.<br><br>
                  <b>Về phương thức thanh toán:</b> Các lớp có thể tiến hành trả tiền trực tiếp (chú ý: nhận hóa đơn) hoặc chuyển khoản qua thông tin tài khoản của studio ở bên dưới ( có hình ảnh giấy tờ chuyển khoản đi kèm & ghi rõ nội dung: "tên lớp - ngày chụp- tên đại diện").<br>
                  ---------------------<br>
                  STK - 100214849231113<br>
                  Tên chủ thẻ - ĐỖ HỒNG QUÂN<br>
                  Ngân hàng - Eximbank chi nhánh Hùng Vương - Đà Nẵng<br>
                  ---------------------
                </p>
              </div>
            </el-collapse-item>
            <el-collapse-item name="2">
               <template slot="title">
                Điều khoản về việc thuê trang phục <i class="header-icon el-icon-info"></i>
              </template>
              <div>
                  <b>Về thời gian thử đồ:</b> Thành viên các lớp có thể thử đồ trước 2 ngày kể từ ngày chụp (Trường hợp ngoại lệ, vui lòng liên hệ trực tiếp studio).<br>
                  Lớp cùng studio chọn ra khung giờ nhiều thành viên thử đồ nhất để studio dễ dàng xếp người quản lý, và phục vụ cho cả lớp.<br><br>
                  <b>Về việc thuê:</b> Thành viên các lớp có thử và mang về các trang phục thuộc các loại sau: quần, áo, những phụ kiện đi kèm với loại trang phục đó.<br> Riêng <b>vòng hoa, cà vạt, bằng cử nhân </b>, studio sẽ sắp xếp đem lên vào ngày chụp. Lý do vì các vật dụng này dễ hư và dễ mất, nên phát trước sẽ không được bảo quản tốt.<br>
                  Sau khi chụp xong, lớp vui lòng tự sắp xếp và trả <b>vòng hoa, cà vạt, bằng cử nhân </b> về cho studio <b>ngay trong ngày</b>. Trường hợp trả trễ, studio tính phát sinh theo giá thuê mới. <a style="display: inline-block">(tham khảo giá phát sinh thuê tại đây)</a><br><br>
                  <b>Về việc trả:</b> Lớp có <b>đúng 1 ngày</b> sau khi chụp xong, để trả ít nhất 70% số trang phục. Số lượng trang phục còn lại phải hoàn thành trong ngày tiếp theo (ngày thứ 2). <br>
                  Phát sinh sẽ bắt đầu tính từ <b>ngày thứ 3</b> trở đi, cho các bạn chưa trả trang phục, dựa trên bảng giá thuê trang phục. <a style="display: inline-block">(tham khảo giá phát sinh thuê tại đây)</a><br><br>
                  <b>Về việc bảo quản:</b>   Các thành viên thuê đồ phải có trách nhiệm trong việc giữ gìn đồ đạc. Studio không nhận lại các trang phục lỗi, và những bạn sử dụng các trang phục này phải chi trả toàn bộ số tiền mua trang phục theo bảng giá niêm yết, <a style="display: inline-block">(tham khảo giá đền quần áo tại đây)</a> trang phục hư là trang phục có 1 trong các tình trạng sau:
                  <p>+ Bị rách, cháy xém, ố vàng và không thể fix được.</p>
                  <p>+ Bị lem màu ( thường xảy ra với áo dài trắng, giặt chung với trang phục có màu).</p>
                  <p>+ Bị mất, thất lạc. </p>
                  <p>+ Bị ẩm mốc ( thường xảy ra với lớp chụp ngày mưa, hoặc vì lý do gì đó mà quần áo bị ướt, sau đấy về bỏ vào bao ko phơi ra).</p>
                  <p>+ Tự ý thay đổi, may vá, sửa trang phục mà ko thể đưa về hiện trạng cũ được ( 1 trường hợp dễ hiểu là lên lai áo dài, điều này bình thường, nhưng nhiều bạn ko lên lai mà cắt luôn tà áo dài).</p>
                  Ảnh sẽ bắt đầu tính ngày sửa khi trang phục được qua ít nhất 70% và hợp đồng đã thanh toán đầy đủ.
              </div>
            </el-collapse-item>
            <el-collapse-item name="3">
               <template slot="title">
                Điều khoản về sửa ảnh, video <i class="header-icon el-icon-info"></i>
              </template>
              <div>
                  <b>Thời gian sửa ảnh:</b> thời gian sửa ảnh bắt đầu kể từ khi trả 70% trang phục và thanh toán đầy đủ. Sau khi bắt đầu tính thời gian sửa, chúng tôi sẽ cần 3 ngày để làm bản demo ảnh, và thêm 2 ngày nữa để hoàn thiện toàn bộ album ảnh ( tức là mất 5 ngày kể từ ngày trả đồ xong, thì cả lớp sẽ có toàn bộ ảnh chỉnh và ảnh gốc)<br><br>
                  <b>Thời gian sửa video:</b> cũng tính như cách trên. Sau đó 1,5 tuần, video hoàn thiện sẽ ra mắt. Trong khoảng thời gian chờ đợi, studio có thể tung ra thêm các trailer cho lớp xem và chia sẻ.<br><br>
                  <b>Thời gian giao ảnh in:</b> Với những lớp có ảnh in, sau khi chúng tôi giao link ảnh đầy đủ. Các bạn sẽ tiến hành chọn ảnh theo form studio cung cấp. <a style="display: inline-block">hướng dẫn tại đây</a> Cả lớp sẽ có 1 tuần để điền thông tin và ảnh mong muốn in. Sau 1 tuần link sẽ bị khóa, 3 tuần sau cả lớp sẽ được nhận ảnh in.<br><br>
              </div>
              </el-collapse-item>
              <el-collapse-item name="4">
                <template slot="title">
                  Thông tin chi tiết <i class="header-icon el-icon-info"></i>
                </template>
                <div>
                  <p><b>Địa chỉ: 42 Tống Phước Phổ - Hải Châu- Đà Nẵng.</b></p>
                  <p><b>SĐT: <a :href="`tel: ${`0777592561`}`">{{`0777592561`}}</a> - Hậu cần Classic</b></p>
                  <p><b>SĐT chịu trách nhiệm toàn bộ: <a :href="`tel: ${`0773420210`}`">{{`0773420210`}}</a> (Mr. Quân)</b></p>
                </div>
            </el-collapse-item>
        </el-collapse>
      </div>
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
      activeNames: ['1', '2', '3', '4'],
      statusCalc: ['Tính theo đầu người', 'Tính theo gói'],
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
.bonus-info {
  padding-left: 50px;
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
  margin-top: 40px;
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
.label-small {
  width: 200px;
}
.contract-info-main {
  margin-top: -70px;
}

.fa {
  font-size: 25px;
}
.gotoUrl {
  font-size: 15px;
}
@media(max-width: 450px) {
  .menu-pc {
    display: none;
  }
  .menu-mobile {
    display: block;
  }
}
@media(min-width: 451px) {
  .menu-pc {
    display: block;
  }
  .menu-mobile {
    display: none;
  }
}
.contracts-form {
  width: 80%;
  margin: 0 auto;
  border-style: dashed;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 2rem 1rem;
  min-height: 240px;
  .avatar {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    shape-outside: circle(50% at 50% 50%);
    position: relative;
  }
  @media(max-width: 450px) {
    width: 100%;
    min-height: auto;
    .avatar {
      width: 5rem;
      height: 5rem;
    }
  }
}
.tag {
  color: white;
  font-weight: bold;
  margin: 0 0 10px 10px;
  &-danger {
    background: #F56C6C;
  }
  &-primary {
    background: #409EFF
  }
}
.menu-fixed {
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
}   

.avatar {
  width: 10rem;
  height: 10rem;
  border-radius: 95%;
  shape-outside: circle(50% at 50% 50%);
  position: relative;
  &:hover {
    .avatar-image {
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
}
.over-layer {
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
}
.popover {
  padding: 12px 0;
  border: 0;
  outline: none;
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
        justify-content: space-evenly;
      }
    }
  }
  @media(max-width: 450px) {
    height: 1000px;
    .photographer-list {
      display: block;
      .detail-container {
        margin-bottom: 20px;
        .detail {
          margin: 0 auto;
          width: 5rem;
          height: 5rem;
        }
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
  background-attachment: fixed;
  background-repeat: no-repeat;
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
