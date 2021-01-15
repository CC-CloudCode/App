<template>
    <v-app id="inspire" >
    <v-main class="grey lighten-3"> 
        <v-card class="pa-5" >

   <v-layout row class="text-xs-center pa-lg-16" justify-center align-center >
              
      <v-flex xs3>
        <v-icon color="#afd29a" size=200>mdi-cash-100</v-icon>
        
      </v-flex >
  <v-flex xs3>
        
    
        

              <v-form>
              <v-layout row>
              <v-text-field prepend-icon="mdi-currency-usd" v-model="cash" name="Dinheiro" label="Dinheiro" type="text" color="#000000"></v-text-field>
              </v-layout>
              <v-card-actions>
                <v-btn class="white--text" primary large block style="background-color: #afd29a;" @click="withdraw">Levantar</v-btn>
              </v-card-actions>
              </v-form>
                    
         
        </v-flex>

    </v-layout>
 </v-card>
    </v-main>
    </v-app>
</template>



<script>
import axios from "axios"
//const h = require("@/config/hosts").hostAPI
const dataApi = require("@/config/hosts").hostDataApi
import VueJwtDecode from "vue-jwt-decode";

  export default {
    data(){
      return {
        cash:0,
        user:{},
        token: ""
      }
    },
    props:["balance"],
    created: async function(){
      this.user = JSON.parse(localStorage.getItem("user"))
      this.token = localStorage.getItem("token")
    },
    methods: {
      withdraw: async function(){
        if(!Number.isNaN(this.cash) && this.cash > 0 ){
          if(this.cash <= this.balance){
            await axios.put(dataApi + "users/" +  this.user.iduser + "/balance/?token=" + this.token, {balance: -this.cash})
            this.$emit("refreshBalance")
          }
          else alert("Não pode levantar mais dinheiro do que aquele que tem!")
        }
        else{
          alert("Tem que ser um inteiro e maior que 0 !!")
        }
      }
    }
  }
</script>