<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
  data() {
    return {
      gradient: null
    };
  },
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    title: {
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