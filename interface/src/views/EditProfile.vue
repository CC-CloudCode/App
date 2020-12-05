<template>
<v-app id="inspire" >
    <v-main class="grey lighten-3">
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
          <v-list-item-avatar class="justify-center" color="grey darken-3" size="90">
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
        

         <v-text-field prepend-icon="mdi-account" v-model="user.name" name="Nome" label="Nome" color="#000000" required></v-text-field>
         <v-text-field prepend-icon="mdi-email" v-model="user.email" name="Email" label="Email" color="#000000" required></v-text-field>
         <v-text-field prepend-icon="mdi-calendar-question" v-model="user.birthdate" name="Data de Nascimento" label="Data de Nascimento" type="date" color="#000000" required></v-text-field>

         <center><v-btn class="white--text" :color="color" @click="dialogPassword = true"> Alterar password </v-btn></center>
        <!--Buttons-->

        <v-dialog
            v-model="dialogPassword"
            width="40%"
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
    
        <v-bottom-navigation
          absolute>

          <v-row          
            align="center"
            justify="space-around">        

            <v-btn 
              @click="updateProfile()"
              
              elevation="6"
              :color="color"
            >
            Guardar
            </v-btn>

            <v-btn  
              @click="reset()"
              
              elevation="6"
              :color="color"
            >
            Cancelar
            </v-btn>

          </v-row> 
        </v-bottom-navigation>     

        <!--
        <v-card-actions>
          <v-btn
          text
          >
            Guardar
          </v-btn>

          <v-btn 
            text
          >
            Cancelar
          </v-btn>
        </v-card-actions>
        -->

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
        user:{
        },
        idUser:0,
        dialogPassword: false,
        password1: "",
        password2: "",

      }
    },

  created: async function() {
     this.idUser = JSON.parse(localStorage.getItem("user")).iduser
     var response = await axios.get(dataApi + "users/" + this.idUser)
     this.user = response.data
     this.user.profileImg = dataApi + "images/" + this.idUser
     
  },

   methods: {
    changeAvatar() {
      const input = document.createElement('input');
      let self = this;
      input.setAttribute("type", "file");
      input.addEventListener('change', function(e) {
        // uploading code from this fiddle: http://jsfiddle.net/vacidesign/ja0tyj0f/
        if (this.files && this.files[0]) {
          var reader = new FileReader();
          reader.onload = function(e) {
            // image is loaded callback
            self.user.profileImg = e.target.result;
            // here you can post the data to your backend...
          };
          reader.readAsDataURL(this.files[0]);
        }
      })
      input.click(); // opening dialog

      return false; // avoiding navigation
    },
    updateProfile: async function(){
      await axios.put(dataApi + "users/" + this.idUser, this.user)
      this.$route.push({name: "Meu Perfil"})

    },
    reset: async function(){
      var response = await axios.get(dataApi + "users/" + this.idUser)
      this.user = response.data
      this.user.profileImg = dataApi + "images/" + this.idUser
    },
     editarPassword : async function(){
          if(this.password1 != "" && this.password2 != ""){
            if(this.password1 == this.password2){
              if(confirm("Tem a certeza que pretende alterar a sua password?")){
                await axios.put(dataApi + "users/" + this.idUser + "/password", {password: this.password1})
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
  /*
   methods:{
            uploadImage(e){
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.previewImage = e.target.result;
                    console.log(this.previewImage);
                };
            }
        }
  */
}

</script>

<style>
   .uploading-image{
     display:flex;
   }
 </style>
