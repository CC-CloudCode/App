<template>
<v-container style="width:70%; padding-top:3.8%">
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
               
                <Post v-if="ready" :nome="user.username" :foto="user.profileImg" 
                      :posts="posts" :idGroup="null" :isToPublish="true"
                      @refreshCart="$emit('refreshCart')"
                      @refreshBoletim="(obj) => {$emit('refreshBoletim', obj)}"
                      @refreshBalance="$emit('refreshBalance')" />
              </v-container>

            </v-sheet>

      </v-container>
    </v-main>
  </v-app>
</v-container>
</template>

<script>
import axios from "axios"
import Post from '@/components/Post.vue'
import Grupos from '@/components/Grupos.vue'
const dataApi = require('@/config/hosts.js').hostDataApi
const betsApi = require('@/config/hosts.js').hostBetsApi


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
        ready:false,
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
   watch: {
    '$route'() {
      // TODO: react to navigation event.
      // params cotains the current route parameters
      if(this.$route.name == "Feed") this.refresh()
    }
  },
    created: async function() {
        // ir ao token, buscar informações do user (com autenticação)
        this.refresh()
    },
    methods:{
      refresh: async function(){
        this.ready = false
        this.token = localStorage.getItem("jwt");
        this.user = JSON.parse(localStorage.getItem("user"))
        var response = await axios.get(dataApi + "users/" + this.user.iduser + "/feed?token=" + this.token)
        console.log("user: " + this.user )
        this.posts = response.data
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
            var response = await axios.get(dataApi + "bets/" + this.posts[i].idbet + "/events/?token=" + this.token)
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
