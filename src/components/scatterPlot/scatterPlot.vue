<template>
  <div id="scatterPlot"></div>
</template>
<script>
export default {
  name: 'scatterPlot',
  data() {
    return {
      data: []
    }
  },
  created() {
    this.setData()
  },
  mounted() {
    this.init() 
  },
  methods: {
    setData() {
      let person = {}
      for(let i=0; i< 500; i++) {
        let height = Math.random() * 50 + 150
        let ratio = Math.random() * 0.2 + 0.8
        person = {
          gender: 'male',
          height: parseInt(height),
          weight: parseInt(height * ratio - 60 )
        }
        this.data.push(person)
      }
    },
    init() {
      let scatterPlot = this.$echarts.init(document.querySelector('#scatterPlot'))
      let axisData = []
      for(let i=0;i<this.data.length;i++) {
        let arr = [this.data[i].height,this.data[i].weight]
        axisData.push(arr)
      }
      let option = {
        xAxis: {
          type: 'value',
          scale: true,
        },
        yAxis: {
          type: 'value',
          scale: true,
        },
        grid: { // 网格
          show: true,
          left: "50%",
          top: 200,
          borderWidth: 2,
          borderColor: '#ff3322',
          width: 500,
          height: 300
        },
        series: [
          {
            // type: 'scatter', // 散点图
            type: 'effectScatter', // 水波纹散点图
            showEffectOn: 'emphasis', // render emphasis
            rippleEffect: {
              scale: 10
            },
            data: axisData,
            symbolSize: function(params) {
              if(params[1] / ((params[0] / 100) * (params[0] / 100)) > 35) {
                return 10
              } else return 5
            },
            itemStyle: {
              color: function(params) {
                if(params.data[1] / ((params.data[0] / 100) * (params.data[0] / 100)) > 35) {
                  return 'red'
                } else return 'blue'
              }
            }
          }
        ]
      }
      scatterPlot.setOption(option)
    }
  }
}
</script>
<style scoped>
#scatterPlot {
  width: 100%;
  height: 100vh;
}
</style>