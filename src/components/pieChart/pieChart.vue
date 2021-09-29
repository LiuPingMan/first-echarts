<template>
  <div class="pieChart">

  </div>
</template>
<script>
export default {
  name:'pieChart',
  data() {
    return {}
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let pieChart = this.$echarts.init(document.querySelector('.pieChart'))
      let pieData = [
        {
          name: '唯品会',
          value: 2334
        },
        {
          name: '京东',
          value: 4200
        },
        {
          name: '淘宝',
          value: 3990
        },
        {
          name: '1号店',
          value: 5699
        },
        {
          name: '聚美优品',
          value: 3340
        }
      ]
      let option = {
        series: [
          {
            type: 'pie',
            data: pieData,
            label: {
              show: true,
              formatter: function(params) {
                return params.name + '支出￥' + params.value + '\n' + params.percent + '%'
              }
            },
            // radius: 100, // 半径 
            // radius: '50%', // 参照容器高度或者宽度较小的一方
            // radius: ['50%', '70%'], // 圆环
            roseType: 'radius', // 南丁格尔图
            selectedMode: 'multiple', // 选中效果 single multiple
            selectedOffset: 50, // 选中偏移量
          }
        ]
      }
      pieChart.setOption(option)
    }
  }
}
</script>
<style scoped>
.pieChart {
  width: 800px;
  height: 400px;
}
</style>