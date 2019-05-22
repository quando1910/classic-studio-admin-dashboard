<template>
  <div>
    <b-row>
      <b-col sm="7" xs="12">
        <b-card v-if="pictureView">
          <div slot="header">
            <strong>Tab chọn ảnh</strong>
          </div>
          <div>
            <el-input
              placeholder="Điền tên ảnh vào đây"
              v-model="searchName"
              clearable>
            </el-input>
            <hr>
            <div class="choose-box grid-content bg-purple-light">
              <el-tabs type="card" @tab-click="handleClick">
                <el-tab-pane :label="`Trang ${i} - ${pictureView.pic[i-1].pictureId.split(',').length} ảnh`" v-for="i of 2" :key="i">
                  <c-library :pics="pictureView.pic[i-1]" @choosePicAction="choosePicAction"/>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col sm="5" xs="12">
        <b-card>
          <div slot="header">
            <strong>Chi tiết lựa ảnh trong hợp đồng</strong>
          </div>
          <div>
            <b-form-group>
              <label for="name"><b>List ảnh đã chọn:</b></label><br>
              <div class="picture-choose"
                v-for="(item, index) of chooseImage" 
                :key="index">
                <el-row>
                  <el-col :span="10">
                    <el-image
                    style="width: 150px; height: 150px"
                    :src="item.id | smallGoogleImage"
                    :fit="'contain'"/>
                  </el-col>
                  <el-col :span="14">
                    <span class="image-name">{{index + 1}}. Tên ảnh: <b>{{item.name}}</b></span><br>
                    <span class="image-name">Số lượng: <input style="width: 50px" @change="statistics(chooseImage)" v-model="item.quantity"/>
                      </span><br>
                    <span class="image-name">Chọn thể thức in:
                      <el-select v-model="item.print" placeholder="thể thức in" @change="statistics(chooseImage)">
                        <el-option
                          v-for="it in options"
                          :key="it.value"
                          :label="`${it.name} - ${it.price}`"
                          :value="it">
                        </el-option>
                      </el-select></span><br>
                    <span class="image-name" v-if="item.print">Giá in: <b>{{item.print.price | dateMoney}} VND <i v-if="item.print.value === 1">hoặc FREE</i></b></span>
                  </el-col>
                </el-row>
              </div>
            </b-form-group>
            <b-form-group>
              <label for="name"><b>Số ảnh free:</b></label>
              3 
              <el-popover
                placement="top-start"
                width="250"
                trigger="hover"
                content="Ảnh studio free là ảnh thường size 13x18">
                <el-button slot="reference" circle size="mini"><i class="el-icon-info"></i></el-button>
              </el-popover>
            </b-form-group>
            <b-form-group>
              <label for="name"><b>List ảnh bạn chọn:</b></label>
              <el-table
                :data="convertImages"
                border
                style="width: 100%">
                <el-table-column
                  prop="size"
                  label="Size"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="nameList"
                  label="List ảnh"
                  width="150">
                  <template slot-scope="scope">
                    <p v-for="(item,index) of scope.row.nameList" :key="index">{{item}}</p>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="quantity"
                  label="Số lượng">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="Thành tiền"
                  width="180">
                </el-table-column>
              </el-table>
            </b-form-group><hr>
            <b-form-group>
              <label for="name"><b>Tổng tiền phát sinh:</b></label>
            </b-form-group><hr>
          </div>
        </b-card>
        <el-button
          class="full-width"
          type="success"
          @click="handleSubmitPrint"
          plain
        >Đăng ký ảnh in</el-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import { APIService } from "../../service/apiService.js";
import { API_URL_DEV, END_POINT } from "../../service/apiRegister.js";

const api = new APIService();

export default {
    data() {
      return {
        preventLoad: false,
        searchName: null,
        currentPage: 0,
        convertImages: [],
        convertImage: {
          size: '',
          nameList: [],
          quantity: 0,
          price: 0
        },
        options: [
          {
            name: '13x18 thường',
            price: 7000,
            value: 1
          },
          {
            name: '13x18 ép lụa',
            price: 10000,
            value: 2
          },
          {
            name: '20x30 có khung',
            price: 60000,
            value: 3
          },
          {
            name: '40x60 có khung',
            price: 100000,
            value: 4
          }
        ],
        listID: [],
        chooseImage: [],
        tableData: [{
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }],
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        pictureView: null
      }
    },
    computed: {
      ...mapGetters({
        people: 'people'
      })
    },
    watch: {
      searchName: function(value) {
        console.log(this.pictureView.pic.reduce((sum, curr) => {
          console.log(sum, curr);
          sum.name = `${sum.name},${curr.name}`;
          // sum.pictureId = `,${curr.pictureId}`;
        }, {name:'', pictureId: ''}));
        // this.pictureView.pic.map(x => x.)
      }
    },
    methods: {
      handleClick(tab, event) {
        this.currentPage = tab.index;
        this.listID = this.pictureView.pic[tab.index].pictureId.split(',').slice(0, this.numberPic);
      },
      choosePicAction(e) {
        if(e.action == 'add') {
          this.chooseImage.push({id: e.id, name: e.name, quantity: 1})
        } else if(e.action == 'delete') {
          this.chooseImage = this.chooseImage.filter(x => x.id !== e.id);
        }
      },
      statistics() {
        this.convertImages = [];
        this.options.forEach(item => {
          const obj = this.chooseImage.filter(x => x.print && item.value === x.print.value);
          if (obj.length > 0) {
            this.convertImage.size = item.name;
            this.convertImage.price = item.price;
            this.convertImage.nameList = obj.map(x => x.name);
            this.convertImage.quantity = obj.reduce((sum,x) => sum + +x.quantity, 0);
            this.convertImages.push(this.convertImage);
            this.convertImage = {
              size: '',
              nameList: [],
              quantity: 0,
              price: 0
            }
          }
        })
      },
      handleSubmitPrint() {

      }
    },
    mounted() {
      api.get([`http://manage.theclassic.studio/api/viewers/${this.people.code}`]).then(
        data => {
          this.pictureView = data.meta;
        },
        err => {
          this.loading = false;
        }
      );
    }
  }
</script>

<style>
.choose-image {
  margin: 7px;
  border-radius: 10px;
}
.choose-image-box {
  float: left;
}
.image-name {
  font-size: 0.9rem;
}
.el-icon-success {
  color: #67c23a;
}
.el-image__error, .el-image__inner {
  border-radius: 7px;
}
.picture-choose {
  display: flex;
  margin-bottom: 10px;
}
</style>
