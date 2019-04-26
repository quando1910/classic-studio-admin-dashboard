<template>
  <div class="animated fadeIn">
    <b-row v-if="this.id">
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>Cập nhật trạng thái</strong>
          </div>
          <el-row>
            <el-col :span="1">
              <label for="name">File sửa:</label>
            </el-col>
            <el-col :span="3" style="padding-right: 20px">
              <el-select v-model="contract.image_status" placeholder="Select">
                <el-option
                  v-for="item in blendStatus"
                  :key="`as-${item.value}`"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="1">
              <label for="name">File gốc:</label>
            </el-col>
            <el-col :span="3" style="padding-right: 20px">
              <el-select v-model="contract.raw_status" placeholder="Select">
                <el-option
                  v-for="item in rawStatus"
                  :key="`bs-${item.value}`"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="1">
              <label for="name">Video:</label>
            </el-col>
            <el-col :span="3" style="padding-right: 20px">
              <el-select v-model="contract.video_status" placeholder="Select">
                <el-option
                  v-for="item in videoStatus"
                  :key="`cs-${item.value}`"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="1">
              <label for="name">Trang phục:</label>
            </el-col>
            <el-col :span="3" style="padding-right: 20px">
              <el-select v-model="contract.clothes_status" placeholder="Select">
                <el-option
                  v-for="item in clothesStatus"
                  :key="`ds-${item.value}`"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="1">
              <label for="name">Thanh toán:</label>
            </el-col>
            <el-col :span="3" style="padding-right: 20px">
              <el-select v-model="contract.payment_status" placeholder="Select">
                <el-option
                  v-for="item in paymentStatus"
                  :key="`es-${item.value}`"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="1">
              <label for="name">Ảnh in:</label>
            </el-col>
            <el-col :span="2">
              <el-select v-model="contract.print_status" placeholder="Select">
                <el-option
                  v-for="item in printStatus"
                  :key="`fs-${item.value}`"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="6">
        <b-card>
          <div slot="header">
            <strong>{{this.id ? 'Sửa' : 'Tạo mới'}} hợp đồng</strong>
            <small>thông tin</small>
            <el-button
              v-if="id"
              class="to-the-right"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete"
            ></el-button>
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
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="name">Tên đại diện</label>
                <b-form-input
                  type="text"
                  id="name"
                  placeholder="Nhập tên"
                  v-model="contract.members_attributes[0].name"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="ccnumber">Số điện thoại</label>
                <b-form-input
                  type="text"
                  id="phone"
                  placeholder="Nhập sđt"
                  v-model="contract.members_attributes[0].phone_number"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="ccnumber">Link facebook</label>
                <b-form-input
                  type="text"
                  id="facebook"
                  placeholder="Nhập đường link facebook"
                  v-model="contract.members_attributes[0].link_facebook"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group
            label="Giới tính"
            label-for="basicRadios"
            :label-cols="3"
            :horizontal="true"
          >
            <b-form-radio-group
              id="basicRadios"
              :plain="true"
              v-model="contract.members_attributes[0].gender"
              :options="[
                {text: 'Nam',value: '0'},
                {text: 'Nữ',value: '1'}
              ]"
              checked="0"
            ></b-form-radio-group>
          </b-form-group>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="ccnumber">Trường</label>
                <br>
                <el-select v-model="contract.school_id" placeholder="Select" class="full-width">
                  <el-option
                    v-for="(school, schoodIndex) in schools"
                    :key="`a-${schoodIndex}`"
                    :label="school.name"
                    :value="school.id"
                  ></el-option>
                </el-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label for="ccnumber">Nhóm/ Lớp</label>
                <b-form-input
                  type="text"
                  v-model="contract.group"
                  id="group"
                  placeholder="nhập tên lớp"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <label for="ccnumber">Năm học</label>
                <b-form-input
                  type="text"
                  v-model="contract.label"
                  id="year"
                  placeholder="nhập năm học"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="4">
              <b-form-group>
                <label for="ccnumber">Sĩ số lớp</label>
                <b-form-input
                  type="text"
                  id="numerator"
                  v-model="contract.total_member"
                  placeholder="Sĩ số lớp"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label for="ccnumber">Tổng nam</label>
                <b-form-input
                  type="text"
                  id="men"
                  v-model="contract.male_number"
                  placeholder="Tổng nam"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label for="ccnumber">Tổng nữ</label>
                <b-form-input
                  type="text"
                  id="women"
                  v-model="contract.female_number"
                  placeholder="Tổng nữ"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
        <b-card>
          <div slot="header">
            <strong>Gói chụp - quay</strong>
            <small>Form</small>
          </div>
          <b-form-group>
            <label for="company">Chọn gói chụp</label>
            <br>
            <el-select
              multiple
              @change="setPropety"
              v-model="package_id"
              placeholder
              class="input-contract w-100"
            >
              <el-option
                v-for="(p, i) in packages"
                :key="`c-${i}`"
                :label="p.name"
                :value="p.id"
                :disabled="p.priority < 3 && priorities.includes(p.priority)"
              ></el-option>
            </el-select>
          </b-form-group>
          <b-form-group>
            <label for="vat">Danh sách đồ đi kèm</label>
            <br>
            <el-tag
              type="success"
              v-for="(sp,index1) in subProperty"
              :key="`d-${index1}`"
            >{{sp.name}}</el-tag>
          </b-form-group>
          <b-form-group>
            <label for="vat">Phụ kiện book thêm</label>
            <br>
            <el-select
              @change="setMorePropety"
              v-model="propertyMore"
              multiple
              placeholder
              class="full-width"
            >
              <el-option
                v-for="(p,index2) in properties"
                :key="`e-${index2}`"
                :label="p.name"
                :value="p.id"
              ></el-option>
            </el-select>
          </b-form-group>
          <b-row>
            <b-col sm="4">
              <b-form-group disabled="true">
                <label>Thành tiền dự kiến</label>
                <span>123123</span>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label>Đặt cọc</label>
                <b-form-input
                  type="text"
                  id="deposit"
                  v-model="contract.deposit"
                  placeholder="Nhập số tiền đặt cọc"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label>Số dư còn lại</label>
                <br>
                <span>123123</span>
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
          <b-form-group
            v-for="(d,index3) in contract.date_takens_attributes"
            :key="`f-${index3}`"
            :label="`Ngày chụp ${index3+1}`"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true"
          >
            <el-date-picker
              @change="updateDateTaken($event, index3, d.id)"
              class="input-contract input-contract--time"
              v-model="d.date_taken"
              type="date"
              placeholder="Pick a day"
            ></el-date-picker>
            <el-button
              class="margin-10"
              v-if="index3 == 0"
              type="primary"
              icon="el-icon-plus"
              circle
              @click="addDate()"
            ></el-button>
            <el-button
              class="margin-10"
              v-if="index3 != 0"
              @click="deleteDate(i, d)"
              type="danger"
              icon="el-icon-minus"
              circle
            ></el-button>
          </b-form-group>
          <label for="ccnumber">Lịch trình</label>
          <el-tabs type="card" v-if="contract.date_takens_attributes[0].date_taken != ''">
            <el-tab-pane
              v-for="(date, index4) in this.contract.date_takens_attributes"
              :key="`g-${index4}`"
              :label="'Ngày '+ getDate(date.date_taken)"
            >
              <el-button
                class="to-the-right"
                type="warning"
                icon="el-icon-edit"
                @click="openPlanDialog(date)"
                circle
              ></el-button>
              <el-timeline :reverse="reverse" style="width: 80%; margin-top: 15px">
                <el-timeline-item
                  v-for="(plan, ip) in date.plans_attributes"
                  :key="`h-${ip}`"
                  :timestamp="plan.plan_time"
                >
                  <div v-if="plan._destroy !== 1">
                    <b>{{plan.plan_time}}</b>
                    : {{plan.costume[0]}} - {{plan.content}}
                  </div>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    @click="deletePlan(index, ip)"
                    circle
                    size="mini"
                  ></el-button>
                </el-timeline-item>
              </el-timeline>
            </el-tab-pane>
          </el-tabs>
        </b-card>
        <b-card>
          <div slot="header">
            <strong>Ghi chú</strong>
          </div>
          <el-input type="textarea" autosize placeholder="Please input" v-model="contract.note"></el-input>
        </b-card>
        <b-card>
          <div slot="header">
            <strong>Thông tin hợp đồng</strong>
            <!-- <small>xem lại</small> -->
          </div>
          <b-row>
            <b-col sm="6">
              <b>Tên đại diện:</b>
              <span>{{contract.members_attributes[0].name}}</span>
              <br>
              <b>Số điện thoại:</b>
              <span>{{contract.members_attributes[0].phone_number}}</span>
              <br>
              <b>Giới tính:</b>
              <span v-if="contract.members_attributes[0].gender === '0'">Nam</span>
              <span v-if="contract.members_attributes[0].gender === '1'">Nữ</span>
              <br>
              <b>Sĩ số:</b>
              <span>{{contract.total_member}} - ({{contract.male_number}} + {{contract.female_number}})</span>
              <br>
              <b>Trường</b>
              <span
                v-if="schools.filter(x => x.id == contract.school_id)[0]"
              >{{schools.filter(x => x.id == contract.school_id)[0].name}}</span>
              <br>
              <b>Lớp</b>
              <span>{{contract.group}}</span>
              <br>
            </b-col>
            <b-col sm="6">
              <b>Ngày chụp:</b>
              <br>
              <p
                v-for="(item, index5) of contract.date_takens_attributes"
                :key="`i-${index5}`"
              >+ {{getDate(item.date_taken)}}</p>
              <b>Gói chụp cụ thể:</b>
              <br>
              <p
                v-for="(item, index6) of packages.filter(x => package_id.includes(x.id))"
                :key="`k-${index6}`"
              >+ {{item.name}}</p>
              <b>Thành tiền tạm tính:</b>
              <span>1</span>
              <br>
              <b>Đặt cọc:</b>
              <span>{{contract.deposit}}</span>
              <br>
              <b>Số dự còn lại:</b>
              <span>1</span>
              <br>
            </b-col>
          </b-row>
        </b-card>
        <b-card>
          <div slot="header" class="d-flex justify-between align-center">
            <strong>Phát sinh</strong>
            <el-button icon="el-icon-plus" circle @click="dialogFormItemVisible = true"></el-button>
          </div>
          <el-table
            :data="contract.items_attributes.filter(v => v._destroy !== 1)"
            style="width: 100%"
          >
            <el-table-column prop="name" label="Tên sản phẩm" width="150"></el-table-column>
            <el-table-column prop="price" label="Giá" width="120"></el-table-column>
            <el-table-column prop="quantity" label="Số lượng" width="120"></el-table-column>
            <el-table-column prop="content" label="Mô tả" width="150"></el-table-column>
            <el-table-column prop="total" label="Thành tiền" width="120">
              <template
                slot-scope="scope"
              >{{ parseInt(scope.row.price) * parseInt(scope.row.quantity) }}</template>
            </el-table-column>
            <el-table-column fixed="right" label="Chỉnh sửa" width="120">
              <template slot-scope="scope">
                <el-button
                  type="warning"
                  icon="el-icon-edit"
                  circle
                  @click="editItem(scope.row.id)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="deteteItem(scope.row.id)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </b-card>
        <el-button
          class="full-width"
          type="success"
          @click="handleSubmit"
          plain
        >{{this.id ? 'Sửa' : 'Tạo'}} hợp đồng</el-button>
        <br>
        <el-button class="full-width" type="danger" plain>Hủy</el-button>
      </b-col>
    </b-row>
    <el-dialog
      :title="`Tạo lịch trình cho ngày ${getDate(planDate)}`"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="plan">
        <el-form-item label="Nội dung" :label-width="formLabelWidth">
          <el-input v-model="plan.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Địa điểm" :label-width="formLabelWidth">
          <el-input v-model="plan.place" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Thời gian" :label-width="formLabelWidth">
          <el-time-select
            class="w-100 input-contract input-contract--time"
            v-model="plan.plan_time"
            :picker-options="{
            start: '00:00',
            step: '00:30',
            end: '23:00'
          }"
            placeholder="Select time"
          ></el-time-select>
        </el-form-item>
        <el-form-item label="Loại đồ" :label-width="formLabelWidth">
          <el-select multiple placeholder v-model="plan.costume" class="input-contract w-100">
            <el-option
              v-for="(dp, index7) in dateProperty"
              :key="`l-${index7}`"
              :label="dp.name"
              :value="dp.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Thoát</el-button>
        <el-button type="primary" @click="addPlan(planDate, plan)">Tạo Plan</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Phát sinh" :visible.sync="dialogFormItemVisible">
      <el-form :model="formItem">
        <el-form-item label="Tên" :label-width="formLabelWidth">
          <el-input v-model="formItem.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="formItem">
        <el-form-item label="Đơn giá" :label-width="formLabelWidth">
          <el-input v-model="formItem.price" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="formItem">
        <el-form-item label="Số lương" :label-width="formLabelWidth">
          <el-input v-model="formItem.quantity" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="formItem">
        <el-form-item label="Mô tả" :label-width="formLabelWidth">
          <el-input v-model="formItem.content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormItemVisible = false">Thoát</el-button>
        <el-button type="primary" @click="addItem()">{{formItem.id ? 'Sửa' : 'Tạo'}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { APIService } from "../../service/apiService.js";
import { API_URL_DEV, END_POINT } from "../../service/apiRegister.js";
import { format, isSameDay } from "date-fns";
const api = new APIService();

export default {
  name: "forms",
  data() {
    return {
      //----
      blendStatus: [
        {
          value: 0,
          label: "Thu thập file sửa"
        },
        {
          value: 1,
          label: "Đang sửa"
        },
        {
          value: 2,
          label: "Up ảnh"
        },
        {
          value: 3,
          label: "Full ảnh sửa"
        }
      ],
      rawStatus: [
        {
          value: 0,
          label: "Thu thập file gốc"
        },
        {
          value: 1,
          label: "Up ảnh"
        },
        {
          value: 2,
          label: "Full ảnh gốc"
        }
      ],
      videoStatus: [
        {
          value: 0,
          label: "Thu thập video"
        },
        {
          value: 1,
          label: "Đang sửa"
        },
        {
          value: 2,
          label: "Up video"
        },
        {
          value: 3,
          label: "Full video"
        }
      ],
      clothesStatus: [
        {
          value: 0,
          label: "Chưa trả xong"
        },
        {
          value: 1,
          label: "Trả hết trang phục"
        }
      ],
      paymentStatus: [
        {
          value: 0,
          label: "Chưa đặt cọc"
        },
        {
          value: 1,
          label: "Đặt cọc"
        },
        {
          value: 2,
          label: "Chưa thanh toán đủ"
        },
        {
          value: 3,
          label: "Đã thanh toán"
        }
      ],
      printStatus: [
        {
          value: 0,
          label: "Xử lý File"
        },
        {
          value: 1,
          label: "In ảnh xong, chờ giao"
        },
        {
          value: 2,
          label: "Đã giao ảnh"
        }
      ],
      formLabelWidth: "120px",
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
      dialogFormItemVisible: false,
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
      staticProperty: [
        { name: "Đồng phục đi học" },
        { name: "Trang phục tự do" },
        { name: "Trang phục áo lớp" }
      ],
      photographersMore: [],
      roles: [
        "Photo Leader",
        "Photo Portrait",
        "Camera Man",
        "Fresher",
        "Decorator"
      ],
      plans: [],
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
      contract: {
        name: "",
        group: "",
        image_status: 0,
        print_status: 0,
        payment_status: 0,
        clothes_status: 0,
        raw_status: 0,
        video_status: 0,
        school_id: "",
        note: "",
        secret_key: "",
        phone: "",
        address: "",
        type: "",
        label: "",
        total_member: "",
        male_number: "",
        female_number: "",
        deposit: "",
        budgets_attributes: [],
        histories_attributes: [
          {
            date_history: "",
            content: "",
            note: ""
          }
        ],
        items_attributes: [],
        date_takens_attributes: [
          {
            date_taken: "",
            plans_attributes: [],
            photographer_date_takens_attributes: []
          }
        ],
        members_attributes: [
          {
            name: null,
            phone_number: null,
            link_facebook: null,
            gender: null,
            address: null
          }
        ]
      },
      //----
      selected: [], // Must be an array reference!
      show: true,
      options: [
        {
          value: "Option1",
          label: "Option1"
        },
        {
          value: "Option2",
          label: "Option2"
        },
        {
          value: "Option3",
          label: "Option3"
        },
        {
          value: "Option4",
          label: "Option4"
        },
        {
          value: "Option5",
          label: "Option5"
        }
      ],
      value: "",
      options3: [
        {
          label: "Popular cities",
          options: [
            {
              value: "Shanghai",
              label: "Shanghai"
            },
            {
              value: "Beijing",
              label: "Beijing"
            }
          ]
        },
        {
          label: "City name",
          options: [
            {
              value: "Chengdu",
              label: "Chengdu"
            },
            {
              value: "Shenzhen",
              label: "Shenzhen"
            },
            {
              value: "Guangzhou",
              label: "Guangzhou"
            },
            {
              value: "Dalian",
              label: "Dalian"
            }
          ]
        }
      ],
      value7: "",
      reverse: true,
      activities: [
        {
          content: "Event start",
          timestamp: "2018-04-15"
        },
        {
          content: "Approved",
          timestamp: "2018-04-13"
        },
        {
          content: "Success",
          timestamp: "2018-04-11"
        }
      ],
      propetyTemp: [],
      formItem: {
        id: null,
        name: null,
        price: null,
        quantity: null,
        content: ""
      },
      itemDataTable: [],
      itemIndex: 1
    };
  },
  filters: {
    dateFormat: function(value) {
      if (!value) return "";
      return format(new Date(value), "DD/MM");
    },
    timeFormat: function(value) {
      if (!value) return "";
      return format(new Date(value), "hh:mm");
    }
  },
  methods: {
    openPlanDialog(date) {
      this.planDate = date.date_taken;
      this.dialogFormVisible = true;
    },
    handleSubmit() {
      this.loading = true;
      this.contract.date_takens_attributes.forEach(v => {
        v.plans_attributes.forEach(p => {
          p.costume = p.costume.join(", ");
          p.plan_time = new Date(
            format(new Date(v.date_taken), "YYYY/MM/DD") + " " + p.plan_time
          );
        });
      });
      this.packages.forEach(v => {
        if (this.package_id.includes(v.id)) {
          this.contract.budgets_attributes.push({
            id: this.setBudgetsID(v.id, "Package"),
            budgetable_type: "Package",
            budgetable_id: v.id,
            price: v.price
          });
        }
      });
      this.properties.forEach(v => {
        if (
          this.propetyTemp.includes(v.id) &&
          !this.propertyMore.includes(v.id)
        ) {
          this.contract.budgets_attributes.push({
            id: this.setBudgetsID(v.id, "Property"),
            budgetable_type: "Property",
            budgetable_id: v.id,
            price: v.price,
            _destroy: "1"
          });
        } else if (this.propertyMore.includes(v.id)) {
          this.contract.budgets_attributes.push({
            id: this.setBudgetsID(v.id, "Property"),
            budgetable_type: "Property",
            budgetable_id: v.id,
            price: v.price,
            _destroy: "0"
          });
        }
      });
      this.contract.items_attributes = this.contract.items_attributes.map(v => {
        return {
          id: /id/.test(v.id) ? "" : v.id,
          name: v.name,
          price: v.price,
          quantity: v.quantity,
          content: v.content,
          _destroy: v._destroy
        };
      });
      if (!this.id) {
        api.post([END_POINT.contracts], this.contract).then(
          data => {
            this.loading = false;
            this.$router.push("/contracts");
          },
          err => {
            this.loading = false;
          }
        );
      } else {
        api.put([END_POINT.contracts, this.id], this.contract).then(
          data => {
            this.loading = false;
            this.$router.push(`/contracts/${this.id}/show`);
          },
          err => {
            this.loading = false;
          }
        );
      }
    },
    handleDelete() {
      api.delete([END_POINT.contracts, this.id]).then(
        data => {
          this.loading = false;
          this.$router.push(`/contracts`);
        },
        err => {
          this.loading = false;
        }
      );
    },
    addPlan(date, plan) {
      this.contract.date_takens_attributes.forEach(v => {
        if (this.compareDate(date, v.date_taken)) {
          v.plans_attributes.push(plan);
        }
      });

      this.plan = {
        id: null,
        plan_time: "08:00",
        content: null,
        places: null,
        costume: [],
        _destroy: 0
      };
      this.planDate = null;
      this.dialogFormVisible = false;
    },
    deletePlan(dateIndex, planIdex) {
      this.contract.date_takens_attributes[dateIndex].plans_attributes[
        planIdex
      ]._destroy = 1;
      this.$forceUpdate();
    },

    addDate() {
      this.contract.date_takens_attributes.push({
        date_taken: "",
        plans_attributes: [],
        photographer_date_takens_attributes: []
      });
    },
    deleteDate(index, date) {
      this.loading = true;
      this.contract.date_takens_attributes.splice(index, 1);
      if ((this.id, date.id)) {
        api
          .delete([
            END_POINT.contracts,
            this.id,
            END_POINT.date_takens,
            date.id
          ])
          .then(result => {
            this.convertData(result.contract);
            this.loading = false;
          });
      }
      if (this.contract.date_takens_attributes.length === 0) {
        this.contract.date_takens_attributes = [
          {
            date_taken: "",
            plans_attributes: [],
            photographer_date_takens_attributes: []
          }
        ];
      }
      this.loading = false;
    },
    addPhotographers(date) {
      this.contract.date_takens_attributes.forEach(v => {
        if (this.compareDate(v.date_taken, date)) {
          v.photographer_date_takens_attributes.push({
            id: null,
            photographer_id: null,
            photographer_role: null,
            _destroy: 0
          });
        }
      });
    },
    deletePhotographers(dateIndex, planIdex) {
      this.contract.date_takens_attributes[
        dateIndex
      ].photographer_date_takens_attributes[planIdex]._destroy = 1;
      this.$forceUpdate();
    },
    checkDate(date) {
      return date ? false : true;
    },

    compareDate(d1, d2) {
      return isSameDay(new Date(d1), new Date(d2));
    },
    setPropety(e) {
      this.subProperty = [];
      const subPackage = this.packages.filter(v => e.includes(v.id));
      this.priorities = subPackage.map(x => x.priority);
      if (subPackage.length > 0) {
        subPackage.forEach(x => {
          this.subProperty = [...this.subProperty, ...x.properties];
        });
      }
      this.setDateProperty();
    },
    setMorePropety(e) {
      console.log(this.propertyMore);
      this.addProperty = [];
      this.properties.forEach(v => {
        if (this.propertyMore.includes(v.id)) {
          this.addProperty.push(v);
        }
      });
      this.setDateProperty();
    },
    setDateProperty() {
      if (this.addProperty.length > 0 || this.subProperty.length > 0) {
        this.dateProperty = [
          ...this.addProperty,
          ...this.subProperty,
          ...this.staticProperty
        ];
      }
    },
    setBudgetsID(id, type) {
      if (this.id) {
        const budgetable = this.budgets.find(
          v => v.budgetable_id === id && v.budgetable_type === type
        );
        return budgetable ? budgetable.id : null;
      }
      return null;
    },
    convertData(data) {
      this.contract.name = data.name;
      this.contract.group = data.group;
      this.contract.phone = data.phone;
      this.contract.note = data.note;
      this.contract.address = data.address;
      this.contract.label = data.label;
      this.contract.total_member = data.total_member;
      this.contract.male_number = data.male_number;
      this.contract.female_number = data.female_number;
      this.contract.deposit = data.deposit;
      this.contract.school_id = data.school_id;
      this.contract.secret_key = data.secret_key;
      this.contract.video_status = data.video_status;
      this.contract.clothes_status = data.clothes_status;
      this.contract.payment_status = data.payment_status;
      this.contract.image_status = data.image_status;
      this.contract.print_status = data.print_status;
      this.contract.raw_status = data.raw_status;
      this.contract.items_attributes = data.items;
      this.budgets = data.budgets;
      if (data.packages.length > 0) {
        this.package_id = data.packages.map(x => x.id);
      }
      this.setPropety(this.package_id);
      if (data.properties && data.properties.length > 0) {
        data.properties.forEach(v => {
          this.propertyMore.push(v.id);
          this.propetyTemp.push(v.id);
        });
        this.setMorePropety();
      }

      if (data.member) {
        this.contract.members_attributes = [];
        this.contract.members_attributes.push(data.member);
      }
      if (data.date_takens) {
        this.contract.date_takens_attributes = [];
        data.date_takens.forEach(v => {
          this.contract.date_takens_attributes.push({
            id: v.id,
            date_taken: v.date_taken,
            plans_attributes: v.plans,
            photographer_date_takens_attributes: v.photographer_date_takens
          });
        });
        this.contract.date_takens_attributes.forEach(v => {
          v.plans_attributes.forEach(p => {
            p.costume = p.costume ? p.costume.split(", ") : [];
            p.plan_time = format(new Date(p.plan_time), "HH:mm");
          });
        });
      }
      if (this.contract.date_takens_attributes.length === 0) {
        this.contract.date_takens_attributes = [
          {
            date_taken: "",
            plans_attributes: [],
            photographer_date_takens_attributes: []
          }
        ];
      }
      this.$forceUpdate();
    },
    updateDateTaken(e, index, id) {
      this.contract.date_takens_attributes[index];
      this.contract.date_takens_attributes[index].date_taken = new Date(e);
    },

    test() {},
    getDate(value) {
      if (!value) return "";
      return format(new Date(value), "DD/MM");
    },
    addItem() {
      this.dialogFormItemVisible = false;
      if (this.formItem.id) {
        this.contract.items_attributes.forEach(v => {
          if (v.id === this.formItem.id) {
            v.name = this.formItem.name;
            v.price = this.formItem.price;
            v.quantity = this.formItem.quantity;
            v.content = this.formItem.content;
          }
        });
      } else {
        this.itemIndex += 1;
        this.contract.items_attributes.push({
          id: `id${this.itemIndex}`,
          name: this.formItem.name,
          price: this.formItem.price,
          quantity: this.formItem.quantity,
          content: this.formItem.content,
          _destroy: 0
        });
      }
      this.formItem = {
        name: null,
        price: null,
        quantity: null,
        content: null
      };
    },
    deteteItem(id) {
      if (/id/.test(id)) {
        this.contract.items_attributes.forEach((v, i) => {
          if (v.id === id) {
            this.contract.items_attributes.splice(i, 1);
          }
        });
      } else {
        this.contract.items_attributes.forEach((v, i) => {
          if(v.id === id){
            v._destroy = 1;
          }
        });
      }
    },
    editItem(id) {
      this.dialogFormItemVisible = true;
      this.contract.items_attributes.forEach(v => {
        if (v.id === id) {
          this.formItem = {
            id: v.id,
            name: v.name,
            price: v.price,
            quantity: v.quantity,
            content: v.content
          };
        }
      });
    }
  },
  mounted() {
    window.onbeforeunload = () => {
      return "If you resubmit this page, progress will be lost.";
    };
    this.id = this.$router.history.current.params.id;
    api
      .multipeGets([
        END_POINT.schools,
        END_POINT.packages,
        END_POINT.properties,
        END_POINT.photographers
      ])
      .then(data => {
        this.schools = data[0].schools;
        this.packages = data[1].packages;
        this.properties = data[2].properties;
        this.photographers = data[3].photographers;
      });
    if (this.id) {
      api.get([END_POINT.contracts, this.id]).then(data => {
        this.convertData(data.contract);
      });
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
</style>
