<template>
  <div class="radarChart"></div>
</template>
<script>
export default {
  name: 'radarChart',
  data() {
    return {
      dataMax: [
        {
          name: '拍照',
          value: 100,
        },
        {
          name: '散热',
          value: 100,
        },
        {
          name: '续航',
          value: 100,
        },
        {
          name: '外观',
          value: 100,
        },
        {
          name: '材料',
          value: 100,
        },
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let radarChart = this.$echarts.init(document.querySelector('.radarChart'))
      let option = {
        radar: {
          indicator: this.dataMax,
          shape: 'circle',// 最外层形状 circle polygon
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                name: '华为手机',
                value: [67,89,79,83,87]
              },
              {
                name: '小米手机',
                value: [56,78,69,80,84]
              }
            ],
            areaStyle: {},// 阴影面积
          }
        ]
      }
      radarChart.setOption(option)
    }
  }
}
</script>
<style scoped>
.radarChart {
  width: 800px;
  height: 800px;
}
</style>