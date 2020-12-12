<template>
<v-app id="inspire" >
    <v-main class="grey lighten-3 mt-10 pt-10">
        <v-container>
            <center>
    <v-card class="pa-5 justify-center" width="60%">
        <v-container>
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
                        </div>
        </v-container>
    </v-card>
            </center>
        </v-container>
    </v-main>
</v-app>
</template>

<script>

const dataApi = require('@/config/hosts.js').hostDataApi
import axios from 'axios'

export default {
    data(){
        return{
            username:"",
            token:"",
            users: [],
            user:{}
        }
    },
    created: async function(){
      this.refresh()  
    },
    watch: {
    '$route': function() {
      // TODO: react to navigation event.
      // params cotains the current route parameters
      
      if(this.$route.name == "Find User") this.refresh()
    }
    },
    methods:{
        refresh: async function(){
            console.log(this.$route.params.username)
            this.username = this.$route.params.username
            this.token = localStorage.getItem("jwt")
            this.user = JSON.parse(localStorage.getItem("user"))
            var response = await axios.get(dataApi + "users/find/" + this.username + "?token=" + this.token)
            this.users = response.data
            for(var i = 0; i < this.users.length; i++){
                this.users[i].fotoPerfil = dataApi + "images/" + this.users[i].iduser
                if(this.users[i].iduser == this.user.iduser) {
                    this.users.splice(this.users[i], 1)
                    i--
                }
            }
        },
        goToProfile: async function(){

        }
    }
}

</script>