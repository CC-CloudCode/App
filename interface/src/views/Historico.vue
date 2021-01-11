<template>
    <v-app id="inspire" >
        <v-main class="grey lighten-3 mt-3 pt-3">
            <v-container :key="id">      
                <v-card    
                    background-color="#111111"
                    elevation="1"
                    min-height="400"
                    width="70%"
                    class="mx-auto"
                >            
                    <v-card
                        max-width="650"
                        height="50"
                        color="#DCDCDC"
                        class="mx-auto ma-15"
                        
                    >
                        <v-row align-content="space-between" justify="space-around">
                            <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Montante apostado: {{this.dinheiroApostado}} </span>

                            <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Ganhos/Perdas: {{(this.dinheiroGanho - this.totalperdas).toFixed(2)}}</span>   

                        </v-row>
                    </v-card>

                    <!-- cabeçalho dos boletins-->
                    <div v-if="bets.length!=0">
                       
                        <!-- <v-expansion-panel v-model="bets" color="transparent" class="justify-center"> -->
                        <v-container class="pa-5" v-model="bets" v-for="(bet, index) in bets" :key="bet.idbet" >
                            
                    <v-card
                        min-width="550"
                        height="50"
                        class="mx-auto"
                        :style="{
                            backgroundColor:
                                bet.state == 1 
                                    ? 'green'
                                    : 'red',
                        }"
                        outlined
                        @click="showEventsBet(bet, index)" 
                    >
                        <v-row align-content="space-between" justify="space-around">
                            <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Aposta {{index+1}}</span>
                            <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Odd Total ({{bet.oddtotal}}) </span>  
                            <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Dinheiro Apostado ({{bet.money}}€)</span>  
                            <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Ganhos Possíveis ({{bet.dinheiroGanho}}€) </span>
                        </v-row>
                    </v-card>

                    <!-- sheet dos boletins-->
                    <v-container v-if="bet.showEvents">
                        
                        <v-container v-model="bet.events" v-for="(event,index) in bet.events" v-bind:key="event.idevent">
                        <v-card class="pa-3" outlined >
                            <v-card-title class="justify-center">
                                Jogo {{index+1}} ({{event.teamBet}})
                            </v-card-title>
                            <v-row align-content="space-between" justify="space-around">
                            <span> <v-img :src="event.eventBetApi.countryflag" width="20px"></v-img> </span>
                            <span> <v-img :src="event.eventBetApi.hometeamlogo" width="20px"></v-img> </span>
                            <span> {{event.eventBetApi.hometeamname}} </span> 
                            <span> vs </span>
                            <span> {{event.eventBetApi.awayteamname}} </span>
                            <span> <v-img :src="event.eventBetApi.awayteamlogo" width="20px"></v-img></span>
                            <span> Hora: {{event.eventBetApi.begintime}} </span>
                            <span> (Odd: {{event.odd}}) </span>
                            </v-row>
                        </v-card>
                        
                        
                        </v-container>
                    </v-container>

                        </v-container>
                    </div>
                    <div v-else>
                        <center><h3> Ainda não tem pelo menos uma aposta realizada.  </h3></center> 
                    </div>
             </v-card>
  
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Toolbar from '../components/Toolbar.vue'
import axios from 'axios'
const dataApi = require('@/config/hosts.js').hostDataApi
const betsApi = require('@/config/hosts.js').hostBetsApi


export default {
  components: { Toolbar },
    data(){
        return{
            bets:[],
            user:{},
            id: 0,
            dinheiroApostado:0,
            dinheiroGanho:0.0, 
            totalperdas: 0,
            colorbets: "",
            colors:[],
            events:[
                {
                idevent: 1,
                idbetapi :1,
                odd: 5.5,
                bettype:1,
                idbet:1,
                state:2,
                },
                {
                idevent: 2,
                idbetapi :2,
                odd: 7.5,
                bettype:2,
                idbet:1,
                state:2,
                },
                {
                idevent: 3,
                idbetapi :2,
                odd: 8.5,
                bettype:2,
                idbet:1,
                state:2,
                },
                {
                idevent: 5,
                idbetapi :2,
                odd: 10.5,
                bettype:2,
                idbet:1,
                state:2,
                },
                
            ],   
        }
    },
    watch: {
    '$route'() {
      // TODO: react to navigation event.
      // params cotains the current route parameters
      if(this.$route.name == 'Suas Apostas') this.refresh()
    }
    },
    created: async function(){
        this.refresh()
        
        // fixtures/
    },
    methods:{
        refresh: async function(){
            this.user = JSON.parse(localStorage.getItem("user"))
            var response = await axios.get(dataApi + "users/" + this.user.iduser + "/finishedbets")
            this.bets = response.data
            this.dinheiroApostado = 0
            this.dinheiroGanho = 0
            for(var i = 0; i < this.bets.length; i++){
                // se ganhou a aposta
                if(this.bets[i].state == 1){ 
                    this.bets[i].dinheiroGanho = 0
                    this.bets[i].dinheiroGanho = +((this.bets[i].money * this.bets[i].oddtotal).toFixed(2));
                    this.dinheiroApostado += this.bets[i].money;
                    this.dinheiroGanho += this.bets[i].dinheiroGanho
                    this.dinheiroGanho = +(this.dinheiroGanho).toFixed(2); 
                    this.bets[i].events = []
                    this.bets[i].showEvents = false;
                    this.bets[i].colorEvent = "#00000"
                // se perdeu a aposta
                } else { 
                    this.bets[i].dinheiroGanho = 0
                    this.bets[i].dinheiroGanho = +((this.bets[i].money * this.bets[i].oddtotal).toFixed(2));
                    this.dinheiroApostado += this.bets[i].money;
                    this.totalperdas += this.bets[i].money 
                    this.bets[i].events = []
                    this.bets[i].showEvents = false;
                    this.bets[i].colorEvent = "#00000"
                }

            }
            console.log(this.bets)
            //this.dinheiroApostado = Number(this.dinheiroApostado).toFixed(2)
        },
        changeColor: function(){
            this.id++
        },
        showEventsBet: async function(bet, index){
            //      sql.query("Select l.idleague as idleague, l.name as leaguename, l.logo as leaguelogo, c.idcountry as countrycode, f.idfixture as idfixture, 
            // f.begintime as begintime, f.homeTeam as hometeamid, f.awayTeam as awayteamid,f.state as state, f.oddHome as oddhome, f.oddaway as oddaway, f.odddraw as odddraw, 
            //c.name as countryname,c.flag as countryflag, t1.name as awayteamname, t2.name as hometeamname, t1.logo as awayteamlogo, t2.logo as hometeamlogo, f.scoreHome as scoreHome, 
            //f.scoreAway as scoreAway from league l, fixture f, country c, team t1, team t2
            // where l.idleague = f.idleague and l.idcountry = c.idcountry and f.awayTeam = t1.idteam and f.homeTeam = t2.idteam and f.idfixture = " + id, function (err, res) {
                
            if(!this.bets[index].showEvents){
                if(this.bets[index].events.length == 0){
                    var responseE = await axios.get(dataApi + "bets/" + bet.idbet + "/events")
                    this.bets[index].events = responseE.data
                    console.log(responseE.data)
                    
                    for(var i = 0; i < this.bets[index].events.length; i++){
                        var response = await axios.get(betsApi + "fixtures/" +this.bets[index].events[i].idbetapi )
                        this.bets[index].events[i].eventBetApi = response.data[0]
                        this.bets[index].events[i].eventBetApi.begintime = this.bets[index].events[i].eventBetApi.begintime.substr(0,19).replace('T', ' ') 
                        console.log(this.bets[index].events[i].bettype)
                        if(this.bets[index].events[i].bettype == 0){
                            this.bets[index].events[i].teamBet = response.data[0].hometeamname
                        }
                        else if(this.bets[index].events[i].bettype == 1){
                            this.bets[index].events[i].teamBet = "Empate"
                        }
                        else{
                            this.bets[index].events[i].teamBet = response.data[0].awayteamname
                        }
                    }
                    this.bets[index].showEvents = true
                    //this.colorbets = "#DCDCDC"
                    this.changeColor()
                }
                else{
                    this.bets[index].showEvents = true
                    this.changeColor()
                }
            }
            else{
                this.bets[index].showEvents = false
                this.changeColor()
            }
        }
    }
}
</script>

<style >
    .posicao{ top: 6.5px }
</style>