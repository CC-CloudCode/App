<template>
<v-app id="inspire" :key="this.$route.params.id">
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
                            src="https://www.dbsacoloradosprings.org/wp-content/uploads/2017/05/gptpit65-1.png"
                          />
                        </v-card>
                </v-dialog>
                    <v-avatar color="grey light-1" style="display: inline-block; cursor: pointer;" size="130">
                        <v-img
                            class="elevation-6"
                            src="https://www.dbsacoloradosprings.org/wp-content/uploads/2017/05/gptpit65-1.png"
                            @click="dialogImage = true"
                        ></v-img>
                    </v-avatar>
                    <br>
                    <v-card-text class="text-xs-center">
                        <h3> {{group.name}} </h3>
                        <br>
                        <v-btn v-if="!pertence()" color="#afd29a" class="white--text" @click="entrar()">
                           Entrar
                        </v-btn>
                        <br v-if="group.createdby == user.iduser">
                        <br>
                        <v-btn @click="showRequests=true" v-if="group.createdby == user.iduser" color="#afd29a">Pedidos ({{requests.length}})</v-btn>
                        <br>
                        <br>
                        <h4 @click="dialogMembers=true" style="display: inline-block; cursor: pointer;"> Membros ({{members.length}}) </h4>
                        

                    </v-card-text>
                        <v-dialog
                        v-model="dialogMembers"
                        width="40%"
                        >
                            <v-card>
                            <v-text-field
                            v-model="filter"
                            prepend-icon="mdi-magnify"
                            label="Filtrar"
                            color="#afd29a"
                            single-line
                            ></v-text-field>
                            <v-data-table
                            :headers="header_members"
                            :items="members"
                            :footer-props="footer_props"
                            :search="filter"
                            >
                            <template v-slot:item="row">
                            <tr>
                                <td @click="goToProfile(row.item.iduser)">
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
                        <v-dialog
                        v-model="showRequests"
                        width="40%"
                        >
                            <v-card class="pa-4">
                            <v-text-field
                            v-model="filter2"
                            prepend-icon="mdi-magnify"
                            label="Filtrar"
                            color="#afd29a"
                            single-line
                            ></v-text-field>
                            <v-data-table
                            :headers="header_requests"
                            :items="requests"
                            :footer-props="footer_props"
                            :search="filter2"
                            >
                            <template v-slot:item="row">
                            <tr>
                                <td @click="goToProfile(row.item.iduser)">
                                <v-avatar color="grey darken-3" >
                                    <v-img
                                        :src= row.item.profileImg
                                    ></v-img>
                                </v-avatar>
                                </td>
                                <td>{{row.item.username}}</td>
                                <td>
                                  <v-icon @click="aceitarPedido(row.item)" color="green"> mdi-account-check </v-icon>
                                </td>
                                <td>
                                  <v-icon @click="rejeitarPedido(row.item.id)" color="red"> mdi-account-remove </v-icon>
                                </td>
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
              min-height="268"
              rounded="lg"
              width="80%"
            >
              <!--  -->
              <v-container v-if="pertence()">
                <v-card-title primary-title class="justify-center"> Publicações do Grupo </v-card-title>
                <Post v-if="ready" :nome="user.username" :foto="user.profileImg" :posts="posts" :idGroup="idGroup" :isToPublish="true"/>
              </v-container>
              <v-container class="pa-lg-8" v-else>
                <v-card-title primary-title class="justify-center"> Para visualizar publicações, tem que pertencer ao grupo! </v-card-title>
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
import Grupos from '@/components/Grupos.vue'
const dataApi = require('@/config/hosts.js').hostDataApi
const betsApi = require('@/config/hosts.js').hostBetsApi

export default {
  components:{
      Post,
    Grupos
  },
  beforeRouteUpdate (to, from, next) {
    this.refresh()
    next();
  },
  data(){
    return {
        color: "#FF0000",
        dialogImage: false,
        filter2: "",
        header_members: [
            {text: "Foto", sortable: true, value: 'profileImg', class: 'subtitle-1'},
            {text: "Username", value: 'username', class: 'subtitle-1'},
        ],
        header_requests: [
            {text: "Foto", sortable: true, value: 'profileImg', class: 'subtitle-1'},
            {text: "Username", value: 'username', class: 'subtitle-1'},
            {text: "Aceitar", class: 'subtitle-1'},
            {text: "Rejeitar", class: 'subtitle-1'},
        ],
        footer_props: {
            "items-per-page-text": "Mostrar",
            "items-per-page-options": [5, 10, 20, -1],
            "items-per-page-all-text": "Todos"
        },
        filter : "",
        dialogMembers : false,
        user:{},
        group:{},
        idGroup:{},
        token:"",
        posts:[],
        members:[],
        requests:[],
        showRequests: false,
        ready: false
    }
  },
  watch: {
    '$route'() {
      // TODO: react to navigation event.
      // params cotains the current route parameters
      if(this.$route.name == "Grupo") this.refresh()
    }
  },
    created: async function(){
      await this.refresh()
    },   
    methods:{
        refresh: async function() {
          // ir ao token, buscar informações do user (com autenticação)
          this.token = localStorage.getItem("jwt")
          this.user = JSON.parse(localStorage.getItem("user"))
          this.idGroup = this.$route.params.id
          var response = await axios.get(dataApi + "groups/" + this.idGroup + "?token=" + this.token)
          this.group = response.data
          var response2 = await axios.get(dataApi + "groups/" + this.idGroup + "/posts?token=" + this.token)
          this.posts = response2.data
          var response3 = await axios.get(dataApi + "groups/" + this.idGroup + "/members?token=" + this.token)
          this.members = response3.data
          if(this.group.createdby == this.user.iduser){
            var response4 = await axios.get(dataApi + "groups/" + this.idGroup + "/requests?token=" + this.token) 
            this.requests = response4.data 
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
        seguir: function(id1, id2){

        },
        pertence: function(){
          var i, result
          result = false
          if(this.group.createdby == this.user.iduser) return true
          for(i = 0; i < this.members.length; i++){
            if(this.members[i].iduser == this.user.iduser) result = true
          }
          return result
        },
        goToProfile: function(iduser){
          this.$router.push({name: 'Perfil', params:{ id : iduser}})
        },
        aceitarPedido: async function(request){
          await axios.post(dataApi + "groups/" + this.idGroup + "/members?token=" + this.token, request)
          var response4 = await axios.get(dataApi + "groups/" + this.idGroup + "/requests?token=" + this.token) 
          this.requests = response4.data 
          var response3 = await axios.get(dataApi + "groups/" + this.idGroup + "/members?token=" + this.token)
          this.members = response3.data
        },
        rejeitarPedido: async function(id){
          await axios.delete(dataApi + "groups/requests/" + id + "?token=" + this.token)
        }
    }

}
</script>
