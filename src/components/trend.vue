<template>
  <div class="com-container">
    <div class="title" :style="comStyle">
      <span>▎{{showTitle}}</span>
      <span
        class="iconfont icon-arrow-down title-icon"
        :style="comStyle"
        @click="isShowSelect = !isShowSelect"
      ></span>
      <div class="select-con" v-show="isShowSelect">
        <div 
          class="select-item"
          :style="marginStyle"
          v-for="item in selectTypes"
          :key="item.key"
          @click="handleClick(item.key)"
        >{{item.text}}</div>
      </div>
    </div>
    <div class="com-chart" ref="trend_ref"></div>
  </div>
</template>

<script>
import {getTrendData} from '@/api/seller'
export default {
  data() {
    return {
      trendData: null,
      chartInstance: null,
      isShowSelect: false,
      showType: 'map',
      titleFontSize: 0,
    }
  },
  computed: {
    // 标题下拉选项
    selectTypes() {
      if (!this.trendData) {
        return []
      } else {
        return this.trendData.type.filter( item => {
          return item.key !== this.showType
        })
      }
    },
    // 标题
    showTitle() {
      if (!this.trendData) {
        return ''
      } else {
        return this.trendData[this.showType].title
      }
    },
    // 标题字体大小
    comStyle() {
      return {
        fontSize: this.titleFontSize + 'px'
      }
    },
    // 下拉选项左对齐标题
    marginStyle() {
      return {
        marginLeft: this.titleFontSize / 1.5 + 'px'
      }
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
    // 初始化图标设置
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.trend_ref,'chalk')
      const initOption = {
        grid: {
          left: '3%',
          top: '35%',
          right: '4%',
          bottom: '1%',
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          left: 20,
          top: '15%',
          icon: 'circle'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
        },
        yAxis: {
          type: 'value'
        }
      }
      this.chartInstance.setOption(initOption)
    },
    // 获取数据
    async getData() {
      await getTrendData()
        .then(res => {
          const {data} = res
          this.trendData = data
        })
      this.updataChart()
    },
    // 更新图表
    updataChart() {
      const colorArr1 = [
        'rgba(11, 168, 44, 0.5)',
        'rgba(44, 110, 255, 0.5)',
        'rgba(22, 242, 217, 0.5)',
        'rgba(254, 33, 30, 0.5)',
        'rgba(250, 105, 0, 0.5)'
      ]
      const colorArr2 = [
        'rgba(11, 168, 44, 0)',
        'rgba(44, 110, 255, 0)',
        'rgba(22, 242, 217, 0)',
        'rgba(254, 33, 30, 0)',
        'rgba(250, 105, 0, 0)'
      ]
      const timeArr = this.trendData.common.month
      const valueArr = this.trendData[this.showType].data
      const seriesArr = valueArr.map((item, index) => {
        return {
          name: item.name,
          type: 'line',
          data: item.data,
          stack: 'map',
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0,0,0,1,[
              {
                color: colorArr1[index],
                offset: 0,
              },
              {
                color: colorArr2[index],
                offset: 1,
              },
            ])
          }
        }
      })
      const legendArr = valueArr.map(item => {
        return item.name
      })
      const dataOption = {
        xAxis: {
          data: timeArr
        },
        series: seriesArr,
        legend: {
          data: legendArr
        }
      }
      this.chartInstance.setOption(dataOption)
    },
    // 适应屏幕
    screenAdapter() {
      this.titleFontSize = this.$refs.trend_ref.offsetWidth / 100 * 3.6
      const adapterOption = {
        legend: {
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          itemGap: this.titleFontSize,
          textStyle: {
            fontSize: this.titleFontSize / 1.5
          }
        }
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    // 处理点击下拉标题
    handleClick(key) {
      this.showType = key
      this.updataChart()
      this.isShowSelect = false
    }
  }
}
</script>

<style lang="less" scoped>
  .com-container {
    position: relative;
    .title { 
      position: absolute;
      left: 20px;
      top: 20px;
      z-index: 10;
      color: white;
      .title-icon {
        margin-left: 10px;
      }
    }
    .select-con {
      background-color: #222
      ;
    }
  }
</style>