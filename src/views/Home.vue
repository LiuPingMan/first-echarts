<template>
  <div class="home">
    <bar-form></bar-form>
    <line-chart></line-chart>
    <scatter-plot></scatter-plot>
    <pie-chart></pie-chart>
  </div>
</template>
<script>
import barForm from '@/components/barForm/barForm.vue'
import LineChart from '../components/lineChart/lineChart.vue'
import ScatterPlot from '../components/scatterPlot/scatterPlot.vue'
import PieChart from '../components/pieChart/pieChart.vue'

export default {
  components: { 
    barForm,
    LineChart,
    ScatterPlot,
    PieChart,
  },
  
}
</script>