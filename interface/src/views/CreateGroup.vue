<template>
<v-app id="inspire" >
    <v-main class="grey lighten-3 mt-10 pt-10">
    <v-container grid-list-md>      
      <v-card      
        class="mx-auto justify-center pa-5"
        max-width="600"
        min-width="400"
      >

        <v-card-title class="justify-center">
          Criar Grupo
        </v-card-title>

        <!--IMAGEM-->

        <!--Conteúdo-->
        

         <v-text-field prepend-icon="mdi-account-" v-model="name" name="Nome" label="Nome" color="#000000" :rules="[nameExists]" required></v-text-field>

        <!--Buttons-->
        <br>

        <v-btn primary large block :color="color" @click="createGroup()"> Confirmar </v-btn>

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
        //user_credentials: {
        //avatar: 'https://unsplash.it/100/100',
        color: "#afd29a",
        groups:[],
        name: "",
        nameExists: v  => {
          if (this.groups.find(element=> element.name == v)) return 'Esse nome já existe! Tente outro nome por favor.';
          return true;
        },
        token: "",
        user: {}

      }
    },

  created: async function() {
     this.user = JSON.parse(localStorage.getItem("user"))
     this.token = localStorage.getItem("jwt")
     var response = await axios.get(dataApi + "groups/?token=" + this.token)
     this.groups = response.data
     
  },

   methods: {
       createGroup: async function(){
           if(this.groups.find(element=> element.name == this.name)){
               alert('Esse nome já existe! Tente outro nome por favor.');
               
           }
           else{
               var response = await axios.post(dataApi + "groups/?token=" + this.token, {createdby: this.user.iduser, name: this.name})
               var id = response.data
               await axios.post(dataApi + "groups/" + id + "/member", {iduser: this.user.iduser})
               this.$router.push({name: 'Grupo', params:{ id : id}})
           }
           return;
       },
       groupExists: async function(){
           if(this.groups.find(element=> element.name == this.name)) return true
           else return false
       }
  }

}

</script>

<style>
   .uploading-image{
     display:flex;
   }
 </style>
