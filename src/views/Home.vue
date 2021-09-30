<template>
  <div class="home">
    <bar-form></bar-form>
    <line-chart></line-chart>
    <scatter-plot></scatter-plot>
    <pie-chart></pie-chart>
    <map-chart></map-chart>
    <radar-chart></radar-chart>
  </div>
</template>
<script>
import barForm from '@/components/barForm/barForm.vue'
import LineChart from '../components/lineChart/lineChart.vue'
import ScatterPlot from '../components/scatterPlot/scatterPlot.vue'
import PieChart from '../components/pieChart/pieChart.vue'
import MapChart from '../components/mapChart/mapChart.vue'
import RadarChart from '../components/radarChart/radarChart.vue'

export default {
  components: { 
    barForm,
    LineChart,
    ScatterPlot,
    PieChart,
    MapChart,
    RadarChart,
  },
  
}
</script>