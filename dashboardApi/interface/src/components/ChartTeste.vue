<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
  data() {
    return {
      gradient: null,
      gradient2: null
    };
  },
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    chartdataaux: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    titleaux: {
      type: String,
      default: null
    }
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2.addColorStop(0, "rgba(0, 255,0, 0.5)");
    this.gradient2.addColorStop(0.5, "rgba(0, 255, 0, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 0, 255, 0)");
    this.renderChart(
      {
        labels: Object.keys(this.chartdata),
        datasets: [
          {
            label: this.title,
            data: Object.values(this.chartdata),
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient
          },
          {
            label: this.titleaux,
            data: Object.values(this.chartdataaux),
            borderColor: "#00CC00",
            pointBackgroundColor: "black",
            borderWidth: 1,
            pointBorderColor: "black",
            backgroundColor: this.gradient2
          },

        ],
        
      },
      {
        responsive: true,
        maintainAspectRatio: false
      }
    );
  }
};
</script>