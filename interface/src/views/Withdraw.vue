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
                <v-btn class="white--text" primary large block style="background-color: #afd29a;" @click="deposit">Levantar</v-btn>
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
const authpath = require("@/config/hosts").hostAuthApi
import VueJwtDecode from "vue-jwt-decode";

  export default {
    data(){
      return {
        email : "",
        password : ""
      }
    },
    methods: {
      login: async function () {
        try {
        
        let response = await axios.post(authpath + "login", {email: this.email, password: this.password},{withCredentials: true});
        if(!response.data.login){
          this.password = ""
          alert("Crendenciais erradas, tente novamente.")
          return;
        } 
        let token = response.data.token;
        if (token) {
          localStorage.setItem("user", JSON.stringify(response.data.user))
          localStorage.setItem("jwt", token);
          alert("Login efetuado com sucesso");
       }
          this.$emit("refreshLogout")
       } 
       catch (err) {
        this.password = ""
        alert(err)
      }
      },
      registar: function(){
        this.$emit("registar");
      }
    }
  }
</script>