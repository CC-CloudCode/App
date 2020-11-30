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
                            src="https://www.dbsacoloradosprings.org/wp-content/uploads/2017/05/gptpit65-1.png"
                          />
                        </v-card>
                </v-dialog>
                    <v-avatar color="grey darken-3" style="display: inline-block; cursor: pointer;" size="130">
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
                        <v-btn v-if="!pertence()" :color= color class="white--text" @click="entrar()">
                           Entrar
                        </v-btn>
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
              <v-container v-if="pertence()">
                <v-card-title primary-title class="justify-center"> Publicações do Grupo </v-card-title>
                <Post :nome="user.username" :foto="user.profileImg" :posts="posts"/>
              </v-container>
              <v-container v-else>
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

export default {
  components:{
      Post,
    Grupos
  },
  data(){
    return {
        color: "#FF0000",
        dialogImage: false,
        header_members: [
            {text: "Foto", sortable: true, value: 'profileImg', class: 'subtitle-1'},
            {text: "Username", value: 'username', class: 'subtitle-1'},
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
        members:[]
    }
  },
    created: async function() {
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
    },
    methods:{
        seguir: function(id1, id2){

        },
        pertence: function(){
          var i, result
          result = false
          for(i = 0; i < this.members.length; i++){
            if(this.members[i].iduser == this.user.iduser) result = true
          }
          return result
        },
        goToProfile: function(iduser){
          this.$router.push({name: 'Perfil', params:{ id : iduser}})
        }
    }

}
</script>
