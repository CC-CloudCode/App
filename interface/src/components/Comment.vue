<template>
<v-container>
   
  <v-list class="pa-3">
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
                        <img :src= foto>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title >{{nome}}</v-list-item-title>
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


        </v-list-item>  
    </v-list>
</v-container>
</template>

<script>

export default {
    name: 'Comentario',
    data (){ return{
        teste: "OLA",
        publicacoesAtuais: [],
        comentariosAtuais: [],
        conteudo:"",
        idUtilizador:"",
        foto:"https://cdn.vuetifyjs.com/images/lists/1.jpg",
        }},
        props:["comments","nome"],
    created: async function() {
        this.comments.forEach(element => {
          element.date = this.convertDate(element.date)
        });
    },
    methods:{
      convertDate: function(odate){
            var date = new Date(odate)
            return date.getFullYear() +"-"+date.getMonth()+"-"+date.getDay()+ " "+ date.getHours()+":"+ date.getMinutes() +"h"
      }
    }
   
}
</script>