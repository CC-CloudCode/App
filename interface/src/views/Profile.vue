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
                            :src= user.srcImage
                            @click="dialogImage = true"
                        ></v-img>
                    </v-avatar>
                    <br>
                    <v-card-text class="text-xs-center">
                        <h3> {{user.username}} </h3>
                        <br>
                        <center>
                        <v-btn v-if="isFollowing" color="grey" class="white--text" @click="removeFollower()">
                          <v-icon> mdi-account-remove </v-icon>
                            Não Seguir
                        </v-btn>
                        <v-btn v-else-if="followRequested" color="grey" class="white--text" @click="cancelRequest()">
                            Cancelar Pedido
                        </v-btn>
                        <v-btn v-else :color= color class="white--text" @click="follow()">
                            <v-icon> mdi-account-plus </v-icon> Seguir
                        </v-btn>
                        </center>
                        <br>
                        <v-btn v-if="canSeePosts" :color= color class="white--text" @click="iniciarConversa(idUser, user.iduser)">
                          <v-icon>mdi-android-messages</v-icon>
                            Mensagem
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
                            <v-card class="pa-4">
                              <v-card-title class="justify-center">
                                Seguidores
                              </v-card-title>
                            <v-text-field
                            v-model="filter"
                            prepend-icon="mdi-magnify"
                            label="Filtrar"
                            :color="color"
                            single-line
                            ></v-text-field>
                            <v-data-table
                            :headers="header_follow"
                            :items="followers"
                            :footer-props="footer_props"
                            :search="filter"
                            >
                            <template v-slot:item="row">
                            <tr @click="goToProfile(row.item.me)">
                                <td>
                                <v-avatar color="grey darken-3" >
                                    <v-img
                                        :src= row.item.srcImage
                                    ></v-img>
                                </v-avatar>
                                </td>
                                <td  >{{row.item.username}}</td>
                            </tr>
                            </template>
                            </v-data-table>
                            </v-card>
                        </v-dialog>
                        <v-dialog
                        v-model="dialogFollowing"
                        width="40%"
                        >
                            <v-card class="pa-4">
                              <v-card-title class="justify-center">
                                A seguir
                              </v-card-title>
                            <v-text-field
                            v-model="filter"
                            :color="color"
                            label="Filtrar"
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
                            <tr @click="goToProfile(row.item.following)">
                                <td>
                                <v-avatar color="grey darken-3" >
                                    <v-img
                                        :src= row.item.srcImage
                                        
                                    ></v-img>
                                </v-avatar>
                                </td>
                                <td >{{row.item.username}}</td>
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
              <v-container v-if="canSeePosts" >
                <v-card-title primary-title class="justify-center"> Suas Publicações </v-card-title>
                <Post :nome="user.username" :foto="user.profileImg" :posts="posts" :isToPublish="false" />
              </v-container>
              <v-container style="padding-top: 160px" v-else>
                <center>
                  <v-icon size="50" >mdi-lock-alert</v-icon>
                  <h3 class="red--text">
                    Conta Privada. <br> Você tem que seguir o utilizador para conseguir ver as suas publicações.
                  </h3>
                </center>
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
const h = require("@/config/hosts").hostChatApi
const hostDataApi = require("@/config/hosts").hostDataApi

export default {
  components:{
      Post
  },
  watch: {
    '$route'() {
      // TODO: react to navigation event.
      // params cotains the current route parameters
      if(this.$route.name == "Perfil") this.refresh()
    }
  },
  data(){
    return {
        color: "#afd29a",
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
        token:"",
        userLogged:{},
        followRequested : false,
        followRequests:[],
        posts: [],
        isFollowing: false,
        canSeePosts: false
    }
  },
    created: async function() {
      this.refresh() 
    },
    methods:{
      refresh: async function(){
        this.idUser = this.$route.params.id
        this.userLogged = JSON.parse(localStorage.getItem("user"))
        var u = await axios.get(hostDataApi + "users/"+this.$route.params.id)
        this.user = u.data;
        this.user.srcImage = hostDataApi+'images/'+this.user.iduser
        var response = await axios.get(hostDataApi + "users/" + this.idUser + "/followrequests")
        this.followRequests = response.data
        this.followRequested = await this.isFollowRequested()
        var response2 = await axios.get(hostDataApi + "users/" + this.user.iduser + "/followers")
        this.followers = response2.data
        if(this.followers.find(element => element.me == this.userLogged.iduser)) this.isFollowing = true
        console.log(this.followers)
        var responseP = await axios.get(hostDataApi + "users/" + this.user.iduser + "/posts")
        this.posts = responseP.data
        this.updatePubs()
        this.canSeePosts = await this.canSee()
      },
      isFollowRequested: async function(){
        if(this.followRequests.find(element => element.requester == this.userLogged.iduser)){
          return true
        }
        else return false
          
      },
      updateFollowers: function(){
        this.followers.forEach(element=> 
          element.srcImage = hostDataApi+'images/'+element.me
        )
      },
      updateFollowing: function(){
        this.following.forEach(element=> 
          element.srcImage = hostDataApi+'images/'+element.following
        )
      },
      updatePubs: function(){
        this.posts.forEach(element=>{
          element.showComments = false;
          element.srcImage = hostDataApi+'images/'+element.iduser
        })
      },
      canSee: async function(){
        if(this.user.private){
          if(this.followers.find(element => element.me == this.userLogged.iduser)) return true
          else return false
        }
        else{
          return true
        }
      },
      isFollower: async function(){
        
      },
      follow: async function(){
        if(this.user.private){
          // sent follow request
          var requester = this.userLogged.iduser
          var requested = this.user.iduser
          await axios.post(hostDataApi + "users/followrequests/", {requester: requester, requested: requested} )
          var response = await axios.get(hostDataApi + "users/" + this.idUser + "/followrequests")
          this.followRequests = response.data
          this.followRequested = await this.isFollowRequested()
        }
        else{
          // start follow
          var following = this.user.iduser
          var me = this.userLogged.iduser
          await axios.post(hostDataApi + "users/" + following + "/followers", {id: me})
          var response2 = await axios.get(hostDataApi + "users/" + following + "/followers")
          this.followers = response2.data
          this.user.followers++
          this.isFollowing = true

        }
  
      },
      removeFollower: async function(){ 
        var following = this.user.iduser
        var me = this.userLogged.iduser        
        await axios.delete(hostDataApi + "users/" + following + "/followers?me=" + me)
        var response2 = await axios.get(hostDataApi + "users/" + following + "/followers")
        this.followers = response2.data
        this.isFollowing = false
        this.canSeePosts = await this.canSee()
        this.user.followers--;

      },
      cancelRequest: async function(){
        var request = this.followRequests.find(element => element.requester == this.userLogged.iduser)
        await axios.delete(hostDataApi + "users/followrequests/" + request.id)
        var response = await axios.get(hostDataApi + "users/" + this.idUser + "/followrequests")
        this.followRequests = response.data
        this.followRequested = false
      },
        iniciarConversa:async function(id1, id2){
         var selfuser = this.userLogged
           var conversa = {
            participantes:[
              {
                idUtilizador: selfuser.iduser,
                nome: selfuser.username
              },
              {
                idUtilizador: id2,
                nome: this.user.username
              }
            ],
            ativo: true,
            visto: true
          }
          console.log(conversa)
          await axios.post(h + "api/conversas", conversa)

        },
        showFollowers: async function(){
            // ir buscar os seguidores à api
            await this.updateFollowers()
            this.dialogFollower = true
        },
        showFollowing: async function(){
            // ir buscar quem ele segue à api
            var response = await axios.get(hostDataApi + "users/" + this.user.iduser + "/following")
            this.following = response.data
            this.updateFollowing()
            this.dialogFollowing = true
        },
        goToProfile: function(iduser){
          this.$router.push({name: 'Perfil', params:{ id : iduser}})
        }
    }

}
</script>
