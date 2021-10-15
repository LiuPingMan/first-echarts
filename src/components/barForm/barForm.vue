<template>
  <div id="barForm">
  </div>
</template>
<script>
export default {
  name: 'barForm',
  data() {
    return {

    } 
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let chart = this.$echarts.init(document.querySelector('#barForm'))
      let option = {
        title: {
          text: '成绩',
          textStyle: {
            color: '#ffdd00'
          },
          borderWidth: 2,
          borderColor: 'red',
          borderRadius: 5
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'click',
          // formatter:  '{b}的成绩是{c}'
          formatter: function(params) {
            return params.name + '的成绩是' + params.value
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {},// 导出图片
            dataView: {},// 数据视图
            restore: {}, // 重置
            dataZoom: {}, // 区域缩放
            magicType: { // 动态图表类型切换
              type: ['bar', 'line']
            }
          }
        },
        xAxis: {
          type: 'category',
          data: ['小明', '小红', '小马', '小李', '小婉', '小朱']
        },
        yAxis: {
          type: 'value'
        },
        legend: {// 筛选
          data: ['语文', '数学']
        },
        series: [
          {
            name: '语文',
            type: 'bar',
            markPoint: {
              data: [
                {
                  type: 'max', name: '最大值'
                },
                {
                  type: 'min', name: '最小值'
                }
              ]
            },
            markLine: {
              data: [
                {
                  type: 'average',name: '平均值'
                }
              ]
            },
            color: ['yellow','blue'],//调色盘
            label: {
              show: true,
              // rotate: 60,
              // position: 'right'
            },
            barWidth:'40%',
            data: [70, 97, 67, 90, 65, 74]
          },
          {
            name: '数学',
            type: 'bar',
            markPoint: {
              data: [
                {
                  type: 'max', name: '最大值'
                },
                {
                  type: 'min', name: '最小值'
                }
              ]
            },
            markLine: {
              data: [
                {
                  type: 'average',name: '平均值'
                }
              ]
            },
            label: {
              show: true,
              // rotate: 60,
              // position: 'right'
            },
            barWidth:'40%',
            data: [80, 67, 87, 93, 46, 84]
          },
        ],
        animation: true,
        animationDuration: function(args) { //动画时长
          console.log(args);
          return args * 1000
        },
        animationEasing: 'bounceOut',//动画缓动
      }
      chart.setOption(option)
    }
  }
}







</script>
<style scoped>
#barForm {
  width: 400px;
  height: 400px;
}
</style>