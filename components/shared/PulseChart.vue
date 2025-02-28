<template>
  <div class="chart-container">
    <canvas :id="chartId" />
  </div>
</template>

<script lang="ts" setup>
import Chart from 'chart.js/auto'

function getGradient(ctx, chartArea) {
  let width, height, gradient
  const chartWidth = chartArea.right - chartArea.left
  const chartHeight = chartArea.bottom - chartArea.top
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth
    height = chartHeight
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
    gradient.addColorStop(0, '#c8ff00')
    // gradient.addColorStop(0.5, 'black')
    gradient.addColorStop(1, '#414d19')
  }
  return gradient
}

const props = defineProps<{
  id?: string
  labels?: string[]
  values?: number[]
}>()

const pulseChart = ref()
const chartId = ref(`pulse-chart-${props.id}`)

onMounted(() => {
  const ctx = (
    document?.getElementById(chartId.value) as HTMLCanvasElement
  )?.getContext('2d')

  const data = {
    labels: props.labels,
    datasets: [
      {
        data: props.values,
        fill: false,
        // borderColor: 'rgb(75, 192, 192)',
        borderColor: function (context) {
          const chart = context.chart
          const { ctx, chartArea } = chart

          if (!chartArea) {
            // This case happens on initial chart load
            return
          }
          return getGradient(ctx, chartArea)
        },
        tension: 0.6,
        pointRadius: 0,
      },
    ],
  }
  if (ctx) {
    const chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        animation: false,
        scales: { x: { display: false }, y: { display: false } },
        plugins: {
          legend: false,
          tooltip: { enabled: false, hover: { mode: null } },
        },
      },
    })

    pulseChart.value = chart
  }
})
</script>

<style lang="scss">
.chart-container {
  height: 100px;
  width: 200px;
}
</style>
