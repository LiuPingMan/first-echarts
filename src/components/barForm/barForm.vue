<template>
  <div ref="barForm" id="barForm">
    1111
  </div>
</template>
<script>
export default {
  name: 'barForm',
  data() {
    return {

    } 
  },
  mounted() {
    console.log(11111111111);
    this.init()
  },
  methods: {
    init() {
      let chart = this.$echarts.init(document.querySelector('#barForm'))
      let option = {
        xAxis: {
          type: 'category',
          data: ['小明', '小红', '小马']
        },
        yAxis: {
          type: 'value'
        },
        series: {
          name: '语文',
          type: 'bar',
          data: [70, 97, 67]
        }
      }
      chart.setOption(option)
    }
  }
}
</script>
<style scoped>
#barForm {
  width: 400px;
  height: 400px;
}
</style>