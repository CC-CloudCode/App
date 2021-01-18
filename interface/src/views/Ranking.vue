<template>
<v-app id="inspire" >
    <v-main class="grey lighten-3 mt-10 pt-10">
        <v-container>
            <center>
    <v-card class="pa-5 justify-center" width="80%">
        
        <v-card-title>
            <v-text-field class="shrink" style="width:500px" prepend-icon="mdi-magnify" v-model="filter2" label="Pesquisa" clearable color="#afd29a" dense></v-text-field>
        </v-card-title>
        
        <v-container>
                        <h4> Ranking ({{users.length}}): </h4>
                        <div class="justify-center" >
                        <v-data-table
                            :headers="header"
                            :items="users"
                            :footer-props="footer_props"
                            :search="filter2"
                            >
                            <template v-slot:item="row">
                            <tr>
                                <td>
                                  {{row.item.posicao}}
                            </td>
                                <td @click="goToProfile(row.item.iduser)">
                                <v-avatar >
                                    <v-img
                                        :src= row.item.fotoPerfil
                                    ></v-img>
                                </v-avatar>
                                </td>
                                <td>{{row.item.username}}</td>
                                <td>
                                  {{row.item.rankscore}}
                                </td>
                                <td>
                                  {{row.item.copiaspriv}}
                                </td>
                                <td>
                                  {{row.item.avgodd}}
                                </td>
                            </tr>
                            </template>
                            </v-data-table>
                        
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
            user:{},
            header: [{text: "Posição", value: 'posicao', class: 'subtitle-1'},
            {text: "Foto", sortable:false, value: 'fotoPerfil', class: 'subtitle-1'},
            {text: "Username", value: 'username', class: 'subtitle-1'},
            {text: "Pontuação", value: 'rankscore', class: 'subtitle-1'},
            {text: "Nº Cópias", value: 'copiaspriv', class: 'subtitle-1'},
            {text: "Odd Média", value: 'avgodd', class: 'subtitle-1'}
            ],
            footer_props: {
            "items-per-page-text": "Mostrar",
            "items-per-page-options": [5, 10, 20, -1],
            "items-per-page-all-text": "Todos"
            }, 
            filter2: ""
        }
    },
    created: async function(){
      this.refresh()  
    },
    watch: {
    '$route': function() {
      // TODO: react to navigation event.
      // params cotains the current route parameters
      
      if(this.$route.name == "Ranking") this.refresh()
    }
    },
    methods:{
        refresh: async function(){
            console.log(this.$route.params.username)
            this.username = this.$route.params.username
            this.token = localStorage.getItem("jwt")
            this.user = JSON.parse(localStorage.getItem("user"))
            var response = await axios.get(dataApi + "users/ranking/?token=" + this.token)
            this.users = response.data
            console.log('usersssss')
            console.log(this.users)
            for(var i = 0; i < this.users.length; i++){
                this.users[i].fotoPerfil = dataApi + "images/" + this.users[i].iduser
                this.users[i].posicao = i+1
            }
        },
        goToProfile: async function(iduser){
            this.$router.push({name: 'Perfil', params:{ id : iduser}})
        }
    }
}

</script>