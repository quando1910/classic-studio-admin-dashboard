<template>
  <b-row>
    <b-col sm="8">
      <el-table v-loading="loading" :data="dateContracts" style="width: 100%" :row-class-name="tableRowClassName">
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
        <el-table-column label="ID" width="150">
          <template slot-scope="scope">
            <p>{{scope.row.date_taken | dateFormat}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Hợp đồng" width>
          <template slot-scope="scope">
            <p v-for="(item, index) of scope.row.contracts" :key="index"> 
              <b :class="item.packages.filter(x => x.kind_package === 0 || x.kind_package === 1 ).length ? 'yellow' : ''">
                <font-awesome-icon :icon="'sun'"/>
                <font-awesome-icon v-if="item.packages.filter(x => x.kind_package === 1 ).length" :icon="'graduation-cap'"/>
              </b>
              <b :class="item.packages.filter(x => x.kind_package === 2).length ? 'orange' : ''"><font-awesome-icon :icon="'star'"/></b>
              <b :class="item.packages.filter(x => x.kind_package === 3).length ? 'red' : ''"><font-awesome-icon :icon="'video'"/></b>
              <b :class="item.packages.filter(x => x.kind_package === 4).length ? 'green' : ''"><font-awesome-icon :icon="'campground'"/></b>
              {{item.group}} - {{item.school.name}} </p>
          </template>
        </el-table-column>
      </el-table>
    </b-col>
    <b-col sm="4">
    </b-col>
  </b-row>
</template>

<script>
import { APIService } from "../../service/apiService.js";
import { API_URL_DEV, END_POINT } from "../../service/apiRegister.js";
import { format, compareAsc, isSameDay } from "date-fns";
const api = new APIService();

export default {
  data() {
    return {
      search: "",
      tableData: [],
      loading: true,
      contracts: [],
      dateContracts: [],
      code: null,
      currentDate: new Date()
    };
  },
  filters: {
    dateFormat: function(value) {
      if (!value) return "";
      return format(new Date(value), "DD/MM");
    },
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      var result = compareAsc(
        new Date(row.date_taken),
        new Date(this.currentDate)
      )
      if (result !== -1) {
        return 'warning-row';
      }
      return '';
    },
    getDate(value) {
      if (!value) return "";
      return format(new Date(value), "DD/MM");
    }
  },
  mounted() {
    api.get([END_POINT.date_takens]).then(
      data => {
        this.dateContracts = data.date_takens;
        this.tableData = this.contracts;
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }
}
</script>

<style lang="scss">
  .expanded {
    background-color: #FFDEAD;
  }
  .el-table .el-table__expanded-cell {
    background-color: #FAFAD2;
  }
  .red {
    color: #d6336c;
  }
  .yellow {
    color: #f2b911;
  }
  .orange {
    color: #f77e05;
  }
  .green {
    color: #82b440
  }
   .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
