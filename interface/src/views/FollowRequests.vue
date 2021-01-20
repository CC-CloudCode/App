<template>
<v-app id="inspire" :key="this.$route.params.id">
    <v-main class="grey lighten-3 mt-10 pt-10">
      <v-container style="width:70%">
        <v-card class="pa-5 justify-center">
            <v-card-title class="justify-center">
                Pedidos de Seguir ({{followRequests.length}})
            </v-card-title>
             <v-container v-if="followRequests.length > 0"  >
            <v-list>
                        
                        <v-list-item
                        class="justify-center"
                        v-for="followRequest in followRequests"
                        :key="followRequest.id"
                        >
                            
                                <v-list-item-avatar  >
                                <v-img
                                     @click="goToUser(followRequest.requester)"
                                    class="elevation-6"
                                    :src="followRequest.srcImage"
                                ></v-img>
                                </v-list-item-avatar>

                                <span class=" font-weight-bold black--text" @click="goToUser(followRequest.requester)" v-text="followRequest.usernameRequester" style="padding-right:20px"></span>
                        <v-card-actions>
                                
                                    <v-btn class="white--text" :color="color" @click="acceptRequest(followRequest)"  > Aceitar </v-btn>
                                    <v-btn class="white--text" color="grey" @click="rejectRequest(followRequest.id)" style="padding-left:5px" > Rejeitar </v-btn>
                            
          
                            </v-card-actions>
                        </v-list-item>
                        
            </v-list>
        </v-container>
        <v-container v-else>
            <center><h4> Não possuí nenhum pedido de seguir atualmente! </h4></center>
        </v-container>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios"
const dataApi = require('@/config/hosts.js').hostDataApi

export default {
  components:{
  },
  data(){
    return {
        color: "#afd29a",
        followRequests:[],
        user:{},
        token:"",
        userInformation:{}
    }
  },
   watch: {
    '$route'() {
      // TODO: react to navigation event.
      // params cotains the current route parameters
      if(this.$route.name == "Pedidos de Seguir") this.refresh()
    }
  },
    created: async function(){
        this.refresh()
    },   
    methods:{
     refresh: async function(){
      this.token = localStorage.getItem("jwt")
      this.user = JSON.parse(localStorage.getItem("user"))
      var response = await axios.get(dataApi + "users/" + this.user.iduser + "/followrequests/?token=" + this.token)
      this.followRequests = response.data
      var response2 = await axios.get(dataApi + "users/" + this.user.iduser + "/?token=" + this.token)
      this.userInformation = response2.data
      this.updateFollowRequests()
     },
     acceptRequest : async function(request){
        await axios.post(dataApi + "users/followrequests/" + request.id + "/?token=" + this.token, request)
        var response = await axios.get(dataApi + "users/" + this.user.iduser + "/followrequests/?token=" + this.token)
        this.followRequests = response.data
     },
     rejectRequest : async function(id){
         await axios.delete(dataApi + "users/followrequests/" + id + "/?token=" + this.token)
         var response = await axios.get(dataApi + "users/" + this.user.iduser + "/followrequests/?token=" + this.token)
         this.followRequests = response.data
     },
     updateFollowRequests: async function(){
         this.followRequests.forEach(element =>{
             element.srcImage = dataApi + "/images/" + element.requester 
         })
     },

     goToUser: async function(iduser){
        if(iduser == this.user.iduser){
            this.$router.push({name: "Meu Perfil"})
        }
        else{
            this.$router.push({name: 'Perfil', params:{ id : iduser}})
        }         
     }
    }

}
</script>
