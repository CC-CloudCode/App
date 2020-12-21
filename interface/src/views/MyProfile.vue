<template>
<v-app id="inspire" >
    <v-main class="grey lighten-3 mt-10 pt-10">
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
                            :key="this.reativo"
                            :src= user.srcImage
                          />
                        </v-card>
                </v-dialog>
                    <v-avatar :key="this.reativo" color="grey darken-3" style="display: inline-block; cursor: pointer;" size="130">
                        <v-img
                            class="elevation-6"
                            :src= user.srcImage
                            @click="showOptions=!showOptions"
                        ></v-img>
                    </v-avatar>
                    <v-card v-if="showOptions" class="pa-2 justify-center">
                    <v-list class="justify-center">
                          <v-list-item class="justify-center">
                            <label for="file-input" style="display: inline-block; cursor: pointer;">
                            <v-icon :color="color"> mdi-camera </v-icon> Mudar Foto
                            </label>
                            <input id="file-input" type="file" @change="processFile($event)" style="display: none;">
                          </v-list-item>
                          <v-list-item @click="dialogImage=true" class="justify-center">
                           <v-icon :color="color"> mdi-eye </v-icon> Ver Foto
                          </v-list-item>
                        </v-list>
                    </v-card>
                    <br>
                    <v-card-text class="text-xs-center">
                        <h3> {{user.username}} </h3>
                        <br>
                        <v-btn :color= color max-width='135px' class="white--text" @click="goToEditarPerfil()">
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
                            :color="color"
                            prepend-icon="mdi-magnify"
                            single-line
                            ></v-text-field>
                            <v-data-table
                            :headers="header_follow"
                            :items="followers"
                            :footer-props="footer_props"
                            :search="filter"
                            >
                            <template v-slot:item="row">
                            <tr @click="goToProfile(row.item.me)"  >
                                <td>
                                <v-avatar color="grey darken-3" >
                                    <v-img
                                        :src= row.item.srcImage
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
                            :color="color"
                            prepend-icon="mdi-magnify"
                            single-line
                            ></v-text-field>
                            <v-data-table
                            :headers="header_follow"
                            :items="following"
                            :footer-props="footer_props"
                            :search="filter"
                            >
                            <template v-slot:item="row">
                            <tr @click="goToProfile(row.item.following)" >
                                <td>
                                <v-avatar color="grey darken-3" >
                                    <v-img
                                        :src="row.item.srcImage" 
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

          <v-container style="width:80%;">
          <v-col
            cols="12"
            sm="10"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <!--  -->
                <v-card-title primary-title class="justify-center"> Suas Publicações </v-card-title>
                <Post v-if="ready" :key="reativo" :nome="user.username" :foto="user.profileImg" :posts="posts" :idGroup="null" :isToPublish="true"/>

            </v-sheet>
          </v-col>
          </v-container>

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios"
import Post from '@/components/Post.vue'
const dataApi = require('@/config/hosts.js').hostDataApi
const betsApi = require('@/config/hosts.js').hostBetsApi

export default {
  components:{
      Post
  },
  data(){
    return {
        color: "#afd29a",
        token: "",
        reativo: 0,
        dialogImage: false,
        dialogFollowing : false,
        header_follow: [
            {text: "Foto", sortable: true, value: 'srcImage', class: 'subtitle-1'},
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
        posts:[],
        token: "",
        showOptions: false,
        ready:false
    }
  },
  watch:{
    
  },
    created: async function() {
      this.token = localStorage.getItem("jwt")
      this.user = JSON.parse(localStorage.getItem("user"))
      this.user.srcImage = dataApi + "images/" + this.user.iduser 
      var response = await axios.get(dataApi + "users/" + this.user.iduser + "/posts?token=" + this.token)
      this.posts = response.data
      
      await this.updatePubs()
      this.ready = true
        // ir ao token, buscar informações do user (com autenticação)
    },
    methods:{
        refresh: async function(){
          this.user.srcImage = dataApi + "images/" + this.user.iduser 
          this.updatePubs()
        },
        seguir: function(id1, id2){

        },
        updatePubs: async function(){
        for(var i = 0; i < this.posts.length; i++){
          this.posts[i].showComments = false;
          this.posts[i].srcImage = dataApi+'images/'+this.posts[i].iduser
          await this.getBet(i)
        }
      },
      getBet: async function(i){
        if(this.posts[i].idbet != null){
            var response = await axios.get(dataApi + "bets/" + this.posts[i].idbet + "/events")
            this.posts[i].events = response.data
            this.posts[i].oddTotal = 1
            for(var j = 0; j < this.posts[i].events.length; j++){
                var response2 = await axios.get(betsApi + "fixtures/" +this.posts[i].events[j].idbetapi )
                this.posts[i].events[j].eventBetApi = response2.data[0]
                this.posts[i].events[j].eventBetApi.begintime = this.posts[i].events[j].eventBetApi.begintime.substr(0,19).replace('T', ' ') 
                if(this.posts[i].events[j].bettype == 0){
                    this.posts[i].events[j].teamBet = response2.data[0].hometeamname
                    this.posts[i].events[j].odd = response2.data[0].oddhome
                     
                }
                else if(this.posts[i].events[j].bettype == 1){
                    this.posts[i].events[j].teamBet = "Empate"
                    this.posts[i].events[j].odd = response2.data[0].odddraw
                }
                else{
                    this.posts[i].events[j].teamBet = response2.data[0].awayteamname
                    this.posts[i].events[j].odd = response2.data[0].oddaway
                }
                this.posts[i].oddTotal *= this.posts[i].events[j].odd
            }
          }
      },
        updateUser: async function(){
          this.user.profileImg = 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
        },
        updateFollowers: function(){
        this.followers.forEach(element=> 
          element.srcImage = dataApi+'images/'+element.me
        )
        },
        updateFollowing: function(){
          this.following.forEach(element=> 
            element.srcImage = dataApi+'images/'+element.following
          )
        },
        showFollowers: async function(){
            // ir buscar os seguidores à api
            var response = await axios.get(dataApi + "users/" + this.user.iduser + "/followers?token=" + this.token)
            this.followers = response.data
            this.updateFollowers()
            this.dialogFollower = true
        },
        showFollowing: async function(){
            // ir buscar quem ele segue à api
            var response = await axios.get(dataApi + "users/" + this.user.iduser + "/following?token=" + this.token)
            this.following = response.data
            this.updateFollowing()
            this.dialogFollowing = true
        },
        goToProfile: function(iduser){
          this.$router.push({name: 'Perfil', params:{ id : iduser}})
        },
        goToEditarPerfil: function(){
          this.$router.push({name: 'Editar Perfil' })
        },
        processFile: async function(event) {
          this.files = event.target.files[0]
          let formData = new FormData();
          formData.append("ficheiro", this.files);
          await axios.post(dataApi + "users/" + this.user.iduser + "/fotoPerfil",
              formData,
              {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ) 
          this.$router.go(0)
        }
    }

}
</script>


