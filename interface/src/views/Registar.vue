<template>
 <div id="app">
  <v-parallax class="ma-0 pa-0 " dark  height="1050" :src="require('@/assets/wall2.jpg')">
  <v-container>
    <v-layout row class="text-xs-center">
        <v-container style="position: relative;top: 15%; width: 60%;" class="text-xs-center">
          <v-card class="pa-5">
            <center>
             <h2 primary-title style="color:#afd29a" class="justify-center ">
                Registo
            </h2>
            </center>
            <v-form>
            <v-text-field prepend-icon="mdi-card-account-details" v-model="username" name="Username" label="Username" color="#000000" :rules="[usernameExists]" required></v-text-field>
            <v-text-field prepend-icon="mdi-account" v-model="name" name="Nome" label="Nome" color="#000000" required></v-text-field>
            <v-text-field prepend-icon="mdi-email" v-model="email" name="Email" label="Email" color="#000000" :rules="[emailExists]" required></v-text-field>
            <v-text-field prepend-icon="mdi-calendar-question" v-model="birthdate" name="Data de Nascimento" label="Data de Nascimento" type="date" color="#000000" required></v-text-field>
            <v-text-field prepend-icon="mdi-key" v-model="password" name="Password" label="Password" type="password" color="#000000" required></v-text-field>
            <v-card-actions>
              <v-btn :disabled="disabledUsername || disabledEmail" class="white--text" primary large block style="background-color: #afd29a;" @click="registar">Confirmar</v-btn>
            </v-card-actions>
            </v-form>
            <v-card-actions class="justify-center">
            <v-btn  class="white--text" width=100 style="background-color: #afd29a;" @click="login">Voltar</v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
    </v-layout>
  </v-container> 
  </v-parallax>
</div>
</template>

<script>
  const h = require("@/config/hosts").hostDataApi
  import axios from "axios"
  export default {
    data(){
      return {
        name : "",
        birthdate : "",
        email : "",
        username : "",
        password : "",
        disabledUsername: false,
        disabledEmail: false,
        users:[],
        usernameExists: v =>{
          this.disabledUsername = false
          if(this.users.find(element => element.username == v)){
            this.disabledUsername = true
            return 'Esse username já está a ser utilizado!'
          }
          else return true
        },
        emailExists: v =>{
          this.disabledEmail = false
          if(this.users.find(element => element.email == v)){
            this.disabledEmail = true
            return 'Esse email já está a ser utilizado!'
          }
          else return true
        }
      }
    },
    created : async function() {
        try {
          var response = await axios.get(h + "users/")
          this.users = response.data
        } catch (e) {
        return e
        }
    },
     methods: {
       login: function(){
         this.$emit("login");
       },
      registar: function () {
          console.log(this.birthdate)
        if (this.name != "" && this.email != "" && this.username != "" && this.birthdate != "" && this.password != ""){ 
            let data = {
                name : this.name,
                email : this.email,
                username : this.username,
                birthdate : this.birthdate,
                password : this.password
            }
            axios.post(h + "users/", data)
                 .then(()=>{
                   alert('A sua conta foi criada com sucesso!\n Por favor efetue o login com as suas credenciais.')
                   this.$emit("login")
                 })
                .catch(erro=> console.log(erro))
            ///this.$store.dispatch('register', data)
            //.then(() => this.$router.push('/universidade'))
            //.catch(err => console.log(err))
        }
        else {
            alert('Ainda possuí campos por preencher!')
        }
      }
    }
  }
</script>

