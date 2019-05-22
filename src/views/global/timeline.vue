<template>
  <div>
    <el-timeline v-if="datePlan.plans_attributes" style="width: 80%; margin-top: 15px">
      <el-timeline-item
        v-for="(plan, ip) in datePlan.plans_attributes"
        :key="`h-${ip}`"
        :timestamp="datePlan.date_taken | dateFormat">
        <div v-if="plan._destroy !== 1">
          <b>{{plan.plan_time}}</b>
          : {{plan.content}}<i class="el-icon-delete" v-if="canDelete" @click="deletePlan(pos, ip)"></i><br>
          <span><b>Tập trung:</b> {{plan.place}}</span><br>
          <span><b>Trang phục:</b> {{plan.costume[0]}}</span>
        </div>
      </el-timeline-item>
    </el-timeline>
    <el-timeline v-else style="width: 80%; margin-top: 15px">
      <el-timeline-item
        v-for="(plan, ip) in datePlan.plans"
        :key="`a-${ip}`"
        :timestamp="plan.plan_time | dateFormat">
        <div v-if="plan._destroy !== 1">
          <b>{{plan.plan_time | timeFormat}}</b>
          : {{plan.content}}<br>
          <span><b>Tập trung:</b> {{plan.place}}</span><br>
          <span><b>Trang phục:</b> {{plan.costume}}</span>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  props: ['datePlan', 'canDelete', 'pos'],
  data () {
    return {
      reverse: true
    }
  },
  methods: {
    deletePlan(dateIndex, planIdex) {
      this.$emit('deletePlan', {dateIndex: dateIndex, planIdex: planIdex})
    }
  }
}
</script>

<style scoped>
.el-icon-delete {
  padding: 10px;
}
</style>
