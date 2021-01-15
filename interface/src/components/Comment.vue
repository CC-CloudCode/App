<template>
<v-container>
   
  <v-list class="pa-3" outlined>
        <center>
        </center>
        <v-list-item
        v-for="(comentario,index) in comments"
        :key="comentario.idComentario" 
        >
         <v-container style="padding: 0px">
        <v-row
          
          justify="start"
        >
         <v-list-item-avatar @click="goToProfile(user)">
                        <img :src="comentario.foto">
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title >{{comentario.username}}</v-list-item-title>
                        <v-list-item-subtitle>{{comentario.date}}</v-list-item-subtitle>
                    
                    </v-list-item-content>
        
     
     <!--   <v-icon   style="height:50%; margin-top:10px" class="mr-1" color="#900000"  >mdi-close-thick</v-icon> -->
       <!-- <span class="subheading mr-2 black--text" style="padding-top:11px" >{{comentario.conteudo}}</span>-->
          <v-card-text>
            {{comentario.text}}
                </v-card-text>
        
        </v-row>
        <v-row
            justify="end"
        > 

        </v-row>
        </v-container>
        <v-card-actions>
          <v-icon v-if="comentario.iduser == user.iduser || isAdmin || isMyPost" @click="deleteComment(comentario)" style="padding-left:22.0%"> mdi-trash-can-outline</v-icon>
        </v-card-actions>

        </v-list-item>  
    </v-list>
</v-container>
</template>

<script>

import axios from 'axios'
const h = require("@/config/hosts").hostDataApi

export default {
    name: 'Comentario',
    data (){ return{
        teste: "OLA",
        user:{},
        token:"",
        publicacoesAtuais: [],
        comentariosAtuais: [],
        conteudo:"",
        idUtilizador:"",
        foto:"https://cdn.vuetifyjs.com/images/lists/1.jpg",
        }},
        props:["comments", "isAdmin", "isMyPost"],
    created: async function() {
        this.user = JSON.parse(localStorage.getItem("user"))
        this.token = localStorage.getItem("jwt")
        /*this.comments.forEach(element => {
          element.date = this.convertDate(element.date)
        });*/
    },
    methods:{
      convertDate: function(odate){
            var date = new Date(odate)
            return date.getFullYear() +"-"+date.getMonth()+"-"+date.getDay()+ " "+ date.getHours()+":"+ date.getMinutes() +"h"
      },
      deleteComment: async function(comment){
        if(confirm("Tem a certeza que deseja apagar este comentário?")){
          await axios.delete(h + "comments/" + comment.idcomment + "/?token=" + this.token)
          var response = await axios.get(h + "posts/" + comment.idpost + "/comments" + "/?token=" + this.token)
          this.comments = response.data
          for(var i = 0; i < this.comments.length; i++){
            this.comments[i].foto = h + "images/" +  this.comments[i].iduser
          }
        }
      }
    }
   
}
</script>