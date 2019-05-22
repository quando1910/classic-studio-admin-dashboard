<template>
  <a :href="`tel: ${phone}`">{{phone}}</a>
</template>

<script>
export default {
  props: ['phone']
}
</script>
