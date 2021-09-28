<template>
  <div class="home">
    <bar-form></bar-form>
    <line-chart></line-chart>
    <scatter-plot></scatter-plot>
  </div>
</template>
<script>
import barForm from '@/components/barForm/barForm.vue'
import LineChart from '../components/lineChart/lineChart.vue'
import ScatterPlot from '../components/scatterPlot/scatterPlot.vue'

export default {
  components: { 
    barForm,
    LineChart,
    ScatterPlot,
  },
  
}
</script>