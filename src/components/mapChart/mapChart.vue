<template>
  <div id="mapChart"></div>
</template>
<script>
import { getMap,} from '@/api/map'
export default {
  name: 'mapChart',
  data() {
    return {
      mapData: "",
      airData: [],
      scatterData: [
        {
          value: [117, 31]
        }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {  
    async init() {
      let mapChart = this.$echarts.init(document.querySelector('#mapChart'))
      mapChart.showLoading()
      await this.getMapData()
      mapChart.hideLoading()
      this.$echarts.registerMap("chinaMap", this.mapData)
      let option = {
        geo: {
          type: "map",
          map: "chinaMap",
          roam: true, // 鼠标滚轮缩放
          label: { // 显示名称
            show: true
          },
          zoom: 1.2,// 初始大小比例
          // center: [87,43],// 中心点的坐标
        },
        series: [
          {
            data: this.airData,
            geoIndex: 0, // 将空气质量的数据和第0个geo配置关联在一起
            type: 'map',
          },
          {
            data: this.scatterData,
            type: 'effectScatter',
            coordinateSystem: 'geo',
            rippleEffect: {
              scale: 6,
              color: 'white'
            },
            geoIndex: 0
          }
        ],
        visualMap: {
          min: 0,
          max: 300,
          inRange: {
            color: ['white','red'], // 渐变颜色
          },
          calculable: true, // 滑块筛选
        }
      }
      mapChart.setOption(option)
    },
    async getMapData() {
      await getMap('/china.json')
        .then(res => {
          this.mapData = res.data
          console.log(res.data);
          res.data.features.forEach(item => {
            this.airData.push({
              name: item.properties.name,
              value: parseInt(Math.random() * 300)
            })
          });
        })
    } 
  }
}
</script>
<style scoped>
#mapChart{
  width: 800px;
  height: 600px;
  border: 1px solid black;
}
</style>