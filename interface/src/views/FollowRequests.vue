<template>
<v-app id="inspire" :key="this.$route.params.id">
    <v-main class="grey lighten-3">
      <v-container>
        <v-card class="pa-5 justify-center">
            <v-row class="justify-center">
                <v-switch color="gray" :input-value="userInformation.private" @change="updatePrivate"></v-switch>
                <h4 v-if="userInformation.private" style="padding-top:1.5%"> Conta Privada </h4>
                <h4 v-else style="padding-top:1.5%"> Conta Pública </h4>
            </v-row>
            <v-card-title class="justify-center">
                Pedidos de Seguir ({{followRequests.length}})
            </v-card-title>
             <v-container v-if="followRequests.length > 0"  >
            <v-list>
                        
                        <v-list-item
                        class="justify-center"
                        v-for="followRequest in followRequests"
                        :key="followRequest.id"
                        @click="goToUser(followRequest.requester)"
                        >
                            
                                <v-list-item-avatar color="grey darken-3" >
                                <v-img
                                    class="elevation-6"
                                    :src="followRequest.srcImage"
                                ></v-img>
                                </v-list-item-avatar>

                                <span class=" font-weight-bold black--text" v-text="followRequest.usernameRequester" style="padding-right:20px"></span>
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
    
  },
    created: async function(){
      this.token = localStorage.getItem("jwt")
      this.user = JSON.parse(localStorage.getItem("user"))
      var response = await axios.get(dataApi + "users/" + this.user.iduser + "/followrequests")
      this.followRequests = response.data
      var response2 = await axios.get(dataApi + "users/" + this.user.iduser)
      this.userInformation = response2.data
      this.updateFollowRequests()
    },   
    methods:{
     acceptRequest : async function(request){
        await axios.post(dataApi + "users/followrequests/" + request.id, request)
        var response = await axios.get(dataApi + "users/" + this.user.iduser + "/followrequests")
        this.followRequests = response.data
     },
     rejectRequest : async function(id){
         await axios.delete(dataApi + "users/followrequests/" + id)
         var response = await axios.get(dataApi + "users/" + this.user.iduser + "/followrequests")
         this.followRequests = response.data
     },
     updateFollowRequests: async function(){
         this.followRequests.forEach(element =>{
             element.srcImage = dataApi + "/images/" + element.requester 
         })
     },
     updatePrivate: async function(id){
         await axios.put(dataApi + "users/" + this.user.iduser + "/privacy")
         var response = await axios.get(dataApi + "users/" + this.user.iduser)
         this.userInformation = response.data
         return;
     }, 
     goToUser: async function(id){
         
     }
    }

}
</script>
