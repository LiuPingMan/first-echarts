<template>
  <div class="com-container">
    <div class="com-chart" ref="seller_ref"></div>
  </div>
</template>

<script>
import {getSellerData} from '@/api/seller'
export default {
  data() {
    return {
      // 图表实例
      chartInstance: null,
      // 数据
      barData: [],
      currentPage: 2,
      totalPage: 0,
      timeId: null,
    }
  },
  mounted() {
    this.initChart()
    this.getData()
    this.screenAdapter()
    window.addEventListener('resize', this.screenAdapter)
  },
  destroyed() {
    // 清除定时器
    clearInterval(this.timeId)
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.seller_ref,'chalk')
      // 图标初始化配置
      const initOption = {
        title: {
          text: '| 商家销售统计',
        },
        // 图标相对定位
        grid: {
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true,// 包含文字
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category'
        },
        series: [
          {
            type: 'bar',
            // 文字
            label: {
              show:true,
              // 位于右侧
              position: 'right',
              textStyle: {
                color: 'white'
              }
            },
            // 柱
            itemStyle: {
              // 渐变色
              color: new this.$echarts.graphic.LinearGradient(0,0,1,0,[
                {
                  offset: 0,
                  color: '#5052EE'
                },
                {
                  offset: 1,
                  color: '#AB6EE5'
                }
              ])
            },
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              color: '#2D3443',
              type: 'solid'
            }
          },
        },
      }
      this.chartInstance.setOption(initOption)
      // 鼠标移入清楚定时器
      this.chartInstance.on('mouseover',() => {
        clearInterval(this.timeId)
      })
      // 鼠标移出设置定时器
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },
    async getData() {
      await getSellerData()
        .then(res => {
          this.barData = res.data
          this.barData.sort((a,b) => {
            return a.value - b.value
          })
        })
      this.totalPage = this.barData.length % 5 === 0 ? this.barData.length / 5 : this.barData.length / 5 + 1
      this.updateChart()
      this.startInterval()
    },
    updateChart() {
      const start = (this.currentPage - 1) * 5
      const end = this.currentPage * 5
      const showData = this.barData.slice(start, end)
      const sellerNames = showData.map(item => {
        return item.name
      })
      const sellerValues = showData.map(item => {
        return item.value
      })
      const dataOption = {
        yAxis: {
          data: sellerNames
        },
        series: [
          {
            data: sellerValues,
          }
        ]
      }
      this.chartInstance.setOption(dataOption)
    },
    // 设置定时更新
    startInterval() {
      if (this.timeId) {
        clearInterval(this.timeId)
      }
      this.timeId = setInterval(() => {
        if (this.currentPage < this.totalPage) {
          this.currentPage ++
        } else {
          this.currentPage = 1
        }
        this.updateChart()
      },3000)
    },
    // 屏幕适配
    screenAdapter() {
      console.log(this.$refs.seller_ref.offsetWidth);
      const titleFontSize = this.$refs.seller_ref.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        series: [
          {
            // 柱宽
            barWidth: titleFontSize,
            // 柱
            itemStyle: {
              // 圆角
              borderRadius: [0, titleFontSize, titleFontSize, 0],
            },
          }
        ],
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFontSize,
            }
          },
        },
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    }
  }
}
</script>

<style>

</style>