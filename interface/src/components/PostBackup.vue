<template>
<v-container class="my-5">
    <v-row dense>
      <v-col cols="12">
         <v-card class="text-xs-center ma-3" >
             
                 <v-row dense class="ma-3">
                     
                        <v-col cols="1" class="pt-5 ">
                        <v-list-item-avatar @click="goToProfile(user)">
                        <img :src= foto>
                        </v-list-item-avatar>
                        </v-col>
                        <v-col cols="10" style="margin-left: -30px">
                            <v-card-text>
                           <div >
                            <v-textarea @click:append="test" append-icon="mdi-send-outline" auto-grow outlined rows="1" row-height="15"   background-color="grey lighten-3"  placeholder="Write a Post..." ></v-textarea>
                           </div>
                       </v-card-text>
                       </v-col>
                       </v-row>
            <v-list-item>
                    <v-list-item-avatar @click="goToProfile(user)">
                        <img :src= foto>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="headline">{{nome}}</v-list-item-title>
                        <v-list-item-subtitle>{{post.date}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content>
                       <v-col >
                        <v-btn @click="goToGroup(user)" text small >
                            <v-icon >mdi-account-group</v-icon>
                            <span class="ma-1">Group</span>
                        </v-btn>
                       </v-col>

                    </v-list-item-content>

                        <v-spacer></v-spacer>


                    <v-menu offset-y>
                      <template v-slot:activator="{ on }">
                           <v-btn  fab text small v-on="on">
                                <v-icon>mdi-chevron-down</v-icon>
                           </v-btn>
                      </template>
                       <v-list>
                            <v-list-item v-for= "link  in links" :key="link.text" >
                                <v-list-item-title>{{link.text}}</v-list-item-title>
                            </v-list-item>
                       </v-list>
                    </v-menu>
                </v-list-item>

                <v-card-text>
                  {{post.text}}
                </v-card-text>
                <v-card-actions>
                    <h4 class="ml-2">20</h4>
                    <v-btn @click="addLike()" fab text small >
                        <v-icon color="pink">mdi-heart</v-icon>
                    </v-btn>
                    <v-span>Like</v-span>
                    <v-btn fab text small @click="show = !show">

                        <v-icon color="grey" > mdi-comment  </v-icon>
                    </v-btn>
                    <v-span>Comment</v-span>




                </v-card-actions>
                <v-expand-transition>
                     <div v-show="show">
                       <v-divider></v-divider>
                       <v-card-text>
                           <div class="px-4">
                            <v-textarea @click:append="test" append-icon="mdi-send-outline" auto-grow outlined rows="1" row-height="15"   background-color="grey lighten-3"  placeholder="Write a Comment..." ></v-textarea>
                           </div>
                       </v-card-text>
                        <Comment :comments="comments" :nome="nome" />
                     </div>
                    
                </v-expand-transition>

         </v-card>
      </v-col>
    </v-row>


</v-container>
</template>


<script>
import axios from 'axios'
import Comment from '@/components/Comment.vue' 
const h = require("@/config/hosts").hostDataApi

export default {
     components:{
         Comment
  },
    data(){
        return{
            comments:[],
            show:false,
            post:"",
            links: [
                {icon: 'share' ,text: 'Share'},
                {icon: 'report', text: 'Report'},
                {icon: 'save', text: 'Save'}
            ],
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

        }
    },
    props:{
        nome: String,
        foto: String,
    },



    created: async function() {
        var response = await axios.get(h + 'posts/1')
            this.post = response.data
            var date = new Date(this.post.date)
        this.post.date = date.getFullYear() +"-"+date.getMonth()+"-"+date.getDay()+ " "+ date.getHours()+":"+ date.getMinutes() +"h"
        var response1 = await axios.get(h + 'posts/1/comments')
        this.comments = response1.data
    },

    methods:{

        test: function(){
alert("DEU")
        },
         addLike: function(){
             /*
            let data = rnew FormData()
            if (!this.userLikes.includes(this.userSeeing.id)) {
            const url ="http://localhost:3061/posts/giveLike/" + this.post.id;
            let config = {
                headers: {
                    Authorization: "Bearer " + this.getToken
                }
                };
                axios.post(url,data, config).then(() => {
                this.userLikes.push(this.userSeeing.id)
                });

            }
            else {
                const url1 ="http://localhost:3061/posts/takeLike/" + this.post.id;
                let config = {
                headers: {
                    Authorization: "Bearer " + this.getToken
                }
                };
                axios.post(url1, data,config).then(() => {
                this.userLikes.splice(this.userLikes.indexOf(this.userSeeing.id),1)
                });

            }
            */

        },
        goToProfile: function(user){
            //this.$router.push({name: "testing",params: user})
        },
        goToGroup: function(user){
           // this.$router.push({name: "testing",params: user})
        }

    }
}
</script>