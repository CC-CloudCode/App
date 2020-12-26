<template>
    <v-app id="inspire" >
    <v-main class="grey lighten-3 pt-16 mt-10">
    <v-container style="width:65%"> 
    <v-card class="pa-5" >

              
     
    <v-container v-if="canSee">
        <v-card-title class="justify-center">
         Publicação
     </v-card-title>
    <Post v-if="ready" :nome="user.username" :foto="user.profileImg" :posts="posts" :idGroup="null" :isToPublish="false"/>
    </v-container>
    <v-container v-else>
        <center>
        <v-icon color="red" size="44">mdi-alert-circle-outline</v-icon>
        <v-card-title class="justify-center">
            Não tem permissão para visualizar a publicação.
        </v-card-title>
        </center>
    </v-container>

    </v-card>
    </v-container>
    </v-main>
    </v-app>
</template>



<script>
import axios from "axios"
import Post from '@/components/Post.vue'
//const h = require("@/config/hosts").hostAPI
const dataApi = require("@/config/hosts").hostDataApi
const betsApi = require('@/config/hosts.js').hostBetsApi


import VueJwtDecode from "vue-jwt-decode";

  export default {
      components:{
      Post,
  },
    data(){
      return {
        user:{},
        posts:[],
        token:"",
        idGroup:null,
        ready:false,
        canSee: false,
        idpost: 0,
      }
    },
    created: async function(){
        await this.refresh()
    },

    methods: {
      refresh: async function(){
        this.canSee = false
        this.ready = false
        this.token = localStorage.getItem("jwt")
        this.idpost = this.$route.params.id 
        this.user = JSON.parse(localStorage.getItem("user"))
        var response = await axios.get(dataApi + "posts/" + this.idpost + "/?token=" + this.token)
        this.posts = [response.data]
        if(response.data.iduser == this.user.iduser){
            this.canSee = true
        }
        else{
            if(response.data.idgroup == null){
                var responseU = await axios.get(dataApi + "users/" + response.data.iduser + "/?token=" + this.token)
                var responseF = await axios.get(dataApi + "users/" + response.data.iduser + "/followers/?token=" + this.token)
                var user = responseU.data
                var followers = responseF.data
                if(user.private){
                    var isFollower = false
                    for(var j = 0; !isFollower && j < followers.length; j++){
                        if(this.user.iduser == followers[j].me){
                            isFollower = true
                            this.canSee = true
                        }
                    }
                }
                else{
                    this.canSee = true
                }
            }
            else{
                var responseG = await axios.get(dataApi + "users/" + this.user.iduser + "/groups/?token=" + this.token)
                var groups = responseG.data
                var permission = false
                for(var i = 0; !permission && i < groups.length; i++){
                    if(response.data.idgroup == groups[i].idgroup){
                        permission = true
                        this.canSee = true
                    }
                }
            }

        }
        
        await this.updatePubs()
        this.ready = true
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
    }
  }
</script>