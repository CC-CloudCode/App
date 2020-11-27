<template>
<v-app id="inspire">
<Grupos/>
    <v-main>
      <v-container>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <!--  -->
              <v-container >
                <v-card-title primary-title class="justify-center"> Feed </v-card-title>
                <Post :nome="user.username" :foto="user.profileImg"/>
              </v-container>

            </v-sheet>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios"
import Post from '@/components/Post.vue'
import Grupos from '@/components/Grupos.vue'

export default {
  components:{
      Post,
    Grupos
  },
  data(){
    return {
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
        user:{
            iduser : 1,
            username : "Luizz",
            birthdate : "1997-01-01",
            email : "loles@loles.com",
            name : "Luis",
            followers : 100,
            following : 20,
            score : 99,
            profileImg : 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            betsWin : 1000,
            MeanOdd : 2.00,
            copies : 0
        },
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
    created: async function() {
        // ir ao token, buscar informações do user (com autenticação)
    },
    methods:{
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
