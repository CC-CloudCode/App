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
              <!--  -->
              <v-btn text v-for="(item,index) in countries" v-bind:key="item.idcountry + index">
                {{item.name}}
              </v-btn>
            
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
              <p>Jogos</p>
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
    data(){
      return {
        countries : []
      }
    },
    mounted: function() {
    axios
      .get(betspath + 'countries')
      .then(dados => {
        this.countries = dados.data;
      })
      .catch(err => {
        this.error = err.message;
      });
  }, 
  }
</script>