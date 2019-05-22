<template>
  <section id="contract" class="show-out">
    <div class="title-button m-b-10">
      <el-row class="w-100">
        <el-col :span="21">
          <h3>Đối tác</h3>
        </el-col>
        <el-col :span="3">
          <el-button class="to-the-right" @click="dialogFormVisible= true" type="primary" plain>Tạo đối tác</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i>Danh sách thiếu đồ</span>
          <partner-hire/>
        </el-tab-pane>
        <el-tab-pane label="Danh sách thiếu nợ">Danh sách thiếu nợ</el-tab-pane>
        <el-tab-pane label="Danh sách tổng">
          <partner-all/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>

<script>
import PartnerAll from './PartnerListAll.vue';
import PartnerHire from './PartnerListHire.vue';

export default {
  data() {
    return {
      activeName: 'first'
    };
  },
  components: {
    PartnerAll,
    PartnerHire
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style>

</style>
