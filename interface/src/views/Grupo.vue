<template>
<v-app id="inspire" :key="this.idPage">
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
                    style="z-index:1010"
                >
                        <v-card>
                          <v-img
                            :src="group.fotoPerfil"
                          />
                        </v-card>
                </v-dialog>
                    <v-avatar :key="idFoto" outlined style="display: inline-block; cursor: pointer;" size="130">
                        <v-img
                            v-if="group.createdby == user.iduser"
                            class="elevation-6"
                            :src="group.fotoPerfil"
                            @click="showOptions=!showOptions"
                        ></v-img>
                        <v-img
                            v-else
                            class="elevation-6"
                            :src="group.fotoPerfil"
                            @click="dialogImage = true"
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
                        <h3> {{group.name}} </h3>
                        <br>
                        <v-btn v-if="!isMember && !requested" color="#afd29a" class="white--text" @click="entrar()">
                           Entrar
                        </v-btn>
                        <v-btn v-else-if="requested" color="#afd29a" class="white--text" @click="cancelar()">
                          Cancelar
                        </v-btn>
                        <v-btn v-else-if="isMember" color="#afd29a" class="white--text" @click="sairGrupo()">
                          Sair
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
                        style="z-index:1010"
                        >
                            <v-card class="pa-4">
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
                                <v-avatar  >
                                    <v-img
                                        :src= row.item.srcImage
                                    ></v-img>
                                </v-avatar>
                                </td>
                                <td>{{row.item.username}}</td>
                                <td v-if="group.createdby == user.iduser">
                                  <v-icon v-if="!row.item.isAdmin" @click="makeAdmin(row.item.iduser)">mdi-shield-account</v-icon>
                                  <v-card v-else outlined>
                                    <center> ADMINSTRADOR </center>
                                  </v-card>
                                </td>
                                <td><v-icon></v-icon></td>
                            </tr>
                            </template>
                            </v-data-table>
                            </v-card>
                        </v-dialog>
                        <v-dialog
                        v-model="showRequests"
                        width="40%"
                        style="z-index:1010"
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
                                        :src= row.item.srcImage
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
              <v-container v-if="isMember">
                <v-card-title primary-title class="justify-center"> Publicações do Grupo </v-card-title>
                <Post v-if="ready" :nome="user.username" :foto="user.profileImg"
                   :posts="posts" :idGroup="idGroup" :isToPublish="true" 
                    :isAdmin="group.createdby == user.iduser"
                    @refreshCart="$emit('refreshCart')"
                    @refreshBoletim="(obj) => {$emit('refreshBoletim', obj)}"
                    @refreshBalance="$emit('refreshBalance')"
                  />
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
        color: "#afd29a",
        idFoto:-1000,
        dialogImage: false,
        filter2: "",
        idPage:0,
        header_members: [
            {text: "Foto", sortable: true, value: 'profileImg', class: 'subtitle-1'},
            {text: "Username", value: 'username', class: 'subtitle-1'},
        ],
        header_requests: [
            {text: "Foto", sortable: true, value: 'srcImage', class: 'subtitle-1'},
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
        ready: false,
        showOptions: false,
        requested: false, 
        isMember: false
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
          this.ready=false
          this.showOptions = false
          this.requested = false
          this.isMember = false
          this.token = localStorage.getItem("jwt")
          this.user = JSON.parse(localStorage.getItem("user"))
          this.idGroup = this.$route.params.id
          var response = await axios.get(dataApi + "groups/" + this.idGroup + "?token=" + this.token)
          this.group = response.data
          this.group.fotoPerfil = dataApi + "images/groups/" + this.idGroup
          var response2 = await axios.get(dataApi + "groups/" + this.idGroup + "/posts?token=" + this.token)
          this.posts = response2.data
          var response3 = await axios.get(dataApi + "groups/" + this.idGroup + "/members?token=" + this.token)
          this.members = response3.data
          var response4 = await axios.get(dataApi + "groups/" + this.idGroup + "/requests?token=" + this.token)
          var requests_aux = response4.data
          for(var i = 0; i < requests_aux.length; i++){
            if(requests_aux[i].iduser == this.user.iduser) this.requested = true
            requests_aux[i].srcImage = dataApi + "images/" + requests_aux[i].iduser
          }
          var isAdmin = false
          for(var i = 0; i < this.members.length; i++){
            this.members[i].srcImage = dataApi + "images/" + this.members[i].iduser
            if(this.members[i].iduser == this.user.iduser){
              this.isMember = true
              if(this.members[i].isAdmin) {
                isAdmin = true
              }
            }
          }
          if(isAdmin){
            this.group.createdby = this.user.iduser  
            this.requests = requests_aux
            this.header_members = [
                {text: "Foto", sortable: true, value: 'srcImage', class: 'subtitle-1'},
                {text: "Username", value: 'username', class: 'subtitle-1'},
                {text: "Tornar Admin", class: 'subtitle-1'},
            ]
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
        },
        processFile: async function(event) {
          var files = event.target.files[0]
          let formData = new FormData();
          formData.append("ficheiro", files);
          await axios.post(dataApi + "groups/" + this.idGroup + "/fotoPerfil/?token=" + this.token,
              formData,
              {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ) 
          this.$router.go(0)
          //this.idFoto--;
        },
        makeAdmin: async function(iduser){
          if(confirm("De certeza que pretende tornar este membro adminstrador?")){
            var idgroup = this.idGroup
            await axios.put(dataApi + "groups/" + idgroup + "/admin/?token" + this.token, {iduser: iduser})
            await this.refresh()
            this.idPage++;
          }
        },
        entrar: async function(){
          var iduser = this.user.iduser
          axios.post(dataApi + "groups/" + this.idGroup + "/requests/?token=" + this.token, {iduser: iduser, idgroup: this.idGroup})
               .then(dados =>{
                 alert("Já foi efetuado o seu pedido! \n Agora terá que aguardar que um dos adminstradores aprove.")
                 this.requested = true
               })
               .catch(erro => console.log(erro))
        },
        cancelar: async function(){
          var response = await axios.get(dataApi + "groups/" + this.idGroup + "/requests/?token=" + this.token)
          var requests = response.data
          var request
          for(var i = 0; i < requests.length; i++){
            if(requests[i].iduser = this.user.iduser) request = requests[i]
          }
          await axios.delete(dataApi + "groups/requests/" + request.id + "?token=" + this.token)
          alert("Pedido cancelado com sucesso")
          this.requested = false
            
        },
        sairGrupo: async function(){
          if(this.group.createdby != this.user.iduser){
            if(confirm("Tem a certeza que pretende sair do grupo?")){
              await axios.delete(dataApi + "groups/" + this.idGroup + "/members/?iduser=" + this.user.iduser + "&token=" + this.token)
              alert("Acabou de sair do grupo.")
              this.isMember = false
            }
          }
          else{
            alert("É admin do grupo! Não pode sair.")
          }
        }
    }

}
</script>
