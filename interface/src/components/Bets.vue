<template>
<v-container>
    <v-container class="pa-5" v-model="bets" v-for="(bet, index) in bets" :key="bet.idbet" >
                            
                    <v-card
                        min-width="550"
                        height="50"
                        class="mx-auto"
                        :color="colorbets"
                        outlined
                    >
                        <v-row align-content="space-between" justify="space-around">
                            <v-btn @click="selectBet(bet.idbet)"> Selecionar </v-btn>
                            
                             
                            <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Aposta {{index+1}}</span>
                            <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Odd Total ({{bet.oddtotal}}) </span>  
                            <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Dinheiro Apostado ({{bet.money}}€)</span>  
                            <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Dinheiro que Ganha ({{bet.dinheiroGanho}}€) </span>
                            <v-icon @click="showEventsBet(bet, index)">mdi-chevron-down</v-icon>
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
                         </v-container>
                    </v-container>
               
</template>

<script>
import axios from 'axios'
const dataApi = require('@/config/hosts.js').hostDataApi
const betsApi = require('@/config/hosts.js').hostBetsApi


export default {
    data(){
        return{
            bets:[],
            user:{},
            token:"",
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
    created: async function(){
        this.refresh()
        
        // fixtures/
    },
    methods:{
        refresh: async function(){
            this.user = JSON.parse(localStorage.getItem("user"))
            this.token = localStorage.getItem("jwt")
            var response = await axios.get(dataApi + "users/" + this.user.iduser + "/bets" + "/?token=" + this.token)
            this.bets = response.data
            for(var i = 0; i < this.bets.length; i++){
                this.bets[i].dinheiroGanho = parseFloat(this.bets[i].money * this.bets[i].oddtotal)
                this.dinheiroApostado += this.bets[i].money;
                this.dinheiroGanho += this.bets[i].dinheiroGanho
                this.bets[i].events = []
                this.bets[i].showEvents = false;
                this.bets[i].colorEvent = "#00000"
            }
        },
        selectBet(idBet){
            this.$emit("selectBet",idBet)
        },
        changeColor: function(){
            if(this.colorbets == "#DCDCDC"){
                this.colorbets = "#dcdcdd"
            }
            else{
                this.colorbets = "#DCDCDC"
            }
        },
        showEventsBet: async function(bet, index){
           
            if(!this.bets[index].showEvents){
                if(this.bets[index].events.length == 0){
                    var responseE = await axios.get(dataApi + "bets/" + bet.idbet + "/events" + "/?token=" + this.token)
                    this.bets[index].events = responseE.data
                    
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
