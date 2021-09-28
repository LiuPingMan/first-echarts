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
      console.log(axisData);
      let option = {
        xAxis: {
          type: 'value',
          scale: true,
        },
        yAxis: {
          type: 'value',
          scale: true,
        },
        series: [
          {
            type: 'scatter',
            data: axisData
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