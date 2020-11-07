<template>
  <v-container>
    <center>
      <v-card class="mr-10 mt-3 mb-3 ml-10" width=80%>
    <v-card-title class="justify-center" style="background: #d6d6c2; color: #900000;" dark>
        Publicações
    </v-card-title>
    <!--<form method="post" id="publicacao" enctype="multipart/form-data"> !-->
        <div class="form-group files text-center" style="margin-top: 20px">
          <center>
          <v-text-field maxlength="75" color="#900000" class="" v-model="titulo" placeholder="Titulo da Publicação" style="width:80%" autofocus/>
          </center>
            <v-spacer></v-spacer>
            <textarea v-model="conteudo" placeholder="Escreva alguma publicação..." class="pa-2" rows="5" style="width:80%; resize: none; border:1px solid #900000; "></textarea>

            <div class = "flex" style ="width:90%; padding-left:10%;">
    
                <v-file-input show-size v-model="files" placeholder="Anexar ficheiros" 
                 prepend-icon="mdi-myFileIcon" multiple="multiple" style="width:20%; color:#900000;"/> 

                <v-btn style="margin-left:58%;" color="#900000" type='submit' @click="inserePublicacao"> Publicar </v-btn>

            </div> 
        </div>
    </v-card>
    </center>
    <!--</form> !-->
    <hr>
    <div v-if="this.publicacoesAtuais.length==0">
        <center><h2> Ainda não existem publicações! </h2></center>
    </div>
    <div v-else >
      
         <v-list  v-model="publicacoesAtuais" color="transparent" class="justify-center">
            <!--<v-list-item-group disabled v-model="publicacoesAtuais" color="primary"> -->
            <v-list-item class="justify-center"
                v-for="item in publicacoesAtuais"
                :key="item.idPublicacao"
            >
            
            <v-card
                class="ml-10 mt-3 mb-3 mr-10 justify-center"
                color="white"
                dark
                width = "83%"
            
            >

            <v-card-actions>

                      <span justify="Start"  class=" font-weight-bold black--text" v-text="item.dados.info.titulo"></span>
        <v-row
          justify="end"
        >
            <span justify="end"  class="black--text font-weight-bold ml-9" v-text="item.dados.info.dataPublicacao">
            </span>
        </v-row>
          
    </v-card-actions>

    <v-text-field v-if="item.editar" class=" ml-4 black--text" v-model="item.dados.info.conteudo" multi-line autofocus style="white-space:pre-wrap;"/>

    <v-card-text v-else class="  black--text" v-text="item.dados.info.conteudo"  style="white-space:pre-wrap;" >

    </v-card-text>

    <v-card-actions>
      <v-list-item class>
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            :src="item.srcImage"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <a  class="font-weight-bold black--text" v-text="item.dados.info.nomeUtilizador" @click="seeUser(item.dados.info.idUtilizador)"></a>
        </v-list-item-content>

        <v-row
          justify="end"
        >
          <v-icon v-if="!utilizadorGostou(item.dados.gostos)" color="#900000" class="mr-1" @click="addLike(item.idPublicacao)">mdi-heart-outline</v-icon>
          <v-icon v-else color="#900000" class="mr-1" @click="deleteLike(item.idPublicacao)">mdi-heart</v-icon>
          <span class=" black--text subheading mr-2" @click="mostraLikes(item.dados.gostos)">{{item.dados.gostos.length}}</span>
          <v-icon class="mr-1" :color="corComentariosIcon" @click="openComentarios(item)">mdi-comment</v-icon>
          <span class="black--text subheading mr-2">{{item.dados.comentarios.length}}</span>
          <v-icon  color="#900000" class="mr-1 " @click="showFiles(item)">mdi-file</v-icon>
          <!--<v-btn class="mr-1" @click="showFiles = true" icon="mdi-myFileIcon"></v-btn> v-if="this.idUtilizador == item.dados.info.idUtilizador"  -->
          <span class="black--text subheading mr-2">{{item.dados.ficheiros.length}}</span>
          <v-icon v-if="utilizadorOwner(item.dados.info.idUtilizador)" color="#900000" class="mr-1" @click="item.editar = true">mdi-square-edit-outline</v-icon>
          <v-icon v-if="getPermissao(item.dados.info.idUtilizador)" color="#900000" class="mr-1" @click="deletePub(item.idPublicacao)">mdi-close-thick</v-icon>
        
        </v-row>
            <v-spacer/>
      </v-list-item>
    </v-card-actions>
            <v-container
              v-if="item.showComments"
              width="70%"
              background-color="#e0e0e0"
            >
             <hr color="#900000" style="width:100%">
                        <!--<v-list v-if="item,dados.comentarios.length != 0" >-->
                <Comentario  @refresh="(comentarios)=>{refresh(item,comentarios)}" :comentarios="item.dados.comentarios" 
                                  :idPublicacao="item.idPublicacao" :isCurso="isCurso" :pai="pai" :idGrupo="idGrupo"/>
            </v-container>
  </v-card>
            </v-list-item>
            <!--</v-list-item-group> -->
        </v-list>
    </div>
                      <v-dialog
                    v-model="dialog"
                    width="500"
                    v-bind:style="{color:white}"
                >
                        <v-card>
                        <v-list>
                    <v-list-item
                    v-for="file in publicacaoAtual.dados.ficheiros"
                    :key="file.idFicheiro"
                    @click="download(file.idFicheiro, file.nome)" 
                    >
                    <v-list-item-content style="width: 50%;"> 
                        <v-list-item-title v-text="file.nome"></v-list-item-title>
                    </v-list-item-content>

                    </v-list-item>
                    
                    </v-list>
                    </v-card>
                    </v-dialog>
                  <v-dialog
                    v-model="showLikes"
                    width="500"
                    v-bind:style="{color:white}"
                  >
                    <v-card>
                    <v-card-title class="justify-center" style="background: #d6d6c2; color: #900000;" dark>
                            Gostos
                    </v-card-title>
                    <v-list>
                    <v-list-item
                    v-for="gosto in likesAtuais"
                    :key="gosto.idUtilizador"
                    @click="seeUser(gosto.idUtilizador)" 
                    >

                    <v-list-item-avatar color="grey darken-3">
                          <v-img
                            class="elevation-6"
                            :src="gosto.fotoPerfil"
                          ></v-img>
                        </v-list-item-avatar>
                    <v-list-item-content style="width: 50%;"> 
                        <v-list-item-title v-text="gosto.nomeUtilizador"></v-list-item-title>
                    </v-list-item-content>

                    </v-list-item>
                    
                    </v-list>
                    </v-card>
                    </v-dialog>
  </v-container>
</template>

<script>
import Comentario from '@/components/Comentario.vue'


    export default {
    name: 'Publicacao',
    components:{
      Comentario
    },
    data (){ return{
        publicacoesAtuais: [],
        conteudo: "",
        titulo:"",
        files : [],
        idUtilizador:"",
        viewKey : 0,
        editConteudo:"",
        publicacaoAtual: {dados:{ficheiros:[]}},
        dialog: false,
        showLikes: false,
        likesAtuais: [],
        corComentariosIcon: "#900001",
        token: ""
    }},
}
</script>

<style>
.mdi-myFileIcon::before {
  content: "\F39A";
  color: #900000;
}
.flex {
    display: flex;
}
</style>

