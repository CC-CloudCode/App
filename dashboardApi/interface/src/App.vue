<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
          <v-sheet
              rounded="lg"
            >
              <line-chart v-if="loaded" :title="title1" :chartdata="chartdata1"/>
            </v-sheet>
          
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
           <v-sheet
              rounded="lg"
            >
            <line-chart v-if="loaded" :title="title2" :chartdata="chartdata2"/>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
          <v-sheet
              rounded="lg"
            >
              <line-chart v-if="loaded" :title="title3" :chartdata="chartdata3"/>
            </v-sheet>
          
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
           <v-sheet
              rounded="lg"
            >
            <line-chart v-if="loaded" :title="title4" :chartdata="chartdata4"/>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
          <v-sheet
              rounded="lg"
            >
              <line-chart v-if="loaded" :title="title5" :chartdata="chartdata5"/>
            </v-sheet>
          
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
           <v-sheet
              rounded="lg"
            >
            <ChartTeste v-if="loaded" :title="title6" :titleaux="title7" :chartdata="chartdata6" :chartdataaux="chartdata7"/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LineChart from './components/Chart.vue';
import ChartTeste from "./components/ChartTeste"
import axios from "axios";
export default {
  name: 'App',
  components: { LineChart, ChartTeste },
  data() {
    return {
      loaded: false,
      chartdata1: null,
      title1: "Dinheiro Apostado nos últimos 5 dias",
      chartdata2: null,
      title2: "Dinheiro perdido pelos apostadores nos últimos 5 dias",
      chartdata3: null,
      title3: "Número de posts realizados nos últimos 5 dias",
      chartdata4: null,
      title4: "Número de posts realizados ontem por hora",
      chartdata5: null,
      title5: "Número de rascunhos criados nos últimos 5 dias",
      chartdata6: null,
      chartdata7: null,
      title6: "Publicações públicas",
      title7: "Publicações privadas",
    };
  },
  created() {

    let moneyroute = "http://localhost:4052/bets/dashboard/money"
    let perdidoroute = "http://localhost:4052/bets/dashboard/lostmoney"
    let postcountroute = "http://localhost:4052/posts/postscount"
    let postcounthourroute = "http://localhost:4052/posts/postscounthour"
    let draflastdaysroute = "http://localhost:4052/bets/dashboard/draftcount"
    let publicpostcoutroute = "http://localhost:4052/posts/publicpostscount"
    let privatepostcoutroute = "http://localhost:4052/posts/privatepostscount"

    const res_money = axios.get(moneyroute);
    const res_perdido = axios.get(perdidoroute);
    const res_postscount = axios.get(postcountroute);
    const res_postscounthour = axios.get(postcounthourroute);
    const res_draflastdays = axios.get(draflastdaysroute);
    const res_publicpostcout = axios.get(publicpostcoutroute);
    const res_privatepostcout = axios.get(privatepostcoutroute);

    axios
      .all([res_money, res_perdido, res_postscount, res_postscounthour, res_draflastdays, res_publicpostcout, res_privatepostcout])
      .then(
        axios.spread((...responses) => {
          var result = {};
          for (var i = 0; i < responses[0].data.length; i++) {
            result[responses[0].data[i]["date(date)"]] = responses[0].data[i]["sum(money)"];
          }
          this.chartdata1 = result

          result = {};
          for ( i = 0; i < responses[1].data.length; i++) {
            result[responses[1].data[i]["date(date)"]] = responses[1].data[i]["sum(money)"];
          }
          this.chartdata2 = result

          result = {};
          for ( i = 0; i < responses[2].data.length; i++) {
            result[responses[2].data[i]["date"]] = responses[2].data[i]["postscount"];
          }
          this.chartdata3 = result

          result = {};
          for ( i = 0; i < responses[3].data.length; i++) {
            result[responses[3].data[i]["hour(date)"]] = responses[3].data[i]["count(idpost)"];
          }
          this.chartdata4 = result

          result = {};
          for ( i = 0; i < responses[4].data.length; i++) {
            result[responses[4].data[i]["date(date)"]] = responses[4].data[i]["count(idbet)"];
          }
          this.chartdata5 = result

          result = {};
          for ( i = 0; i < responses[5].data.length; i++) {
            result[responses[5].data[i]["date(date)"]] = responses[5].data[i]["count(idpost)"];
          }
          this.chartdata6 = result

          result = {};
          for ( i = 0; i < responses[6].data.length; i++) {
            result[responses[6].data[i]["date(date)"]] = responses[6].data[i]["count(idpost)"];
          }
          this.chartdata7 = result


          this.loaded=true

        }))
      .catch((err) => {
               this.error = err.message;
             })
  }
};
</script>
