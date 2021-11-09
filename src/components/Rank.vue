<template>
  <div class="com-container">
    <div class="com-chart" ref="rank_ref"></div>
  </div>
</template>

<script>
import { getRankData } from '@/api/seller'
export default {
  data() {
    return {
      rankData: null,
      chartInstance: null,
      startValue: 0, // 区域缩放
      endValue:9, // 区域缩放
      timeId: null,
    }
  },
  mounted() {
    this.init()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
    clearInterval(this.timeId)
  },
  methods: {
    init() {
      this.chartInstance = this.$echarts.init(this.$refs.rank_ref, 'chalk')
      const initOption = {
        title: {
          text: '▎地区销售排行',
          left: 20,
          top: 20,
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'bar',
          }
        ],
        grid: {
          top: '40%',
          right: '5%',
          bottom: '5%',
          left: '5%',
          containLabel: true,
        },
        tooltip: {
          show: true,
        }
      }
      this.chartInstance.setOption(initOption)
      /* this.chartInstance.on('mouseover', () => {
        clearInterval(this.timeId)
      })
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      }) */
    },
    async getData() {
      await getRankData()
        .then(res => {
          const {data} = res
          data.sort((a, b) => {
            return b.value - a.value
          })
          this.rankData = data
          console.log(this.rankData);
        })
      this.updateChart()
      this.startInterval()
    },
    updateChart() {
      let provinceArr = []
      let valueArr = []
      this.rankData.forEach(item => {
        provinceArr.push(item.name)
        valueArr.push(item.value)
      });
      const updateOption = {
        xAxis: {
          data: provinceArr,
        },
        dataZoom: {
          show: false,
          startValue: this.startValue,
          endValue: this.endValue,
        },
        series: [
          {
            data: valueArr,
            itemStyle: {
              color: (arg) => {
                if (arg.value > 300) {
                  return new this.$echarts.graphic.LinearGradient(0,0,0,1,[
                    {
                      offset: 0,
                      color: '#2E72BF',
                    },
                    {
                      offset: 1,
                      color: '#23E5E5'
                    }
                  ])
                } else if (arg.value <= 300 && arg.value >= 150) {
                  return new this.$echarts.graphic.LinearGradient(0,0,0,1,[
                    {
                      offset: 0,
                      color: '#0BA82C',
                    },
                    {
                      offset: 1,
                      color: '#4FF778'
                    }
                  ])
                } else {
                  return new this.$echarts.graphic.LinearGradient(0,0,0,1,[
                    {
                      offset: 0,
                      color: '#5052EE',
                    },
                    {
                      offset: 1,
                      color: '#AB6EE5'
                    }
                  ])
                }
              }
            }
          }
        ]
      }
      this.chartInstance.setOption(updateOption)
    },
    screenAdapter() {
      const titleFontSize = this.$refs.rank_ref.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          },
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              borderRadius: [titleFontSize / 2, titleFontSize / 2, 0, 0]
            }
          }
        ]
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    startInterval() {
      if (this.timeId) {
        clearInterval(this.timeId)
      }
      this.timeId = setInterval(() => {
        if (this.endValue < this.rankData.length - 1) {
          this.startValue ++
          this.endValue ++
        } else {
          this.startValue = 0
          this.endValue = 9
        }
        this.updateChart()
      }, 1000)
    }
  }
}
</script>

<style>

</style>