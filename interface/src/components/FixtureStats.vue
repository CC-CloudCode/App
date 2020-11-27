<template>
    <v-dialog v-model="dialog" width="700">
        <template v-slot:activator="{ on }">
          <v-btn
            v-for="(item, index) in data"
            v-bind:key="item.idcountry + index"
            class="d-flex justify-space-between"
            text
            small
            color="#F55C5C"
            v-on="on"
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
          >
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon dark v-bind="attrs" v-on="on">
                  mdi-chart-box-outline
                </v-icon>
              </template>
              <span>Ver estatísticas</span>
            </v-tooltip>
          </v-btn>
        </template>

                      <v-card>
                        <!--
                          <v-card-title class="headline red--text">{{league_name}}  <v-img v-bind:src="infototal[0].leaguelogo" max-width="25" max-height="25"></v-img> <p> Estatísticas {{statshometeam}} vs {{statsawayteam}} </p></v-card-title>
                          -->
                        <v-card-title class="headline red--text"
                          >{{ league_name }}
                          <p>
                            Estatísticas {{ statshometeam }} vs
                            {{ statsawayteam }}
                          </p></v-card-title
                        >
                        <v-divider class="mx-4" horizontal></v-divider>

                        <div
                          v-if="hometeamstats != null || awayteamstats != null"
                        >
                          <v-card-text>
                            <v-simple-table dense fixed-header height="300px">
                              <template v-slot:default>
                                <thead>
                                   <tr>
                                    
                                    <th class="text-left"></th>
                                    <th class="text-left">
                                      Equipa
                                    </th>
                                    <th class="text-left">
                                      Posição
                                    </th>
                                    <th class="text-left">
                                      Pontos
                                    </th>
                                    <th class="text-left"> 
                                      Jogos Jogados
                                    </th> 
                                    <th class="text-left"> 
                                      Vitórias
                                    </th>
                                    <th class="text-left"> 
                                      Empates
                                    </th> 
                                    <th class="text-left"> 
                                      Derrotas
                                    </th>
                                    <th class="text-left"> 
                                      Golos Marcados
                                    </th> 
                                    <th class="text-left"> 
                                      Golos Sofridos 
                                    </th> 
                                    <th class="text-left"> 
                                      Diferença de Golos 
                                    </th> 


                                  </tr>
                                </thead>
                                <tbody>
                                  
                                  <tr
                                    v-for="item in standings"
                                    :key="item.teamname"
                                  >
                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#F55C5C'
                                            : 'transparent',
                                      }"
                                    >
                                      <v-img
                                        v-bind:src="item.teamlogo"
                                        width="20px"
                                      ></v-img>
                                    </td>
                                    
                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#F55C5C'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.teamname }}
                                    </td>
                                    
                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#F55C5C'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.position }}
                                    </td>
                                    
                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#F55C5C'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.points }}
                                    </td> 

                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#F55C5C'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.matchsPlayedTotal }}
                                    </td> 

                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#F55C5C'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.winsTotal }}
                                    </td> 
                                    
                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#F55C5C'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.losesTotal }}
                                    </td> 
                                    
                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#F55C5C'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.drawsTotal }}
                                    </td> 

                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#F55C5C'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.goalsForTotal }}
                                    </td> 

                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#F55C5C'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.goalsAgainstTotal }}
                                    </td> 

                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#F55C5C'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.goalsDiff }}
                                    </td>
                                    
                                    

                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>

                            <v-row align="start" justify="center">
                              <v-col>
                               
                                <p>
                                  {{
                                    this.hometeamstats.matchsPlayedHome
                                  }}
                                  Jogos jogados em casa
                                </p>

                                <p>
                                  {{
                                    this.hometeamstats.matchsPlayedAway
                                  }}
                                  Jogos jogados fora de casa
                                </p>

                                <p>
                                  {{ this.hometeamstats.winsHome }} Vitórias em
                                  casa
                                </p>

                                <p>
                                  {{ this.hometeamstats.winsAway }} Vitórias
                                  fora
                                </p>

                                <p>
                                  {{ this.hometeamstats.losesHome }} Derrotas
                                  casa
                                </p>

                                <p>
                                  {{ this.hometeamstats.losesAway }} Derrotas
                                  fora
                                </p>

                                <p>
                                  {{ this.hometeamstats.drawsAway }} Empates
                                  fora
                                </p>
                                
                                <p>
                                  {{ this.hometeamstats.drawsHome }} Empates
                                  casa
                                </p>
                                
                                <p>
                                  {{ this.hometeamstats.goalsForHome }} Golos
                                  marcados em casa
                                </p>
                                
                                <p>
                                  {{ this.hometeamstats.goalsForAway }} Golos
                                  marcados fora de casa
                                </p>
                                
                                <p>
                                  {{
                                    this.hometeamstats.goalsAgainstHome
                                  }}
                                  Golos sofridos em casa
                                </p>
                                
                                <p>
                                  {{
                                    this.hometeamstats.goalsAgainstAway
                                  }}
                                  Golos sofridos fora
                                </p>

                                 <p>
                                  {{Math.round((this.hometeamstats.goalsForHome / this.hometeamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos marcados em casa
                                </p>

                                <p>
                                  {{Math.round((this.hometeamstats.goalsForAway / this.hometeamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos marcados fora de casa
                                </p>
                                
                                 <p>
                                  {{Math.round((this.hometeamstats.goalsAgainstHome / this.hometeamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos sofridos em casa
                                </p>  

                                <p>
                                  {{Math.round((this.hometeamstats.goalsAgainstAway / this.hometeamstats.matchsPlayedAway+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos sofridos fora de casa
                                </p>

                                <p>
                                  {{Math.round((this.hometeamstats.goalsForTotal / this.hometeamstats.matchsPlayedTotal+ Number.EPSILON) * 100) / 100 }}
                                  Média de golos marcados
                                </p>
                                
                                <p>
                                   {{Math.round((this.hometeamstats.goalsAgainstTotal / this.hometeamstats.matchsPlayedTotal+ Number.EPSILON) * 100) / 100 }}
                                  Média de golos sofridos total
                                </p>
                                
                              </v-col>

                              <v-col>
                                                                
                                <p>
                                  {{
                                    this.awayteamstats.matchsPlayedHome
                                  }}
                                  Jogos jogados em casa
                                </p>

                                <p>
                                  {{
                                    this.awayteamstats.matchsPlayedAway
                                  }}
                                  Jogos jogados fora de casa
                                </p>

                                <p>
                                  {{ this.awayteamstats.winsHome }} Vitórias em
                                  casa
                                </p>

                                <p>
                                  {{ this.awayteamstats.winsAway }} Vitórias
                                  fora
                                </p>

                                <p>
                                  {{ this.awayteamstats.losesHome }} Derrotas
                                  casa
                                </p>

                                <p>
                                  {{ this.awayteamstats.losesAway }} Derrotas
                                  fora
                                </p>

                                <p>
                                  {{ this.awayteamstats.drawsAway }} Empates
                                  fora
                                </p>
                                
                                <p>
                                  {{ this.awayteamstats.drawsHome }} Empates
                                  casa
                                </p>
                                
                                <p>
                                  {{ this.awayteamstats.goalsForHome }} Golos
                                  marcados em casa
                                </p>
                                
                                <p>
                                  {{ this.awayteamstats.goalsForAway }} Golos
                                  marcados fora de casa
                                </p>
                                
                                <p>
                                  {{
                                    this.awayteamstats.goalsAgainstHome
                                  }}
                                  Golos sofridos em casa
                                </p>
                                
                                <p>
                                  {{
                                    this.awayteamstats.goalsAgainstAway
                                  }}
                                  Golos sofridos fora
                                </p>

                                                               <p>
                                  {{Math.round((this.awayteamstats.goalsForHome / this.awayteamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos marcados em casa
                                </p>

                                <p>
                                  {{Math.round((this.awayteamstats.goalsForAway / this.awayteamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos marcados fora de casa
                                </p>
                                
                                 <p>
                                  {{Math.round((this.awayteamstats.goalsAgainstHome / this.awayteamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos sofridos em casa
                                </p>  

                                <p>
                                  {{Math.round((this.awayteamstats.goalsAgainstAway / this.awayteamstats.matchsPlayedAway+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos sofridos fora de casa
                                </p>

                                <p>
                                  {{Math.round((this.awayteamstats.goalsForTotal / this.awayteamstats.matchsPlayedTotal+ Number.EPSILON) * 100) / 100 }}
                                  Média de golos marcados
                                </p>
                                
                                <p>
                                   {{Math.round((this.awayteamstats.goalsAgainstTotal / this.awayteamstats.matchsPlayedTotal+ Number.EPSILON) * 100) / 100 }}
                                  Média de golos sofridos total
                                </p>
                                
                                
                              </v-col>
                            </v-row>

                            <!-- H2H TABELA -->
                            <v-simple-table dense fixed-header height="300px">
                              <template v-slot:default>
                                <thead>
                                  <tr>
                                    <th class="text-left">
                                      Data
                                    </th>
                                    <th class="text-left">
                                      Equipa Casa
                                    </th>
                                    <th class="text-left">
                                      Resultado
                                    </th>
                                    <th class="text-left">
                                      Equipa Fora
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="item in h2h" :key="item.idfixture">
                                    <td>{{ item.date.substring(0, 10) }}</td>
                                    <td v-if="id_home_team == item.homeTeamId">
                                      {{ statshometeam }}
                                    </td>
                                    <td v-else>{{ statsawayteam }}</td>
                                    <td>{{ item.score }}</td>
                                    <td v-if="id_away_team == item.awayTeamId">
                                      {{ statsawayteam }}
                                    </td>
                                    <td v-else>{{ statshometeam }}</td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
                          </v-card-text>
                        </div>

                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                depressed
                                color="white"
                                @click="dialog = false"
                                v-on="on"
                              >
                                <v-icon large>mdi-door-open</v-icon>
                              </v-btn>
                            </template>
                            <span>Lorem impsum</span>
                          </v-tooltip>
                        </v-card-actions>
                      </v-card>
                    
            </v-dialog>
</template> 

<script> 
import axios from "axios";
const betspath = require("@/config/hosts").hostBetsApi;

    export default { 
        
        props: ['data'],
        
        data(){ 
            return { 
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
        
        methods: {
             
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
                        console.log("statssssssssssssssssssssssssssssssssssssssssssssss");
                        console.log(responses[0])
            
                        this.standings = responses[0].data 
                        this.h2h = responses[1].data
            
                        this.hometeamstats = this.standings.find(x => x.idteam == idhome) 
                        this.awayteamstats = this.standings.find(x => x.idteam == idaway)  
            
                        console.log(this.hometeamstats)
            
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
                   
                        this.dialog = true;
                      })
                    )
                    .catch((err) => {
                      this.error = err.message;
                    });
                }
            }
    }
</script>