<template>
  <div class="com-container">
    <div class="com-chart" ref="trend_ref"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.trend_ref)
      const initOption = {

      }
      this.chartInstance.setOption(initOption)
    },
    async getData() {
      this.updataChart()
    },
    updataChart() {
      const dataOption = {

      }
      this.chartInstance.setOption(dataOption)
    }
  }
}
</script>

<style>

</style>