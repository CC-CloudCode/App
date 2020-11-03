<template>
  
    <v-layout row class="text-xs-center" justify-center align-center>
      <v-flex xs4 class="grey lighten-4">
        <v-container style="position: relative;top: 13%;" class="text-xs-center">
          <material-card              
          color="#900000"
          title="Login"
        >
            <v-form>
            <v-text-field prepend-icon="mdi-account" v-model="email" name="Email" label="Email" ></v-text-field>
            <v-text-field prepend-icon="mdi-key" v-model="password" name="Password" label="Password" type="password"></v-text-field>
            <v-card-actions>
              <v-btn primary large block style="background-color: #900000;" @click="login">Login</v-btn>
            </v-card-actions>
            </v-form>
          </material-card>
          <center><v-text> Ainda não possuí conta? </v-text> <span class="font-weight-bold black--text" @click="registar()" style="cursor: pointer;" > Registe-se já! </span></center>
        </v-container>
      </v-flex>
    </v-layout>
  
</template>




        <v-container>
                    <v-btn icon>
                <v-icon>mdi-home</v-icon>
            </v-btn>
            </v-container>

<v-container>
                    <v-btn icon>
                <v-icon>mdi-home</v-icon>
            </v-btn>
            </v-container>
            <v-container>
                <span>
            <a> Jogos </a>
                </span>
                </v-container>
                <v-container>
               <span>
            <a> Suas Apostas </a>
              </span>
              </v-container>
              <v-container>
              <span>
            <a> Seus Rascunhos </a>
            </span>
            </v-container>
            <v-container>
            <v-btn > Carregar Dinheiro </v-btn>
            </v-container>
            <v-container>
            <v-btn > Personal Score </v-btn>
            </v-container>
            <v-spacer>
            <v-toolbar-title>Luizz</v-toolbar-title>
            <v-toolbar-title>100000$</v-toolbar-title>
            </v-spacer>
            <container class="pl-5">
            <v-btn icon>
                <v-icon>mdi-account</v-icon>
            </v-btn>
            <!--
                <v-avatar
                                    slot="offset"
                                    class="mx-auto d-block"
                                >
                                <v-icon>mdi-account</v-icon>
                </v-avatar>
                -->
            </container>


<script>
import axios from "axios"
//const h = require("@/config/hosts").hostAPI
//const authpath = require("@/config/hosts").auth
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
            localStorage.setItem("authenticated", true)
        /*
        let response = await axios.post(authpath + "login", {idUtilizador: this.email, password: this.password},{withCredentials: true});
        if(!response.data.authentication){
          this.password = ""
          alert("Crendenciais erradas, tente novamente.")
          return;
        } 
        let token = response.data.token;
        if (token) {
          localStorage.setItem("utilizador", JSON.stringify(response.data.utilizador))
          let utilizador = JSON.parse(localStorage.getItem("utilizador"))
          localStorage.setItem("jwt", token);
          alert("Login efetuado com sucesso");
          this.$emit("refreshLogout")
          this.$router.push("/universidade");
       }*/
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