<template>
  <div>
    <b-row>
      <b-col cols="12" sm="6" lg="3">
        <b-card :no-body="true">
          <b-card-body class="p-3 clearfix">
            <i class="fa fa-cogs bg-primary p-3 font-2xl mr-3 float-left"></i>
            <div class="h5 text-primary mb-0 mt-2">20</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Số lịch trống thợ</div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" sm="6" lg="3">
        <b-card :no-body="true">
          <b-card-body class="p-3 clearfix">
            <i class="fa fa-laptop bg-info p-3 font-2xl mr-3 float-left"></i>
            <div class="h5 text-info mb-0 mt-2">$1.999,50</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Số thợ gần nhất</div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" sm="6" lg="3">
        <b-card :no-body="true">
          <b-card-body class="p-3 clearfix">
            <i class="fa fa-moon-o bg-warning p-3 font-2xl mr-3 float-left"></i>
            <div class="h5 text-warning mb-0 mt-2">$1.999,50</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" sm="6" lg="3">
        <b-card :no-body="true">
          <b-card-body class="p-3 clearfix">
            <i class="fa fa-bell bg-danger p-3 font-2xl mr-3 float-left"></i>
            <div class="h5 text-danger mb-0 mt-2">$1.999,50</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="6">
        <b-card>
          <div slot="header">
            <strong>Ngày cần chia thợ gần nhất</strong> <small></small>
            <!-- <el-button v-if="id" class="to-the-right" type="warning" icon="el-icon-delete" round @click="handleDelete"></el-button> -->
          </div>
          <div>
            <el-table v-loading="loading" :data="nearContract" style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <div class="meta-contract">
                    <p>
                      <b class="yellow"><font-awesome-icon :icon="'sun'"/></b>
                      Tổng số show: {{ props.row.contracts.length }}
                    </p>
                    <p>
                      <b class="yellow"><font-awesome-icon :icon="'graduation-cap'"/></b>
                      Thuê đồ combo: {{ props.row.contracts.map(x => x.packages.filter(x => x.kind_package === 1)[0]).filter(x => x != null).length }}</p>
                    <p>
                      <b class="yellow"><font-awesome-icon :icon="'tshirt'"/></b>
                      Thuê đồ concept: {{ props.row.city }}</p>
                    <p>
                      <b class="yellow"><font-awesome-icon :icon="'star'"/></b>
                      Chụp đêm: {{ props.row.contracts.map(x => x.packages.filter(x => x.kind_package === 2)[0]).filter(x => x != null).length }}</p>
                    <p>
                      <b class="yellow"><font-awesome-icon :icon="'video'"/></b>
                      Video: {{ props.row.contracts.map(x => x.packages.filter(x => x.kind_package === 3)[0]).filter(x => x != null).length }}</p>
                    <p>
                      <b class="yellow"><font-awesome-icon :icon="'campground'"/></b>
                      Trang trí: {{ props.row.contracts.map(x => x.packages.filter(x => x.kind_package === 4)[0]).filter(x => x != null).length }}</p>
                        <p>
                    <b class="yellow"><font-awesome-icon :icon="'id-card'"/></b>
                      Số thợ dự kiến: {{ props.row.contracts.map(x => Math.round(x.total_member/20)).reduce((x,y) => x+y) + props.row.contracts.map(x => x.packages.filter(x => x.kind_package === 3)[0]).filter(x => x != null).length }}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="ID" fixed width="60">
                <template slot-scope="scope">
                  <p>{{scope.row.date_taken | dateFormat}}</p>
                </template>
              </el-table-column>
              <el-table-column label="Tổng" width="60">
                <template slot-scope="scope">
                  <p>{{scope.row.contracts.map(x => Math.round(x.total_member/20)).reduce((x,y) => x+y) + scope.row.contracts.map(x => x.packages.filter(x => x.kind_package === 3)[0]).filter(x => x != null).length}}</p>
                </template>
              </el-table-column>
              <el-table-column label="Đã có" width="60">
                <template slot-scope="scope">
                  <p>{{scope.row.contracts.map(x => x.date_takens.filter(y => y.date_taken === scope.row.date_taken)[0].photographer_date_takens.length).reduce((x,y) => x+y)}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="Hợp đồng" width="300">
                <template slot-scope="scope">
                  <div v-for="(item, index) of scope.row.contracts" :key="index"> 
                    <router-link :to="`/contracts/${item.id}`">
                      {{item.group}} - {{item.school.name}}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
               <el-table-column
                fixed="right"
                label=""
                width="70">
                <template slot-scope="scope">
                  <el-button @click="schedulePhoto(scope.row.contracts, scope.row.date_taken)" type="text" size="small">Chia lịch</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </b-card>
      </b-col>
      <b-col sm="6">
        <b-card v-if="today">
          <div slot="header">
            <strong>Thợ chụp hôm nay</strong> <small></small>
          </div>
          <h3>{{currentDate}}</h3>
          <div v-for="(item, index) of today" :key="index"> 
            <router-link :to="`/contracts/${item.id}`">
              <p>{{item.group}} - {{item.school.name}}</p>
            </router-link>
            <el-row class="item-hover" v-for="(photo, ind) of item.photographers" :key="ind" style="padding-bottom: 10px">
              <el-col :span="2" :xs="5">
              <div class="avatar">
                <img src="https://m.media-amazon.com/images/M/MV5BMjM2OTkyNTY3N15BMl5BanBnXkFtZTgwNzgzNDc2NjE@._V1_CR132,0,761,428_AL_UY268_CR82,0,477,268_AL_.jpg" class="img-avatar" alt="">
              </div>
              </el-col>
              <el-col :span="7" :xs="14">
                <b>{{photo.user.name}}</b><br>
                <span>{{photo.photographer_role}}</span>
              </el-col>
              <el-col :span="2" :xs="5">
                <el-popover
                  placement="top-start"
                  trigger="hover"
                  :content="photo.user.phone">
                  <a slot="reference" :href="`tel: ${photo.user.phone}`"><i class="fa fa-phone" style="font-size: 30px" aria-hidden="true"></i></a>
                </el-popover>
              </el-col>
            </el-row>
            <hr>
          </div>
          <div>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
      <el-tabs type="card">
        <el-tab-pane v-for="(item, index) of setPhoto" :key="index" :label="`${item.group}-${item.school.name}`">
          <el-row>
            <el-col :span="12">
              <h4>Các thợ chụp được chọn</h4>
              <div v-if="photographers.length > 0">
                <el-row v-for="(photo, ind) of item.date_takens.filter(x => x.date_taken === chooseDate)[0].photographer_date_takens.filter(y => !ignorePhoto.includes(y.id))" :key="ind" style="padding-bottom: 10px">
                  <el-col :span="3">
                  <div class="avatar">
                    <img src="https://m.media-amazon.com/images/M/MV5BMjM2OTkyNTY3N15BMl5BanBnXkFtZTgwNzgzNDc2NjE@._V1_CR132,0,761,428_AL_UY268_CR82,0,477,268_AL_.jpg" class="img-avatar" alt="">
                  </div>
                  </el-col>
                  <el-col :span="10">
                    <b>{{photo.user.name}}</b><br>
                    <span>{{photo.photographer_role}}</span>
                  </el-col>
                  <i class="el-icon-delete" @click="removeAssign(photo.id)"></i>
                </el-row>
               </div>
              <div v-if="photographersNew.length > 0">
                <el-row  v-for="(photo, ind) of photographersNew" :key="ind" style="padding-bottom: 10px">
                  <el-col :span="3">
                  <div class="avatar">
                    <img src="https://m.media-amazon.com/images/M/MV5BMjM2OTkyNTY3N15BMl5BanBnXkFtZTgwNzgzNDc2NjE@._V1_CR132,0,761,428_AL_UY268_CR82,0,477,268_AL_.jpg" class="img-avatar" alt="">
                  </div>
                  </el-col>
                  <el-col :span="10">
                    <b>{{photo.user.name}}</b><br>
                    <span>{{photo.photographer_role}}</span>
                  </el-col>
                  <i class="el-icon-delete" @click="removeAssign(photo.id)"></i>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <h4>Chọn thợ chụp cho lớp</h4>
              <el-form :model="photoAssign">
                Ngày chụp: <b>{{chooseDate | dateFormat}}</b><br>
                Lưu ý: <br>
                <b v-if="item.packages.filter(x => x.id == 6).length">- Có chụp đêm.</b><br>
                <b v-if="item.packages.filter(x => x.id == 7 || x.id == 8).length">- Có quay video.</b>
                <el-form-item label="Thợ chụp">
                  <el-select
                    v-if="photographers"
                    v-model="photoAssign.user_id"
                    class="input-contract w-100">
                    <el-option
                      v-for="dp in photographers"
                      :key="dp.id"
                      :label="dp.name"
                      :value="dp.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Vai trò">
                  <el-select
                    placeholder
                    v-if="photoRoles"
                    v-model="photoAssign.photographer_role"
                    class="input-contract w-100">
                    <el-option
                      v-for="(a, index) in photoRoles"
                      :key="index"
                      :label="a"
                      :value="a"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-button class="full-width" style="margin-top: 20px;" type="success" @click="createPhoto(item)">Thêm thợ</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { APIService } from "../../service/apiService.js";
import { API_URL_DEV, END_POINT } from "../../service/apiRegister.js";
import { format, compareAsc, isSameDay } from "date-fns";
const api = new APIService();

export default {
  data() {
    return {
      dialogFormVisible: false,
      setPhoto: [],
      ignorePhoto: [],
      search: "",
      tableData: [],
      loading: true,
      contracts: [],
      dateContracts: [],
      chooseDate: null,
      today: null,
      nearContract: [],
      photoRoles: [
        'Senior Photographer',
        'Photographer',
        'Support',
        'CameraMan',
        'Leader',
        'MC',
        'Decorator'
      ],
      code: null,
      currentDate: new Date(),
      photographers: [],
      photographersNew: [],
      photoAssign: {
        user_id: null,
        date_taken_id: null,
        photographer_role: null
      },
    };
  },
  methods: {
    schedulePhoto(val, date) {
      this.setPhoto = val;
      this.chooseDate = date;
      this.dialogFormVisible = true;
    },
    removeAssign(val) {
      api.delete([END_POINT.photographerDateTakens, val]).then(
        data => {
          this.photographersNew = this.photographersNew.filter(x => x.id !== data.photographer_date_taken.id);
          this.ignorePhoto.push(data.photographer_date_taken.id);
        },
        err => {
          this.loading = false;
          console.log(err);
        }
      );
    },
    createPhoto(val) {
      let idDateTaken = val.date_takens.filter(x => x.date_taken === this.chooseDate)[0].id;
      this.photoAssign.date_taken_id = idDateTaken;
      api.post([END_POINT.photographerDateTakens], this.photoAssign).then(
        data => {
          this.photographersNew.push(data.photographer_date_taken);
          this.photoAssign = {
            photographer_role: null,
            user_id: null,
            _destroy: 0
          }
        },
        err => {
          this.loading = false;
          console.log(err);
        }
      );
    }
  },
  mounted() {
    api.get([END_POINT.date_takens]).then(
      data => {
        this.dateContracts = data.date_takens;
        this.nearContract = this.dateContracts.filter(x => compareAsc(new Date(x.date_taken), new Date(this.currentDate)) === 1 ).sort(compareAsc).reverse();
        this.today = this.dateContracts.filter(x => format(new Date(x.date_taken),'MM/DD/YYYY') === format(new Date(),'MM/DD/YYYY'))[0].contracts;
        this.today = this.today.map(x => {
          let photo = {
            photographers: x.date_takens.filter(x => format(new Date(x.date_taken),'MM/DD/YYYY') === format(new Date(),'MM/DD/YYYY'))[0].photographer_date_takens
          };
          return {...x, ...photo};
        });
        console.log(this.today);
        this.tableData = this.contracts;
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
    api.get([END_POINT.photographers]).then(
      data => {
        this.photographers = data.users;
      }
    );
  }
}
</script>

<style>
.img-avatar, .avatar > img, .img-circle {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.el-icon-delete {
  padding: 10px;
}
.item-hover {
  padding: 10px;
}
.item-hover:hover {
  background-color: rgba(244, 81, 30, 0.1);
  border-radius: 5px;
}
</style>
