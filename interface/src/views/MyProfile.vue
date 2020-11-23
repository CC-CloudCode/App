<template>
<v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="2"
            align="center"
            justify="center"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >

            <v-container>
                <v-dialog
                    v-model="dialogImage"
                    width="500"

                >
                        <v-card>
                          <v-img
                            :src= user.profileImg
                          />
                        </v-card>
                </v-dialog>
                    <v-avatar color="grey darken-3" style="display: inline-block; cursor: pointer;" size="130">
                        <v-img
                            class="elevation-6"
                            :src= user.profileImg
                            @click="dialogImage = true"
                        ></v-img>
                    </v-avatar>
                    <br>
                    <v-card-text class="text-xs-center">
                        <h3> {{user.username}} </h3>
                        <br>
                        <v-btn :color= color class="white--text" @click="goToEditarPerfil()">
                            <v-icon>mdi-pencil</v-icon> Editar Perfil
                        </v-btn>
                        <br>
                        <br>
                        <h4 @click="showFollowers()" style="display: inline-block; cursor: pointer;"> Seguidores ({{user.followers}}) </h4>
                        <br>
                        <h4 @click="showFollowing()" style="display: inline-block; cursor: pointer;"> A seguir ({{user.following}}) </h4>
                        <br>
                        <br>
                        <h4> Score : {{user.score}} </h4>
                        <h4> Apostas Ganhas : {{user.betsWin}} </h4>
                        <h4> Odd Média : {{user.MeanOdd}} </h4>
                        <h4> Nº de cópias : {{user.copies}} </h4>

                    </v-card-text>
                        <v-dialog
                        v-model="dialogFollower"
                        width="40%"
                        >
                            <v-card class="pa-5">
                            <v-text-field
                            v-model="filter"
                            label="Filtrar"
                            single-line
                            ></v-text-field>
                            <v-data-table
                            :headers="header_follow"
                            :items="followers"
                            :footer-props="footer_props"
                            :search="filter"
                            >
                            <template v-slot:item="row">
                            <tr @click="goToProfile(row.item.iduser)" style="display: inline-block; cursor: pointer;" >
                                <td>
                                <v-avatar color="grey darken-3" style="display: inline-block; cursor: pointer;" >
                                    <v-img
                                        :src= row.item.profileImg
                                        @click="goToProfile(row.item.iduser)"
                                    ></v-img>
                                </v-avatar>
                                </td>
                                <td>{{row.item.username}}</td>
                            </tr>
                            </template>
                            </v-data-table>
                            </v-card>
                        </v-dialog>
                        <v-dialog
                        v-model="dialogFollowing"
                        width="40%"
                        >
                            <v-card class="pa-5" >
                            <v-text-field
                            v-model="filter"
                            label="Filtrar"
                            single-line
                            ></v-text-field>
                            <v-data-table
                            :headers="header_follow"
                            :items="following"
                            :footer-props="footer_props"
                            :search="filter"
                            >
                            <template v-slot:item="row">
                            <tr @click="goToProfile(row.item.iduser)" style="display: inline-block; cursor: pointer;">
                                <td>
                                <v-avatar color="grey darken-3" >
                                    <v-img
                                        :src= row.item.profileImg
                                    ></v-img>
                                </v-avatar>
                                </td>
                                <td>{{row.item.username}}</td>
                            </tr>
                            </template>
                            </v-data-table>
                            </v-card>
                        </v-dialog>
            </v-container>

            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="10"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <!--  -->
              <v-container >
                <v-card-title primary-title class="justify-center"> Suas Publicações </v-card-title>
                <Post :nome="user.username" :foto="user.profileImg"/>
              </v-container>

            </v-sheet>
          </v-col>


        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios"
import Post from '@/components/Post.vue'
const dataApi = require('@/config/hosts.js').hostDataApi

export default {
  components:{
      Post
  },
  data(){
    return {
        color: "#FF0000",
        token: "",
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
        user:{},
        followers:[],
        following:[],
        posts:[]
    }
  },
    created: async function() {
    
    this.user = JSON.parse(localStorage.getItem("user"))
    this.updateUser()
    this.posts = await axios.get(dataApi + "users/" + this.iduser + "/posts")
        // ir ao token, buscar informações do user (com autenticação)
    },
    methods:{
        seguir: function(id1, id2){

        },
        updateUser: async function(){
          this.user.profileImg = 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
        },
        showFollowers: async function(){
            // ir buscar os seguidores à api
            this.followers = await axios.get(dataApi + "users/" + this.user.iduser + "/followers")
            this.dialogFollower = true
        },
        showFollowing: async function(){
            // ir buscar quem ele segue à api
            this.following = await axios.get(dataApi + "users/" + this.user.iduser + "/following")
            this.dialogFollowing = true
        },
        goToProfile: function(iduser){
          this.$router.push({name: 'Perfil', params:{ id : iduser}})
        }
    }

}
</script>
