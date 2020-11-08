<!-- <template>
  
<div>
    
<div v-for="(item,index) in countries" v-bind:key="item.idcountry + index">
    <p>{{item.name}}</p>
</div>

</div>
</template>
-->
<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
             
              <!-- 
              antes:
              <div v-for="(item,index) in countries" v-bind:key="item.idcountry + index">
                <p>{{item.name}}</p>
              </div>  

              pode tb ficar: 
              <div v-for="(item,index) in countries" v-bind:key="item.idcountry + index">
                <v-btn text>
                  {{item.name}}
                </v-btn>
              </div>
              -->
              
            
             <!-- <v-menu offset-y> --> 
               <!--<template v-slot:activator="{ on, attrs }"> -->
                
              <v-btn text v-for="(item,index) in list_leagues_unique" v-bind:key="item.idcountry + index" @click="buscarFixtures(item.id)">
                {{item.id}}  
                <v-img right v-bind:src= item.countryflag width=20px></v-img> 
              </v-btn>

                <!--
                <v-list>
                  <div v-for="(item, i) in list_leagues_unique" v-bind:key="item.idcountry + i"> 
                    <v-list-item
                      v-for="(league, index) in item.leagues" v-bind:key="league.idleague + index"
                    > 
                      <v-list-item-title>{{ league.leaguename }}</v-list-item-title>
                    </v-list-item>
                  </div>
               </v-list>  
               </v-menu>
               -->
            
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="8"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <!--  -->
              <div v-for="(item,index) in this.lista_jogos_pais" v-bind:key="item.hometeamname + index"> 
                <v-card>
                <v-row align="start" justify="center">
                <v-btn text v-for="(item,index) in list_leagues_unique" v-bind:key="item.idcountry + index">
                  {{item.hometeamname}} 
                  <v-img right v-bind:src= item.hometeamlogo width=20px></v-img>  
                </v-btn>
                <p> vs </p>
                <v-btn text v-for="(item,index) in list_leagues_unique" v-bind:key="item.idcountry + index">
                  {{item.awayteamname}} 
                  <v-img right v-bind:src= item.awayteamlogo width=20px></v-img>  
                </v-btn> 
                </v-row> 

                <v-row align="start" justify="center">
                <v-col cols="12" md="1">  
                <v-btn  v-for="(item,index) in list_leagues_unique" v-bind:key="item.idcountry + index">
                  {{item.oddhome}} 
                </v-btn> 
                </v-col> 

                <v-col cols="12" md="1">  
                <v-btn  v-for="(item,index) in list_leagues_unique" v-bind:key="item.idcountry + index">
                  {{item.oddaway}} 
                </v-btn>
                </v-col>  

                <v-col cols="12" md="1">  
                <v-btn  v-for="(item,index) in list_leagues_unique" v-bind:key="item.idcountry + index">
                  {{item.odddraw}} 
                </v-btn>
                </v-col> 
                </v-row>
                </v-card>
              </div>

            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              <!--  -->
              <p>Boletim</p>
              <p>jogo1</p>
              <p>jogo2</p>
              <p>jogo3</p>
              <p>jogo4</p>
              <p>jogo5</p>
              <v-row>
                 <v-col>
                   <v-text-field
                     label="Quantia"
                    placeholder="100.00€"
                    outlined
                   ></v-text-field>
                 </v-col>

                 <v-col
                 >
                    <v-btn
                      elevation="2"
                    >Apostar</v-btn>
                 </v-col>
                </v-row> 

            </v-sheet>

            <v-sheet
              rounded="lg"
              min-height="268"
              class="mt-5"
            >
              <!--  -->
              <p>Publicidade</p>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import axios from "axios"
const betspath = require("@/config/hosts").hostBetsApi
import VueJwtDecode from "vue-jwt-decode";
import Chat from '@/components/Chat.vue'

  export default {
    components:{
    Chat
    }, 

    methods: { 
      
      onlyUnique: function(value, index, self) {
       return self.indexOf(value) === index;
      }, 
      
      buscarFixtures(idcountry){ 
        // BUSCAR FIXTURES DE UM COUNTRY SELECIONADO 
        console.log("Nome country selecionado: " + idcountry) 
        var i = 0;   
        var obj = {} 
        var coiso = []
        
        console.log("buscar fixutres list league")
        console.log(this.list_leagues_unique)

        for(i;i<this.list_leagues_unique.length;i++){ 
          if (this.list_leagues_unique[i].id == idcountry){ 
            obj.oddhome = this.list_leagues_unique[i].oddhome 
            obj.oddaway = this.list_leagues_unique[i].oddaway 
            obj.odddraw = this.list_leagues_unique[i].odddraw 
            obj.hometeamname = this.list_leagues_unique[i].hometeamname 
            obj.awayteamname = this.list_leagues_unique[i].awayteamname
            obj.hometeamlogo = this.list_leagues_unique[i].hometeamlogo 
            obj.awayteamlogo = this.list_leagues_unique[i].awayteamlogo
            coiso.push(obj)
            this.lista_jogos_pais = coiso 
          }
        }
       
       console.log("JOGOOSOSOSOSOOS")
       console.log(this.lista_jogos_pais)


      }
    },

    data(){
      return {
        infototal: [],  
        list_leagues_unique: [],  
        lista_jogos_pais: []
      }
    }, 
     
  mounted: function() {
    axios
      .get(betspath + 'countries')
      .then(dados => {
        this.countries = dados.data; 
        console.log(dados.data)
      })
      .catch(err => {
        this.error = err.message;
      });
  },  
  
  mounted: function() {
    axios
      .get(betspath + 'fixtures/allinfo')
      .then(dados => {
        this.infototal = dados.data;  
        
        
        var i = 0; 
        var coiso = [] 
        var obj = {} 
        var league = []
        
        for(;i<dados.data.length;i++){ 
          obj.id = dados.data[i].countryname 
          obj.countrycode = dados.data[i].contrycode 
          obj.countryflag = dados.data[i].countryflag
          obj.oddhome = dados.data[i].oddhome 
          obj.oddaway = dados.data[i].oddaway 
          obj.odddraw = dados.data[i].odddraw 
          obj.hometeamname = dados.data[i].hometeamname 
          obj.awayteamname = dados.data[i].awayteamname
          obj.hometeamlogo = dados.data[i].hometeamlogo 
          obj.awayteamlogo = dados.data[i].awayteamlogo
          // array de ligas associado ao pais
          league.push(dados.data[i].leaguename) 
          league.push(dados.data[i].idleague) 
          league.push(dados.data[i].leaguelogo)   
          obj.leagues = league 
          coiso.push(obj)
        } 

        var unique_list = new Set(coiso); 
        this.list_leagues_unique = Array.from(unique_list);
        
        var j= 0; 
        var merda = [] 
        var merdaboa = []

        for(j;j<this.list_leagues_unique.length;j++){ 
          merda = this.list_leagues_unique[j].leagues
          merdaboa = merda.filter((v, i, a) => a.indexOf(v) === i)
          this.list_leagues_unique[j].leagues = merdaboa
        }

        console.log(this.list_leagues_unique)
        
        /*
       const uniquecountries = [...new Set(this.infototal.map(item => item.countryname))];

       function agruparPor(objetoArray, propriedade) {
           return objetoArray.reduce(function (acc, obj) {
               let key = obj[propriedade];
               if (!acc[key]) {
               acc[key] = [];
               }
               acc[key].push(obj);
               return acc;
           }, {});
       }
         
       let bycountry = agruparPor(this.infototal, 'countryname');
                             
       var result = []
       uniquecountries.map(x => result.push({'countryname': x , 'leagues': agruparPor(bycountry[x], 'leaguename')}))

       console.log("resultado:" ) 
       console.log(result)
        */

      })
      .catch(err => {
        this.error = err.message;
      });
  }, 


  
  }
</script> 

<style scoped>
.col-md-1 {
    flex: 0 0 8.3333333333%;
    max-width: 16.3333333333%;
}
</style>