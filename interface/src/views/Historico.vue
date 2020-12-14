<template>
    <v-app id="inspire" >
        <v-main class="grey lighten-3 mt-3 pt-3">
            <v-container >      
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
                            <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Montante apostado  </span>

                            <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Ganhos/Perdas </span>  

                        </v-row>
                    </v-card>

                    <v-card
                        min-width="550"
                        height="50"
                        class="mx-auto"
                        color="#DCDCDC"
                        outlined

                    >
                        <v-row align-content="space-between" justify="space-around">
                            <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Aposta </span>
                            <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Retorno </span>  
                            <v-btn
                                    depressed
                                    color="green"
                                    class="posicao black--text"

                                >
                                    Ganha
                            </v-btn>  
                            
                            <v-btn
                                depressed
                                color="red"
                                class="posicao black--text" 
                          
                            >
                                Perde
                            </v-btn>
                            
                        </v-row>
                    </v-card>
                    <!--
                    <v-container v-if="bet.showEvents">
                        
                        <v-container v-model="bet.events" v-for="(event,index) in bet.events" v-bind:key="event.idevent"> -->
                        <v-card class="pa-3" outlined>
                            <v-card-title class="justify-center">
                                Jogo 
                            </v-card-title>
                            <v-row align-content="space-between" justify="space-around">
                           <!-- <span> <v-img :src="event.eventBetApi.countryflag" width="20px"></v-img> </span>
                            <span> <v-img :src="event.eventBetApi.hometeamlogo" width="20px"></v-img> </span>
                            <span> {{event.eventBetApi.hometeamname}} </span> 
                            <span> vs </span>
                            <span> {{event.eventBetApi.awayteamname}} </span>
                            <span> <v-img :src="event.eventBetApi.awayteamlogo" width="20px"></v-img></span> -->
                            <span> Hora:  </span>
                            <span> Odd:   </span>
                            </v-row>
                        </v-card>
                        
                         <!--
                        </v-container>
                    </v-container> -->
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

  }

}

</script>

<style >
    .posicao{ top: 6.5px }
</style>