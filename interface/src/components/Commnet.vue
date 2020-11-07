<template>
<v-container>
   
  <v-list color="#f0f0f0" class="pa-3">
        <center>
        <h3 class=" font-weight-bold " style="color:black"> Comentários </h3>
        </center>
        <v-list-item
        v-for="(comentario,index) in comentariosAtuais"
        :key="comentario.idComentario" 
        >
         <v-container style="padding: 0px">
        <v-row
          
          justify="start"
        >
        <v-list-item-avatar>
          <v-img
            class="elevation-6"
          ></v-img>
        </v-list-item-avatar>
        
        <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"  ></span>
         <span class="subheading mr-2 black--text" style="padding-top:11px" >{{teste}}</span>
        <v-icon   style="height:50%; margin-top:10px" class="mr-1" color="#900000"  >mdi-close-thick</v-icon>
       <!-- <span class="subheading mr-2 black--text" style="padding-top:11px" >{{comentario.conteudo}}</span>-->
         <v-card-text class="subheading mr-2 black--text" v-text="comentario.conteudo">
        </v-card-text>
        
        </v-row>
        <v-row
            justify="end"
        > 

        </v-row>
        <hr v-if="index < comentariosAtuais.length - 1" color="grey" style="width:100%">
        </v-container>
        </v-list-item>
        <textarea  class="black--text pa-3" v-model="conteudo"  placeholder="Comente algo sobre a publicação.."   rows="3" style="width:100%; resize: none; border:1px solid #000000;">
        
        </textarea>
        <v-btn color= "#900000">Comentar</v-btn>
        
    </v-list>
</v-container>
</template>

<script>

export default {
    name: 'Comentario',
    data (){ return{
        teste: "OLA",
        publicacoesAtuais: [],
        comentariosAtuais: [{idcomentario:"teste",conteudo:"teste",data:"teste",idUtilizador:"teste",nomeUtilizador:"teste"}],
        conteudo:"",
        idUtilizador:""
    }},
   
}
</script>