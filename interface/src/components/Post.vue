<template>
<v-container class="my-5">
    <v-row dense>
      <v-col cols="12">
         <v-card class="text-xs-center ma-3" >
             
                 
                     
                    <v-row class="ml-4">
                        
                        <v-list-item-avatar @click="goToProfile(user)">
                        <img :src= foto>
                        </v-list-item-avatar>
                
         <v-col cols="6" >
        <v-select  style="margin-top: 30px"
          v-model="e1"
          :items="status"
          menu-props="auto"
          label="State"
          solo
          prepend-icon="mdi-account"
          single-line
        ></v-select>
      </v-col>
   
                          </v-row >                  
                            <v-card-text  style="margin-top: -30px">
                           <div >
                            <v-textarea @click:append="test" append-icon="mdi-send-outline" auto-grow outlined rows="1" row-height="15"   background-color="grey lighten-3"  placeholder="Write a Post..." ></v-textarea>
                            <v-dialog v-model="dialog" scrollable max-width="300px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                    color="white"
                                    v-bind="attrs"
                                    v-on="on"
                                    >
                                    Add Bet
                                    </v-btn>
                                </template>
                                    <v-card>
        <v-card-title>Select Bet</v-card-title>
        <v-divider></v-divider>
        <v-card-text >
            <v-radio-group>
            <v-radio v-for="bet in bets " v-bind:key="bet.idbet" :label="`Bet ${bet.idbet}`" :value="bet.idbet"></v-radio>
            </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="test" 
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
                            </v-dialog>
                           </div>
                       </v-card-text>
                      
                    <hr v-if="this.posts.length!=0">
                    
        <div v-if="this.posts.length!=0">
      
         <v-list  v-model="posts" color="transparent" class="justify-center">
            <v-container class="pa-3" v-for="(item, index) in posts" v-bind:key="item.id">
                <hr v-if="index!=0">
                <v-list-item>
                    <v-list-item-avatar @click="goToProfile(item.iduser)">
                        <img :src= item.fotoPerfil>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="headline">{{item.username}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.date}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content>
                       <v-col >
                        <v-btn @click="goToGroup(item.idGroup)" text small >
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
                  {{item.text}}
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
            </v-container>
            
            </v-list>
            
        </div>
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
            actualPosts:[],
            comments:[],
            show:false,
            dialog:false,
            dialogm1: '',
            post:"",
            status: ['Public','Private'],
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
            copies : 0,
            idbets:[],
            bets:[]
            
           
        },

        }
    },
    props:["nome","foto", "idGroup", "posts"],



    created: async function() {
        this.actualPosts = this.posts
        this.updatePosts()
            //console.log(this.post)
        
            var date = new Date(this.post.date);
        
        //var response1 = await axios.get(h + 'posts/1/comments');
        //this.comments = response1.data;
        //console.log(this.comments);

        var user= JSON.parse(localStorage.getItem("user"));

        var response2 = await axios.get(h + 'users/' + user.iduser + '/bets');

        this.bets = response2.data;
        console.log("Isto sao as bets deste user" , this.bets);
        
        
        console.log(bets[0].idbet);
        

        /*
        for(let i=0 ;i<betsuser.length;i++){
            this.idbets.push(betsuser[i].idbet);  
            console.log(this.idbets);
        }

        
        
        console.log(this.idbets);
        */
        var response3 = await axios.get(h + 'bets/' + idbet);
       
        
        
        /*
        this.bets=[{
            id: 1, nome: "bet1"
        },
        {
            id:2, nome:"bet2"
        },
        {
            id:3, nome:"bet3"
        },
        {
            id:4, nome:"bet4"
        }
        ];
        */
    },

    methods:{
        updatePosts: async function(){
          var i 
          for(i = 0; i < this.actualPosts.length; i++){
            this.actualPosts[i].date = this.actualPosts[i].date.getFullYear() +"-"+this.actualPosts[i].date.getMonth()+"-"+this.actualPosts[i].date.getDay()+ " "+ this.actualPosts[i].date.getHours()+":"+ this.actualPosts[i].date.getMinutes() +"h";
            this.actualPosts[i].fotoPerfil = 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
          }
        },
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