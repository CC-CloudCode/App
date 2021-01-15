<template>
  <v-app id="inspire">
    <!-- Adicionei padding e margem por causa da toolbarfixa -->
    <v-main class="grey lighten-3 mt-10 pt-10">
        <v-row >
         
         <v-col cols="12" sm="2" md="2" lg="2">
            
          <v-card
            rounded
          >
          <v-list dense rounded>
            <v-subheader>Países</v-subheader>
            <v-list-item-group
              v-model="selectedItem"
              color="primary"
            >
              <v-list-item
                v-for="(item, i) in unique_countries"
                :key="i"
              >

                <v-list-item-icon>
                        <v-img
                          v-if="item.id != 'Todos'"
                          right
                          v-bind:src="item.countryflag"
                          width="30px"
                        ></v-img>
                </v-list-item-icon>
                
                <v-list-item-content>
                  <v-list-item-title  @click="buscarFixtures(item.id);" v-text="item.id"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            </v-list>
          </v-card>
           
          <!-- 
            <v-sheet rounded>
              <v-row
                align="start"
                justify="center"
                v-for="(item, index) in unique_countries"
                v-bind:key="item.idcountry + index"
              >
                 para todos não vai buscar o country flag
                <v-btn
                  text
                  @click="
                    toggleActiveButton(index);
                    buscarFixtures(item.id);
                  "
                  :class="{ active: item.active }"
                >
                  {{ item.id }}
                  <v-img
                    v-if="item.id != 'Todos'"
                    right
                    v-bind:src="item.countryflag"
                    width="20px"
                  ></v-img>
                </v-btn>
              </v-row>
            </v-sheet> 

            -->
          </v-col>

          <v-col cols="12" sm="8" md="8" lg="8">
            
              <!-- 
                
                Existe sempre a verificação do lista_jogos_pais, por exemplo ==0 porque no início a lista está vazia, 
                é preciso clicar num pais primeiro !  
                Desta maneira, sem ter um país selecionado é possível fazer display de todos os jogos
                
                -->

                <div v-if="lista_jogos_pais.length != 0">
                  <v-card rounded> 
                  
                  <!-- Para colocar no lado direito 
                      <v-row justify="end" align="end">
                  -->
                  <v-card-title>
                    <v-text-field class="shrink" style="width:250px" prepend-icon="mdi-magnify" v-model="search" label="Pesquisa" clearable color="#afd29a" dense></v-text-field>
                  </v-card-title>
                 
                  
                  <v-data-table
                    :headers="headers"
                    :items="this.lista_jogos_pais" 
                    disable-pagination
                    :hide-default-header="true"
                    :hide-default-footer="true"
                    :search="search"
                   >
                  <template v-slot:[`item.begintime`]="{ item }">
                   
                    <td> {{ item.begintime }} </td>
                  
                  </template> 

                  <template v-slot:[`item.hometeamname`]="{ item }">
                    
                    <td>{{ item.hometeamname }}</td> 
                  
                  </template> 


                  <template v-slot:[`item.hometeamlogo`]="{ item }">
                    <td>         
                      <v-img
                          v-bind:src="item.hometeamlogo"
                          width="20px"
                        ></v-img> 
                    </td> 
                   </template>
                  
                 <template v-slot:[`item.traco`]="{ }">
                    <td> - </td>
                  </template>

                  <template v-slot:[`item.awayteamlogo`]="{ item }">
                    <td>         
                      <v-img
                          v-bind:src="item.awayteamlogo"
                          width="20px"
                        ></v-img> 
                    </td>  
                  </template>
                 

                  
                  <template v-slot:[`item.awayteamname`]="{ item }">
                    <td>{{ item.awayteamname }}</td>  
                  </template> 

                 <template v-slot:[`item.oddhome`]="{ item }">
                    <td>                   
                      <v-btn
                        text
                        small
                        @click="
                          addCart(item.hometeamname, item.oddhome, item.idfixture, 0)
                        "
                      >
                        {{ item.oddhome }}
                      </v-btn>
                    </td>  
                 </template>

                <template v-slot:[`item.odddraw`]="{ item }">
                    <td>                   
                      <v-btn
                        text
                        small
                        @click="
                          addCart(item.hometeamname + item.awayteamname, item.odddraw, item.idfixture, 1)
                        "
                      >
                        {{ item.odddraw }}
                      </v-btn>
                    </td> 
                </template>

                 <template v-slot:[`item.oddaway`]="{ item }">  
                    <td>                   
                      <v-btn
                        text
                        small
                        @click="
                          addCart(item.awayteamname, item.oddaway, item.idfixture, 2)
                        "
                      >
                        {{ item.oddaway }}
                      </v-btn>
                    </td>  
                  </template>
                  

                  <!-- Botão estatísticas entre ambas as equipas -->
                  <template v-slot:[`item.action`]="{ item }"> 
                  <td>
                      <v-btn
                        text
                        small
                        @click.stop="
                          getStats(
                            item.idleague,
                            item.hometeamid,
                            item.awayteamid,
                            item.hometeamname,
                            item.awayteamname,
                            item.idfixture,
                            item.leaguename
                          )
                        "                        
                        color="#afd29a">
                        <v-tooltip class="testeDialog" right>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon dark v-bind="attrs" v-on="on">
                              mdi-chart-box-outline
                            </v-icon>
                          </template>
                          <span>Ver estatísticas</span>
                        </v-tooltip>
                      </v-btn>          
                  </td>
                  </template>                  
                 </v-data-table>  
                  </v-card>

                  <!-- Dialog das estatísticas entre 2 equipas -->
                 <v-dialog class="testeDialog" v-model="dialog" width="800">
                      <v-card>
                        <!--
                          <v-card-title class="headline red--text">{{league_name}}  <v-img v-bind:src="infototal[0].leaguelogo" max-width="25" max-height="25"></v-img> <p> Estatísticas {{statshometeam}} vs {{statsawayteam}} </p></v-card-title>
                          -->
                        <v-card-title class="headline green--text"
                          >
                          {{ league_name }}
                          Estatísticas 
                          {{ statshometeam }} vs
                          {{ statsawayteam }}
                        </v-card-title>
                        
                        <v-divider class="mx-4" horizontal></v-divider>

                        <div
                          v-if="hometeamstats != null || awayteamstats != null"
                        >
                          <v-card-text>

                            <Standings :standings="standings" :statshometeam="statshometeam" :statsawayteam="statsawayteam"/>

                            <GenStats :statshometeam="statshometeam" :statsawayteam="statsawayteam" :hometeamstats="hometeamstats" :awayteamstats="awayteamstats" />

                            <!-- H2H TABELA -->
                            <H2h :h2h="h2h" :id_home_team="id_home_team" :id_away_team="id_away_team" :statshometeam="statshometeam" :statsawayteam="statsawayteam"/>
                          
                          </v-card-text>
                        </div>

                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-tooltip class="testeDialog" bottom>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                depressed
                                color="white"
                                @click="dialog = false"
                                v-on="on"
                              >
                                <v-icon large>mdi-close</v-icon>
                              </v-btn>
                            </template>
                            <span>Sair</span>
                          </v-tooltip>
                        </v-card-actions>
                      </v-card>
                    
            </v-dialog>
                
            </div>
                


                <div v-if="lista_jogos_pais.length == 0">
                  
                  <v-card rounded>
                  
                  <v-card-title>
                    <v-text-field class="shrink" style="width:250px" prepend-icon="mdi-magnify" v-model="search" label="Pesquisa" clearable color="#afd29a" dense></v-text-field>
                  </v-card-title>
                  
                  <v-data-table              
                    :headers="headers"
                    :items="this.infototal" 
                     disable-pagination
                    :hide-default-footer="true" 
                    :hide-default-header="true" 
                    :search="search"
                   >
                  
                   <template v-slot:[`item.begintime`]="{ item }">
                   
                    <td> {{ item.begintime.substring(0,10) + ' ' + item.begintime.substring(11,16) }} </td>
                   
                   </template>
             

                  <template v-slot:[`item.hometeamname`]="{ item }">
                  
                    <td>{{ item.hometeamname }}</td> 
                  
                  </template> 

                  <template v-slot:[`item.hometeamlogo`]="{ item }">
                    <td>         
                      <v-img
                          v-bind:src="item.hometeamlogo"
                          width="20px"
                        ></v-img> 
                    </td> 
                   </template>
                  

                 <template v-slot:[`item.traco`]="{ }">
                    <td> - </td>
                  </template>

                  <template v-slot:[`item.awayteamlogo`]="{ item }">
                    <td>         
                      <v-img
                          v-bind:src="item.awayteamlogo"
                          width="20px"
                        ></v-img> 
                    </td>  
                  </template>


                   <template v-slot:[`item.awayteamname`]="{ item }">
                    <td>{{ item.awayteamname }}</td>  
                  </template> 

                 <template v-slot:[`item.oddhome`]="{ item }">
                    <td>                   
                      <v-btn
                        text
                        small
                        @click="
                          addCart(item.hometeamname, item.oddhome, item.idfixture, 0)
                        "
                      >
                        {{ item.oddhome }}
                      </v-btn>
                    </td>  
                 </template>

                <template v-slot:[`item.odddraw`]="{ item }">
                    <td>                   
                      <v-btn
                        text
                        small
                        @click="
                          addCart(item.hometeamname + item.awayteamname, item.odddraw, item.idfixture, 1)
                        "
                      >
                        {{ item.odddraw }}
                      </v-btn>
                    </td> 
                </template>

                 <template v-slot:[`item.oddaway`]="{ item }">  
                    <td>                   
                      <v-btn
                        text
                        small
                        @click="
                          addCart(item.awayteamname, item.oddaway, item.idfixture, 2)
                        "
                      >
                        {{ item.oddaway }}
                      </v-btn>
                    </td>  
                  </template> 

                  <!-- Botão estatísticas -->
                  <template v-slot:[`item.action`]="{ item }"> 
                  <td>
                      <v-btn
                        text
                        small
                        @click.stop="
                          getStats(
                            item.idleague,
                            item.hometeamid,
                            item.awayteamid,
                            item.hometeamname,
                            item.awayteamname,
                            item.idfixture,
                            item.leaguename
                          )
                        "                        
                        color="#afd29a">
                        <v-tooltip class="testeDialog" right>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon dark v-bind="attrs" v-on="on">
                              mdi-chart-box-outline
                            </v-icon>
                          </template>
                          <span>Ver estatísticas</span>
                        </v-tooltip>
                      </v-btn>          
                  </td>
                  </template>                  
                 </v-data-table>  
                  </v-card>

                <!-- Dialog das estatísticas entre 2 equipas -->
                 <v-dialog class="testeDialog" v-model="dialog" width="800">
                      <v-card>
                        <!--
                          <v-card-title class="headline red--text">{{league_name}}  <v-img v-bind:src="infototal[0].leaguelogo" max-width="25" max-height="25"></v-img> <p> Estatísticas {{statshometeam}} vs {{statsawayteam}} </p></v-card-title>
                          -->
                        <v-card-title class="headline green--text"
                          >
                          {{ league_name }}
                          Estatísticas 
                          {{ statshometeam }} vs
                          {{ statsawayteam }}
                          </v-card-title
                        >
                        <v-divider class="mx-4" horizontal></v-divider>

                        <div
                          v-if="hometeamstats != null || awayteamstats != null"
                        >
                          <v-card-text>
                            
                            <Standings :standings="standings" :statshometeam="statshometeam" :statsawayteam="statsawayteam"/>

                            <GenStats :statshometeam="statshometeam" :statsawayteam="statsawayteam" :hometeamstats="hometeamstats" :awayteamstats="awayteamstats" />
                            <!-- H2H TABELA -->
                            <H2h :h2h="h2h" :id_home_team="id_home_team" :id_away_team="id_away_team" :statshometeam="statshometeam" :statsawayteam="statsawayteam"/>

                          </v-card-text>
                        </div>

                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-tooltip class="testeDialog" bottom>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                depressed
                                color="white"
                                @click="dialog = false"
                                v-on="on"
                              >
                                <v-icon large>mdi-close</v-icon>
                              </v-btn>
                            </template>
                            <span>Sair</span>
                          </v-tooltip>
                        </v-card-actions>
                      </v-card>
                    
            </v-dialog>



                </div>  
                

              


              
            
          </v-col>

          <div v-if="notOpenFixture == true">
            <v-alert
              prominent
              close-text="Close Alert"
              border="left"
              dense
              color="#FF0000"
              type="error"
              dismissible
            >
              O jogo {{this.actualCartFixture}} já não se encontra disponível para apostar.
            </v-alert>
          </div>
          
          <div v-if="noValueMoney == true">
            <v-alert
              v-model="showWarningMoney"
              prominent
              close-text="Close Alert"
              border="left"
              dense
              color="#FF0000"
              type="error"
              dismissible
            >
              Insira uma quantia válida para apostar.
            </v-alert>
          </div> 

          <div v-if="sucessfulBet == true">
            <v-alert
              prominent
              close-text="Close Alert"
              border="left"
              dense
              color="green"
              type="success"
              dismissible
            >
              Aposta realizada com sucesso!
            </v-alert>
          </div> 

        </v-row>
      
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
const betspath = require("@/config/hosts").hostBetsApi;
const datapath = require("@/config/hosts").hostDataApi; 
import VueJwtDecode from "vue-jwt-decode";
import Chat from "@/components/Chat.vue"; 
import Standings from "@/components/Standings.vue" 
import H2h from "@/components/H2h.vue" 
import GenStats from "@/components/GenStats.vue" 
import ButtonShareBets from "@/components/ButtonShareBets.vue"
import Boletim from "@/components/Boletim.vue"

export default {
  
  components: {
    Chat,  
    Standings, 
    H2h, 
    GenStats, 
    ButtonShareBets, 
    Boletim
  },

  data() {
    return {
      selectedItem: 1,
      infototal: [],
      list_leagues_unique: [],
      lista_jogos_pais: [],
      unique_countries: [],
      cart: [],
      gains: null,
      textFieldQuantia: "",
      dialog: false,
      notOpenFixture: false,
      noValueMoney: false, 
      sucessfulBet: false,
      actualCartFixture: null, 
      standing_home: "",
      standing_away: "", 
      search: "", 
      gruposUtilizador: [], 
      showWarningMoney: false,
      headers: [
          {
            value: 'begintime', 
            sortable: true
          }, 
          {
            value: 'hometeamname', 
            sortable: false
          },
          {
            value: 'hometeamlogo', 
            sortable: false
          }, 
          {
            value: 'traco', 
            sortable: false
          },
          {
            value: 'awayteamlogo', 
            sortable: false
          }, 
          {
            value: 'awayteamname', 
            sortable: false
          }, 
          {
            value: 'oddhome', 
            sortable: false
          },
          { 
            value: 'odddraw', 
            sortable: false
          },
          { 
            value: 'oddaway', 
            sortable: false
          }, 
          { 
            value: 'action', 
            sortable: false
          }
      ],

        standings: null, 
        h2h: null, 
        statshometeam: null, 
        statsawayteam: null, 
        league_name: null, 
        id_home_team: null, 
        id_away_team: null, 
        hometeamstats: null, 
        awayteamstats: null

    };
  }, 
  mounted: function() {
    axios
      .get(betspath + "fixtures/allinfo")
      .then((dados) => {

        this.infototal = dados.data; //jogos todos vindos da database

        console.log("info que vem da api");
        console.log(this.infototal);

        var obj = {};
        var league = [];
        
        /*
        // Objeto estatico criado para teste
        obj.countryname = "Portugal" 
        obj.countrycode = "PT" 
        obj.countryflag = "https://media.api-sports.io/flags/pt.svg" 
        obj.oddhome = "1.3" 
        obj.oddaway = "3" 
        obj.odddraw = "5.6" 
        obj.hometeamname = "Abragonense" 
        obj.awayteamname = "Amigos de S Miguel" 
        obj.hometeamlogo = "https://media.api-sports.io/football/teams/45.png" 
        obj.awayteamlogo = "https://media.api-sports.io/football/teams/33.png" 
        obj.begintime = "2020-11-10T12:30:00.000Z"   
        obj.idfixture = "1233" 
        obj.idleague = "2" 
        obj.state = "Not Started"
        
        dados.data.push(obj) 
        obj = {};
        */
        
        var i = 0;
        var coiso = [];

        for (; i < dados.data.length; i++) {
          obj.id = dados.data[i].countryname;
          obj.countrycode = dados.data[i].contrycode;
          obj.countryflag = dados.data[i].countryflag;
          obj.oddhome = dados.data[i].oddhome;
          obj.oddaway = dados.data[i].oddaway;
          obj.odddraw = dados.data[i].odddraw;
          obj.hometeamname = dados.data[i].hometeamname;
          obj.awayteamname = dados.data[i].awayteamname;
          obj.hometeamlogo = dados.data[i].hometeamlogo;
          obj.awayteamlogo = dados.data[i].awayteamlogo;
          obj.begintime = dados.data[i].begintime;
          obj.hometeamid = dados.data[i].hometeamid;
          obj.awayteamid = dados.data[i].awayteamid;
          obj.idleague = dados.data[i].idleague;
          obj.idfixture = dados.data[i].idfixture;
          obj.leaguename = dados.data[i].leaguename;
          // array de ligas associado ao pais
          league.push(dados.data[i].leaguelogo);
          obj.leagues = league;
          coiso.push(obj);
          obj = {};
        }

        var unique_list = new Set(coiso);
        this.list_leagues_unique = Array.from(unique_list);

        var j = 0;
        var merda = [];
        var merdaboa = [];

        for (j; j < this.list_leagues_unique.length; j++) {
          merda = this.list_leagues_unique[j].leagues;
          merdaboa = merda.filter((v, i, a) => a.indexOf(v) === i);
          this.list_leagues_unique[j].leagues = merdaboa;
        }

        console.log("list leagues unique");
        console.log(this.list_leagues_unique);

        // para criar array para fazer display dos paises na aba lateral

        var unique_country = [];
        // filter por country (unique)
        unique_country = this.list_leagues_unique.filter(
          (v, i, a) => a.findIndex((t) => t.id === v.id) === i
        );

        var x = 0;
        var obj_unq = {};
        // Display de todos os jogos, tem active para mudar depois a cor de fundo (todos por defeito no início tem cor de fundo)
        obj_unq.id = "Todos";
        obj_unq.active = true;
        this.unique_countries.push(obj_unq);
        obj_unq = {};
        // Counstruir array de objetos com nome da liga/flag
        for (x; x < unique_country.length; x++) {
          obj_unq.id = unique_country[x].id;
          obj_unq.countryflag = unique_country[x].countryflag;
          obj_unq.active = false;
          this.unique_countries.push(obj_unq);
          obj_unq = {};
        }

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
      .catch((err) => {
        this.error = err.message;
      });
  },

  methods: {
    
    refreshBalance: function(){
      this.$emit("refreshBalance") 
      // limpa os campos depois de fazer a aposta (que é concretizada no ButtonShareBets)
      this.textFieldQuantia=''; 
      this.cart = [];
      this.gains = ''  
    },
    
    refreshCart: function(){ 
      this.cart = []
    }, 
    
    refreshNoMoney: function(){ 
      this.cart = []
      this.showWarningMoney = true
    },

    warningNoMoney: function(noValueMoney){ 
      this.noValueMoney = noValueMoney
      this.showWarningMoney = true
    },
      getStats(
           idleague,
           idhome,
           idaway,
           homename,
           awayhome,
           idfixture,
           leaguename
         ) {
           console.log(String(idfixture));
           
           let get_stats = betspath + "teamstats/teamstats/standings/" + idleague;    
           let get_h2h = betspath + "head2head/" + String(idfixture);
      
           this.statshometeam = homename;
           this.statsawayteam = awayhome;
           this.league_name = leaguename;
           this.id_home_team = idhome;
           this.id_away_team = idaway;
      
           const res_stats = axios.get(get_stats);
           const res_h2h = axios.get(get_h2h);
      
           axios
             .all([res_stats, res_h2h])
             .then(
               axios.spread((...responses) => {
                
                 var split_forme = []
                 var i = 0 
                 var ch = 0
                 
                 // dinamicamente carregado no standings a classe do texto 
                 for (i;i<responses[0].data.length;i++){ 
                   responses[0].data[i].forme = responses[0].data[i].forme.replace(/W/g,"<span class='green--text'>W</span>")
                   responses[0].data[i].forme = responses[0].data[i].forme.replace(/L/g,"<span class='red--text'>L</span>")
                   responses[0].data[i].forme = responses[0].data[i].forme.replace(/D/g,"<span class='yellow--text text--darken-3'>D</span>")
                 } 
                
                 // transformar strings como LLLLL para ['L','L',....] para depois percorrer no html
                 /*
                 for (i;i<responses[0].data.length;i++){                    
                   split_forme = responses[0].data[i].forme.split('') 
                   responses[0].data[i].forme = split_forme 
                 }
                 */
                 //split_forme = responses[0].data.forme.split('') 
                 //console.log(split_forme)
                
                // sort por posição 
                responses[0].data.sort((a, b) => parseInt(a.position) - parseInt(b.position));

                this.standings = responses[0].data     
                console.log(this.standings)
                this.h2h = responses[1].data

      
                 this.hometeamstats = this.standings.find(x => x.idteam == idhome) 
                 this.awayteamstats = this.standings.find(x => x.idteam == idaway)  
      
                       
      
                /*
                 this.hometeamstats = responses[0].data.equipa1[0];
                 console.log(this.hometeamstats);
                 this.awayteamstats = responses[0].data.equipa2[0];
                 console.log(this.awayteamstats);
                 this.standings = responses[1].data;
                 this.h2h = responses[2].data;
      
                 console.log("head2heeeeeeeeeeeeeead");
                 console.log(this.h2h);
      
                 // encontrar a posição das 2 equipas da fixture
                 var i = 0;
                 for (i; i < this.standings.length; i++) {
                   if (this.standings[i].teamname == this.statshometeam) {
                     this.standing_home = this.standings[i].position;
                     console.log(this.standings[i].position);
                   }
                   if (this.standings[i].teamname == this.statsawayteam) {
                     this.standing_away = this.standings[i].position;
                   }
                 }
      
                 console.log("positionsssss");
                 console.log(this.standing_home);
                 console.log(this.standing_away);
                 */ 
                 
                 // dispara e abre o dialog
                 this.dialog = true;

               })
             )
             .catch((err) => {
               this.error = err.message;
             });
         } ,  

    toggleActiveButton: function(index) {
      this.unique_countries.forEach(function(button) {
        button.active = false;
      });
      this.unique_countries[index].active = !this.unique_countries[index]
        .active;
    },

    onlyUnique: function(value, index, self) {
      return self.indexOf(value) === index;
    },

    addCart(hometeamname, odd, idfixture, tipoaposta) {
      var obj = {};
      var i = 0;
      obj.team = hometeamname;
      obj.odd = odd;
      obj.idfixture = idfixture;
      obj.tipoaposta = tipoaposta;

      this.$emit("refreshBoletim",obj)  
    },

    clearCart() {
      this.cart = [];
      this.textFieldQuantia = "";
      this.gains = null;
    }, 

    checkCart(){ 
      if(this.cart.length == 0) return true 
      else return false
    },


    buscarFixtures(idcountry, index) {
      // BUSCAR FIXTURES DE UM COUNTRY SELECIONADO
      //console.log("Nome country selecionado: " + idcountry)
      var i = 0;
      var obj = {};
      var coiso = [];
      this.lista_jogos_pais = []
      //console.log("buscar fixutres list league")
      //console.log(this.list_leagues_unique)
      if (idcountry != "Todos") {
        for (i; i < this.list_leagues_unique.length; i++) {
          if (this.list_leagues_unique[i].id == idcountry) {
            obj.oddhome = this.list_leagues_unique[i].oddhome;
            obj.oddaway = this.list_leagues_unique[i].oddaway;
            obj.odddraw = this.list_leagues_unique[i].odddraw;
            obj.hometeamname = this.list_leagues_unique[i].hometeamname;
            obj.awayteamname = this.list_leagues_unique[i].awayteamname;
            obj.hometeamlogo = this.list_leagues_unique[i].hometeamlogo;
            obj.awayteamlogo = this.list_leagues_unique[i].awayteamlogo;
            obj.hometeamid = this.list_leagues_unique[i].hometeamid;
            obj.awayteamid = this.list_leagues_unique[i].awayteamid;
            obj.idleague = this.list_leagues_unique[i].idleague;
            obj.idfixture = this.list_leagues_unique[i].idfixture;
            obj.leaguename = this.list_leagues_unique[i].leaguename;
            var sub_strData = this.list_leagues_unique[i].begintime.substring(0,10); 
            var sub_strHora = ' ' + this.list_leagues_unique[i].begintime.substring(11,16) 
            obj.begintime = sub_strData + sub_strHora;
            coiso.push(obj);
            this.lista_jogos_pais = coiso;
            obj = {};
          }
        }
      } else {
        for (i; i < this.list_leagues_unique.length; i++) {
          // caso selecione outra vez todos os jogos
          obj.oddhome = this.list_leagues_unique[i].oddhome;
          obj.oddaway = this.list_leagues_unique[i].oddaway;
          obj.odddraw = this.list_leagues_unique[i].odddraw;
          obj.hometeamname = this.list_leagues_unique[i].hometeamname;
          obj.awayteamname = this.list_leagues_unique[i].awayteamname;
          obj.hometeamlogo = this.list_leagues_unique[i].hometeamlogo;
          obj.awayteamlogo = this.list_leagues_unique[i].awayteamlogo;
          obj.hometeamid = this.list_leagues_unique[i].hometeamid;
          obj.awayteamid = this.list_leagues_unique[i].awayteamid;
          obj.idleague = this.list_leagues_unique[i].idleague;
          obj.idfixture = this.list_leagues_unique[i].idfixture;
          obj.leaguename = this.list_leagues_unique[i].leaguename;
          var sub_strData = this.list_leagues_unique[i].begintime.substring(0,10); 
          var sub_strHora = ' ' + this.list_leagues_unique[i].begintime.substring(11,16)  
          obj.begintime = sub_strData + sub_strHora;
          coiso.push(obj);
          this.lista_jogos_pais = coiso;
          obj = {};
        }
      }

      console.log("JOGOS PAIS");
      console.log(this.lista_jogos_pais);
    },
    checknumformat(num){

      if(num.match()){
          return true;
      }
      else if(num.match()){
              return true;
          }
      else if(num.match()){
              return true;
          }
      else{
          return false
      }
    }, 
 
 },
};
</script>

<style >

.testeDialog{
  z-index:1005;
}

</style>

<style scoped>
.col-md-1 {
  flex: 0 0 8.3333333333%;
  max-width: 24.3333333333%;
}

/* butões das odds */
.v-btn:not(.v-btn--round).v-size--small {
  height: 36px;
  min-width: 10px;
  padding: 0 12.4444444444px;
}

/* butões de apostar e clear */
.v-btn:not(.v-btn--round).v-size--small[data-v-0efef83c][data-v-0efef83c] {
  height: 25px;
  min-width: 10px;
  padding: 0 12.4444444444px;
}

.v-dialog__container {
  display: unset;
} 
</style>

<style scoped>
/* Cor do botão */
.active {
  background-color: #afd29a;
} 

/* Cor green com shade #afd29a */
.v-application .green--text {
    color: #afd29a !important;
    caret-color: #afd29a !important;
}

</style>


