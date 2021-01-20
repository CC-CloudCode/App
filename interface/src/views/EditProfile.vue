<template>
<v-app id="inspire" >
    <v-main class="grey lighten-3 mt-10 pt-10">
    <v-container grid-list-md>      
      <v-card      
        class="mx-auto justify-center pa-5"
        width="700"
        height="700"
      >

        <v-card-title class="justify-center">
          <v-icon
            large         
          >

          </v-icon>
          <span class="title font-weight-bold black--text">Editar Perfil</span>
        </v-card-title>

        <!--IMAGEM-->
        <center>
          <v-list-item-avatar class="justify-center" size="90">
            <v-img
              class="elevation-6"
              :src="user.profileImg"
            ></v-img>
            
          </v-list-item-avatar>
        </center>

          <v-card-title class="justify-center">
            Username: {{user.username}}
          </v-card-title>

        <!--Conteúdo-->       
        <v-row class="justify-center">
         <v-switch color="gray" :input-value="user.private" @change="updatePrivate"></v-switch>
         <h4 v-if="user.private" style="padding-top:3%"> Conta Privada </h4>
         <h4 v-else style="padding-top:3%"> Conta Pública </h4>
        </v-row>
         <v-text-field prepend-icon="mdi-account" v-model="user.name" name="Nome" label="Nome" color="#000000" required></v-text-field>
         <v-text-field prepend-icon="mdi-email" v-model="user.email" name="Email" label="Email" color="#000000" :rules="[emailExists]" required></v-text-field>
         <v-text-field prepend-icon="mdi-calendar-question" v-model="user.birthdate" name="Data de Nascimento" label="Data de Nascimento" type="date" color="#000000" required></v-text-field>

         <center><v-btn class="white--text" :color="color" @click="dialogPassword = true"> Alterar password </v-btn></center>
        <!--Buttons-->

        <v-dialog
            v-model="dialogPassword"
            width="40%"
            style="z-index:1010"
            >
                <v-card class="pa-5">
                  <v-card-title primary-title class="justify-center green--text" >
                  Alterar Password
                  </v-card-title>
                  <v-text-field label="Password Nova" placeholder="Password nova" v-model="password1" color="#000000" type="password" required />
                  <v-text-field label="Confirmação Password" placeholder="Confirmação Password" v-model="password2" color="#000000" type="password" required />
                  <v-btn class="white--text" primary large block :color="color" @click="editarPassword()">Confirmar alteração</v-btn>
                </v-card>
          </v-dialog>    
      
          <v-row          
            align="center"
            justify="space-around"
            class="ma-15"
            >        
            
            <v-btn :disabled="disabled" class="white--text pa-5" :color="color" @click="updateProfile()"> Guardar </v-btn>

            <v-btn class="white--text pa-5" :color="color" @click="reset()"> Cancelar </v-btn>

          </v-row>         

      </v-card>    
    </v-container>
    </v-main>
</v-app>
</template>

<script>
//import de componentes se necessário
import axios from "axios"
const dataApi = require('@/config/hosts.js').hostDataApi

export default {

    components:{

  },
    data(){
      return {
        color: "#afd29a",
        user:{
        },
        idUser:0,
        dialogPassword: false,
        password1: "",
        password2: "",
        token:"",
        disabled:false,
        email:"",
        users:[],
        emailExists: v =>{
          this.disabled = false
          if(this.users.find(element => element.email == v)){
            if(v != this.email){
              this.disabled = true
              return 'Esse email já está a ser utilizado!'
            }
            else return true
          }
          else return true
        }
      }
    },
     watch: {
    '$route'() {
      // TODO: react to navigation event.
      // params cotains the current route parameters
      if(this.$route.name == "Editar Perfil") this.refresh()
    }
  }, 

  created: async function() {
     this.refresh()
  },

   methods: {    
    refresh: async function(){
      this.idUser = JSON.parse(localStorage.getItem("user")).iduser
      this.token = localStorage.getItem("jwt")
      var response = await axios.get(dataApi + "users/" + this.idUser + "/?token=" + this.token)
      this.user = response.data
      this.email = this.user.email
      var response2 = await axios.get(dataApi + "users/")
      this.users = response2.data
      this.user.profileImg = dataApi + "images/" + this.idUser
     
    },
    updateProfile: async function(){
      await axios.put(dataApi + "users/" + this.idUser + "/?token=" + this.token, this.user)
      this.$router.push({name: "Meu Perfil"})

    },

    updatePrivate: async function(id){
         await axios.put(dataApi + "users/" + this.user.iduser + "/privacy/?token=" + this.token)
         var response = await axios.get(dataApi + "users/" + this.user.iduser + "/?token=" + this.token)
         this.user = response.data
         return;
     }, 
    
    reset: async function(){
      var response = await axios.get(dataApi + "users/" + this.idUser + "/?token=" + this.token)
      this.user = response.data
      
      this.user.profileImg = dataApi + "images/" + this.idUser
      this.$router.push({name: "Meu Perfil"})
    },
     editarPassword : async function(){
          if(this.password1 != "" && this.password2 != ""){
            if(this.password1 == this.password2){
              if(confirm("Tem a certeza que pretende alterar a sua password?")){
                await axios.put(dataApi + "users/" + this.idUser + "/password/?token=" + this.token, {password: this.password1})
                this.dialogPassword = false
              }
            }
            else{
              this.password2 = ""
              alert("As palavra passe de confirmação não coincide com a palavra passe primeiramente definida!")
            }
          }
          else alert("Tem de preencher os dois campos!")
      },
  }
}
</script>

