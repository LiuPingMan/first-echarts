<template>
  <div class="com-container" @dblclick="revertMap">
    <div class="com-chart" ref="map_ref"></div>
  </div>
</template>

<script>
import { getMap} from '@/api/map'
import { getPositionData } from '@/api/seller'
import { getProvinceMapInfo } from '@/utils/map_utils'
export default {
  data() {
    return {
      chartInstance: null,
      mapData: null,
      titleFontSize: 0,
      mapArr: []
    }
  },
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref, 'chalk')
      await this.getMapData('/static/map/china.json')
      this.$echarts.registerMap('china', this.mapData)
      const initOption = {
        title: {
          text: '▎商家分布',
          left: '5%',
          top: '5%'
        },
        geo: {
          type: 'map',
          map: 'china',
          top: '5%',
          bottom: '5%',
          itemStyle: {
            areaColor: '#2E72BF',
            boderColor: '#333'
          }
        },
        legend: {
          left: '5%',
          bottom: '5%',
          orient: 'vertical'
        },
      }
      this.chartInstance.setOption(initOption)
      this.chartInstance.on('click',  async (e) => {
        let {key, path} = getProvinceMapInfo(e.name)
        if (!key) return
        if (!this.mapArr[key]) {
          await this.getMapData(path)
          this.mapArr[key] = this.mapData
        } else {
          this.mapData = this.mapArr[key]
        }
        this.$echarts.registerMap(key, this.mapData)
        const changeOption = {
          geo: {
            map:key
          }
        }
        this.chartInstance.setOption(changeOption)
      })
    },
    async getData() {
      await getPositionData()
        .then(res => {
          const {data} = res
          this.positionData = data
        })
      this.updateChart()
    },
    updateChart() {
      const legendArr = this.positionData.map(item => {
        return item.name
      })
      const seriesArr = this.positionData.map(item => {
        return {
          type: 'effectScatter',
          rippleEffect: {
            scale: 5,
            brushType: 'stroke'
          },
          name: item.name,
          data: item.children,
          coordinateSystem: 'geo'
        }
      });
      const dataOption = {
        legend: {
          data:legendArr
        },
        series: seriesArr
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter() {
      this.titleFontSize = this.$refs.map_ref.offsetWidth / 100 * 3.6
      const adapterOption = {
        legend: {
          itemWidth: this.titleFontSize / 2,
          itemWidth: this.titleFontSize / 2,
          itemGap: this.titleFontSize / 2,
          textStyle: {
            fontSize: this.titleFontSize / 2
          }
        },
        title: {
          textStyle: {
            fontSize: this.titleFontSize / 2
          }
        }
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    async getMapData(path) {
      await getMap(path)
        .then(res => {
          this.mapData = res.data
        })
    },
    revertMap() {
      const changeOption = {
        geo: {
          map: 'china',
        }
      }
      this.chartInstance.setOption(changeOption)
    }
  }
}
</script>

<style>

</style>