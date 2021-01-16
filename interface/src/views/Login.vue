<template>

  <v-parallax class="ma-0 pa-0 " dark height="900" :src="require('@/assets/wall.jpg')">
  <v-container>
   <v-layout row class="text-xs-center pa-lg-16" justify-center align-center >
      <v-flex xs3>
        <v-img :src="require('@/assets/logo.png')" width="350px">
        </v-img>
      </v-flex>
      <v-flex xs3>
        
          <v-card class="pa-5">
              <v-form>
              <v-layout row>
                <v-flex xs11>
              <v-text-field prepend-icon="mdi-account" v-model="email" name="Email" label="Email" type="text" color="#000000"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
              <v-flex xs10>
              <v-text-field v-if="showPassword" prepend-icon="mdi-key" v-model="password" name="Password" label="Password" type="text" color="#000000"></v-text-field>
              <v-text-field v-else prepend-icon="mdi-key" v-model="password" name="Password" label="Password" type="password" color="#000000"></v-text-field>
              </v-flex>
              <v-flex xs1 class="pa-4">
              <v-icon v-if="showPassword" @click="showPassword=!showPassword">mdi-eye-off</v-icon>
              <v-icon v-else @click="showPassword=!showPassword">mdi-eye</v-icon>
              </v-flex>
              </v-layout>
              <v-card-actions>
                <v-btn class="white--text" primary large block style="background-color: #afd29a;" @click="login">Login</v-btn>
              </v-card-actions>
              </v-form>
          </v-card>
          <center><span> Ainda não possuí conta? </span> <span class="font-weight-bold black--text" @click="registar()" style="cursor: pointer;" > Registe-se aqui! </span></center>
        
      </v-flex>
    </v-layout>

    <center> 
    
    <v-card width="50%">
      <v-card-title primary-title style="color:#afd29a" class="justify-center ">
        Acerca de Nós
      </v-card-title>
      <center>
      <v-card-text style="color:black">
        Falta escrever alguma coisa. 
      </v-card-text>
      </center>
    </v-card> 
      
    </center>
</v-container>
  </v-parallax>

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
        password : "",
        showPassword: false
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