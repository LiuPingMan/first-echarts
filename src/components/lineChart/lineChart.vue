<template>
  <div id="lineChart">

  </div>
</template>
<script>
export default {
  name: 'lineChart',
  data() {
    return {

    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let lineChart = this.$echarts.init(document.querySelector('#lineChart'))
      let xDataArr = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', ]
      let yDataArr = [2000,3000,1200,3500,2300,3400,3000,3200,2200,2500,4300,1400]
      let option = {
        xAxis: {
          type: 'category',
          data: xDataArr,
          boundaryGap: false, // 紧挨边缘
        },
        yAxis: {
          type: 'value',
          scale: true
        },
        series: [
          {
            name: '康师傅',
            data: yDataArr,
            type: 'line',
            markPoint: {
              data: [
                {type: 'max'},
                {type: 'min'}
              ]
            },
            markLine: {
              data: [
                {type: 'average'}
              ]
            },
            markArea: { // 标记域
              data: [
                [
                  {
                    xAxis: '1月'
                  }, 
                  {
                    xAxis: '3月'
                  },
                ],
                [
                  {
                    xAxis: '7月'
                  },
                  {
                    xAxis: '9月'
                  },
                ]
              ]
            },
            smooth: true,// 平滑
            lineStyle: { // 线条样式
              color: 'green',
              type: 'dotted',// solid,dashed
            },
            areaStyle: { // 填充样式
              color: 'pink'
            }
          }
        ]
      }
      lineChart.setOption(option)
    }
  }
}
</script>
<style scoped>
#lineChart {
  width: 100%;
  height: 100vh;
}
</style>