<template>
  <div class="app-card-row">
    <div class="chart">
      <LineChart
        ref="chart"
        v-if="loaded"
        :chart-data="datacollection"
        :options="options"
        :height="200"
      ></LineChart>
    </div>
  </div>
</template>

<script>
import LineChart from "./LineChart.js";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    LineChart
  },
  data() {
    return {
      datacollection: null,
      chartData: [],
      loaded: false
    };
  },
  computed: {
    ...mapGetters(["getCurrencyChartData"])
  },
  mounted() {
    this.fillData();
  },
  watch: {
    getCurrencyChartData(result) {
      this.chartData = result;
      this.loaded = true;
      this.fillData();
    }
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: this.chartData.map(item => item.date),
        datasets: [
          {
            label: "Value: ",
            backgroundColor: "#f8d6d7",
            borderColor: "#f4484f",
            pointBackgroundColor: "#f4484f",
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 4,
            lineTension: 0.4,
            pointHoverBackgroundColor: "#f4484f",
            pointBorderColor: "#f4484f",
            data: this.chartData.map(item => item.value)
          }
        ]
      };
      this.options = {
        legend: {
          display: false
        },
        tooltips: {
          bodyFontSize: 14,
          bodyFontStyle: "bold",
          titleFontSize: 14
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "#777"
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "#777"
              }
            }
          ]
        }
      };
    }
  }
};
</script>

<style lang="less">
.app-card-row {
  margin-left: -30px;
  margin-right: -30px;
}
.chart {
  margin-left: 10px;
  margin-top: 20px;
}
</style>