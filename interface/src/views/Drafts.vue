<template>
    <v-app id="inspire" >
        <v-main class="grey lighten-3 mt-10 pt-10">
            <v-container >      
                <v-card    
                    background-color="#111111"
                    elevation="1"
                    min-height="400"
                    width="70%"
                    class="mx-auto"
                >            
                    
                    <!-- cabeçalho dos boletins-->
                    <div v-if="drafts.length!=0">
                        <v-card-title class="justify-center" style="color:#afd29a">
                            Lista de Rascunhos ({{drafts.length}})
                        </v-card-title>
                        <v-container class="pa-5" v-model="drafts" v-for="(bet, index) in drafts" :key="bet.idbet" >
                            
                    <v-card
                        min-width="550"
                        height="50"
                        class="mx-auto"
                        :color="colorbets"
                        outlined
                        @click="showEventsBet(bet, index)"
                    >
                        <v-row align-content="space-between" justify="space-around">
                            <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Rascunho {{index+1}}</span>
                            <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px;"> Odd Total ({{bet.oddtotal.toFixed(2)}}) </span> 
                            
                            <v-menu  offset-y  >
                            <template v-slot:activator="{ on }">
                                <v-btn  fab text small v-on="on">
                                        <v-icon>mdi-chevron-down</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                    <v-list-item v-for= "link in links" :key="link.text" @click="doSomething(link.text, bet)">
                                        <v-list-item-title>{{link.text}}</v-list-item-title>
                                    </v-list-item>
                            </v-list>
                            </v-menu>
                        </v-row>
                    </v-card>

                    <!-- sheet dos boletins-->
                    <v-container v-if="bet.showEvents">
                        
                        <v-container v-model="bet.events" v-for="(event,index) in bet.events" v-bind:key="event.idevent">
                        <v-card class="pa-3" outlined>
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
                    <!-- cabeçalho dos boletins no fim-
                    <v-card
                        max-width="550"
                        height="50"
                        class="mx-auto ma-5" 
                        color="#DCDCDC"                   
                    >
                        <v-row  justify="space-around">
                            <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Boletim1 </span>
                            <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Odd Total </span>  
                            <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Dinheiro Apostado </span>  
                            <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Dinheiro que Ganha </span> 
                        </v-row>
                    </v-card>
                    -->
                        </v-container>
                    </div>
                    <div v-else>
                        <center><h3> Não possuí rascunhos guardados.  </h3></center> 
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
            drafts:[],
            user:{},
            links:[
                {text: 'Colocar no boletim'},
                {text: 'Apagar rascunho'}
            ],
            dinheiroApostado:0,
            dinheiroGanho:0.0,
            colorbets: "#DCDCDC",
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
      if(this.$route.name == 'Seus Rascunhos') this.refresh()
    }
    },
    created: async function(){
        this.refresh()
        
        // fixtures/
    },
    methods:{
        refresh: async function(){
            this.user = JSON.parse(localStorage.getItem("user"))
            var response = await axios.get(dataApi + "users/" + this.user.iduser + "/drafts")
            this.drafts = response.data
            for(var i = 0; i < this.drafts.length; i++){
                //this.drafts[i].dinheiroGanho = parseFloat(this.drafts[i].money * this.drafts[i].oddtotal)
                //this.dinheiroApostado += this.drafts[i].money;
                //this.dinheiroGanho += parseFloat(this.drafts[i].money * this.drafts[i].oddtotal)
                await this.getEvents(this.drafts[i], i)
                this.drafts[i].showEvents = false;
            }
        },
        changeColor: function(){
            if(this.colorbets == "#DCDCDC"){
                this.colorbets = "#dcdcdd"
            }
            else{
                this.colorbets = "#DCDCDC"
            }
        },
        getEvents: async function(bet, index){
            var responseE = await axios.get(dataApi + "drafts/" + bet.idbet + "/events")
            this.drafts[index].events = responseE.data
            this.drafts[index].oddtotal = 1
            for(var i = 0; i < this.drafts[index].events.length; i++){
                
                var response = await axios.get(betsApi + "fixtures/" +this.drafts[index].events[i].idbetapi )
                this.drafts[index].events[i].eventBetApi = response.data[0]
                
                this.drafts[index].events[i].eventBetApi.begintime = this.drafts[index].events[i].eventBetApi.begintime.substr(0,19).replace('T', ' ') 
                console.log(this.drafts[index].events[i].bettype)
                if(this.drafts[index].events[i].bettype == 0){
                    this.drafts[index].events[i].teamBet = response.data[0].hometeamname
                    this.drafts[index].events[i].odd = this.drafts[index].events[i].eventBetApi.oddhome
                    this.drafts[index].oddtotal = this.drafts[index].oddtotal * this.drafts[index].events[i].eventBetApi.oddhome
                }
                else if(this.drafts[index].events[i].bettype == 1){
                    this.drafts[index].events[i].teamBet = "Empate"
                    this.drafts[index].events[i].odd = this.drafts[index].events[i].eventBetApi.odddraw
                    this.drafts[index].oddtotal = this.drafts[index].oddtotal * this.drafts[index].events[i].eventBetApi.odddraw
                }
                else{
                    this.drafts[index].events[i].teamBet = response.data[0].awayteamname
                    this.drafts[index].events[i].odd = this.drafts[index].events[i].eventBetApi.oddaway
                    this.drafts[index].oddtotal = this.drafts[index].oddtotal * this.drafts[index].events[i].eventBetApi.oddaway
                }
            }
        },
        showEventsBet: async function(bet, index){
            //      sql.query("Select l.idleague as idleague, l.name as leaguename, l.logo as leaguelogo, c.idcountry as countrycode, f.idfixture as idfixture, 
            // f.begintime as begintime, f.homeTeam as hometeamid, f.awayTeam as awayteamid,f.state as state, f.oddHome as oddhome, f.oddaway as oddaway, f.odddraw as odddraw, 
            //c.name as countryname,c.flag as countryflag, t1.name as awayteamname, t2.name as hometeamname, t1.logo as awayteamlogo, t2.logo as hometeamlogo, f.scoreHome as scoreHome, 
            //f.scoreAway as scoreAway from league l, fixture f, country c, team t1, team t2
            // where l.idleague = f.idleague and l.idcountry = c.idcountry and f.awayTeam = t1.idteam and f.homeTeam = t2.idteam and f.idfixture = " + id, function (err, res) {
            
            if(!this.drafts[index].showEvents){
                if(this.drafts[index].events.length == 0){
                    await this.getEvents()
                    this.drafts[index].showEvents = true
                    this.changeColor()
                }
                else{
                    this.drafts[index].showEvents = true
                    this.changeColor()
                }
            }
            else{
                this.drafts[index].showEvents = false
                this.changeColor()
            }
        },
        doSomething: async function(text, draft){
            if(text == 'Colocar no boletim'){
                // fazer depois
            }
            else{
                if(confirm("Tem a certeza que deseja apagar o rascunho?")){
                    await axios.delete(dataApi + "drafts/" + draft.idbet)
                    this.drafts.splice(draft, 1)
                }
            }
        }
    }
}
</script>