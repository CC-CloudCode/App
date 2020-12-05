<template>
<v-app id="inspire">
<Grupos/>
    <v-main class="grey lighten-3">
      <v-container>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <!--  -->
              <v-container >
                
                
                <v-card-title primary-title class="justify-center"> Feed </v-card-title>
                <center>
                <v-text-field
                  
                  v-model="filter"
                  prepend-icon="mdi-magnify"
                  color="#009263"
                  label="Pesquisar por utilizadores.."
                  style="width:30%;"
                  @change="findUser"
                  single-line
                  ></v-text-field>
                  <v-container v-if="showSearch">
                    <h4> Utilizadores encontrados ({{users.length}}): </h4>
                      <div class="justify-center" style="width:25%">
                      <v-list class="justify-center">
                        <v-list-item
                        class="justify-center"
                        v-for="item in users"
                        :key="item.iduser"
                        @click="goToProfile(item.iduser)"
                        >
                            
                                <v-list-item-avatar color="grey darken-3">
                                <v-img
                                    class="elevation-6"
                                    :src="item.fotoPerfil"
                                ></v-img>
                                </v-list-item-avatar>

                                <a class=" font-weight-bold black--text" v-text="item.username" style="width:50%"></a>
                        </v-list-item>
                    </v-list>
                    <v-btn @click="limparPesquisa()"> Esconder Resultados </v-btn>
                    </div>
                  </v-container>
                </center>
                <Post :nome="user.username" :foto="user.profileImg" :posts="posts"/>
              </v-container>

            </v-sheet>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios"
import Post from '@/components/Post.vue'
import Grupos from '@/components/Grupos.vue'
const dataApi = require('@/config/hosts.js').hostDataApi

export default {
  components:{
      Post,
    Grupos
  },
  data(){
    return {
        token: "",
        filter:"",
        showSearch:false,
        posts:[],
        color: "#FF0000",
        dialogImage: false,
        dialogFollowing : false,
        header_follow: [
            {text: "Foto", sortable: true, value: 'profileImg', class: 'subtitle-1'},
            {text: "Username", value: 'username', class: 'subtitle-1'},
        ],
        footer_props: {
            "items-per-page-text": "Mostrar",
            "items-per-page-options": [5, 10, 20, -1],
            "items-per-page-all-text": "Todos"
        },
        filter : "",
        dialogFollower : false,
        idUser: 2,
        users:[],
        user:{        },
        followers:[
            {
                iduser : 2,
                username : "lol1",
                profileImg : 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
            },
            {
                iduser : 3,
                username : "lol2",
                profileImg : 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
            }
        ],
        following:[
            {
                iduser : 2,
                username : "lol1",
                profileImg : 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
            },
            {
                iduser : 3,
                username : "lol2",
                profileImg : 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
            }
        ]
    }
  },
    created: async function() {
        // ir ao token, buscar informações do user (com autenticação)
        this.token = localStorage.getItem("jwt");
        this.user = JSON.parse(localStorage.getItem("user"))
        var response = await axios.get(dataApi + "users/" + this.user.iduser + "/feed?token=" + this.token)
        console.log("user: " + this.user )
        this.posts = response.data
        this.updatePubs()
    },
    methods:{
      updatePubs: function(){
        this.posts.forEach(element=>{
          element.showComments = false;
          element.srcImage = dataApi+'images/'+element.iduser
        })},
        limparPesquisa: async function(){
          this.showSearch = false
        },
        findUser: async function(){
          this.showSearch = true
          if(this.filter.length != 0){
            var response = await axios.get(dataApi + "users/find/" + this.filter + "?token=" + this.token)
            this.users = response.data
          }
        },
        seguir: function(id1, id2){

        },
        showFollowers: function(){
            // ir buscar os seguidores à api
            this.dialogFollower = true
        },
        showFollowing: function(){
            // ir buscar quem ele segue à api
            this.dialogFollowing = true
        },
        goToProfile: function(iduser){
          this.$router.push({name: 'Perfil', params:{ id : iduser}})
        }
    }

}
</script>
