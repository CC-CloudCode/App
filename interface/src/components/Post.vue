<template>
<v-container class="my-5">
    <v-row dense>
      <v-col cols="12">
         <v-card class="text-xs-center ma-3" >
             
                 
                     
                    <v-row v-if="isToPublish" class="ml-4">
                        
                        <v-list-item-avatar @click="goToProfile(user)">
                        <img :src= user.srcImage>
                        </v-list-item-avatar>
                
         <v-col cols="6" >
             <br><br>
      </v-col>
   
                          </v-row >                  
                            <v-card-text v-if="isToPublish"  >
                           <div >
                            <v-textarea @click:append="publish" v-model="post.text" append-icon="mdi-send-outline" color="#afd29a" auto-grow outlined rows="1" row-height="15"   background-color="grey lighten-3"  placeholder="Write a Post..." ></v-textarea>
                            
                             <v-card-text v-if="this.post.idbet != null"  style="margin-top: -30px"> Aposta/Rascunho selecionada(o)
                                 <v-icon @click="deleteBet()">mdi-delete</v-icon>
                                  <v-select  style="width: 20%"
                                    v-model="betEstado"
                                    :items="status"
                                    menu-props="auto"
                                    label="Tipo de partilha (Aposta)"
                                    solo
                                    single-line
                                    ></v-select>
                             </v-card-text>
                            <v-containter v-else>
                             <v-dialog v-model="draftDialog" scrollable >
                                <template v-slot:activator="{ on, attrs }" >
                                    <v-btn
                                    color="white"
                                    v-bind="attrs"
                                    v-on="on"
                                   
                                    >
                                    Add Rascunho
                                    </v-btn>
                                </template>
                                    <v-card>
        <v-card-title>Select Bet</v-card-title>
        <v-divider ></v-divider>
        <DraftsPost @selectBet="(idBet)=>{selectBet(idBet)}"/>
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




                            
                            
                            <v-dialog v-model="betDialog" scrollable>
                                <template v-slot:activator="{ on, attrs }" >
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
        <v-divider ></v-divider>
        <v-card-text >
            <Bets @selectBet="(idBet)=>{selectBet(idBet)}"/>
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
                            </v-containter>
                           </div>
                       </v-card-text>
                      
                    <hr v-if="this.posts.length!=0 || !isToPublish">
                    
        <div v-if="this.posts.length!=0">
      
         <v-list  v-model="posts" color="transparent" class="justify-center">
            <v-container class="pa-3" v-for="(item, index) in posts" v-bind:key="item.id">
                <hr color="#afd29a" v-if="index!=0">
                <v-list-item>
                    <v-list-item-avatar @click="goToProfile(item.iduser)">
                        <img :src= item.srcImage>
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
               
                <v-card class="pa-3" v-if="item.idbet != null" color="grey lighten-4" outlined>
                    <v-container v-if="item.betpublic">
                    <center>
                    <h3>
                        ODD TOTAL : {{item.oddTotal}}
                    </h3>
                    <br>
                    <v-btn class="white--text" color="#afd29a">Colocar no boletim</v-btn>
                    </center>
                    <v-container v-model="item.events" v-for="event in item.events" v-bind:key="event.idevent">
                        <v-card class="pa-3" max-height="90px" color="grey lighten-5" outlined>
                            <center>
                            <h4>
                                {{event.teamBet}}
                            </h4>
                            </center>
                            <v-row align-content="space-between" justify="space-around">
                            <span> <v-img :src="event.eventBetApi.countryflag" width="20px"></v-img> </span>
                            <span> <v-img :src="event.eventBetApi.hometeamlogo" width="20px"></v-img> </span>
                            <span> {{event.eventBetApi.hometeamname}} </span> 
                            <span> vs </span>
                            <span> {{event.eventBetApi.awayteamname}} </span>
                            <span> <v-img :src="event.eventBetApi.awayteamlogo" width="20px"></v-img></span>
                            <span> Hora: {{event.eventBetApi.begintime}} </span>
                            <span> (Odd: {{event.odd}}) </span>
                            </v-row>
                        </v-card>
                        
                        
                        </v-container>
                    </v-container>
                    <v-container v-else>
                            <v-card-title class="justify-center">
                                Partilha de Aposta Privada
                            </v-card-title>
                        <center>
                            <v-card-text>
                                Nº de jogos: {{item.events.length}}
                            </v-card-text>
                            <v-card-text>
                                Odd Total : {{item.oddTotal}}
                            </v-card-text>
                            <v-btn class="white--text" color="#afd29a">
                                Copiar
                            </v-btn>
                        </center>
                    </v-container>
                </v-card>

                <v-card-actions>
                    <h4 class="ml-2">{{item.postNum}}</h4>
                    
                    <v-btn v-if="item.upvote == null" @click="addLike(item)" fab text small >
                        <v-icon color="grey">mdi-heart</v-icon>
                    </v-btn>
                    <v-btn v-else @click="removeLike(item)" fab text small >
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
import Bets from '@/components/Bets.vue' 
import DraftsPost from '@/components/DraftsPost.vue' 
const h = require("@/config/hosts").hostDataApi

export default {
     components:{
         Comment,
         Bets,
         DraftsPost
  },
    data(){
        return{
            actualPosts:[],
            comments:[],
            show:false,
            token: "",
            betDialog:false,
            betEstado: "Público",
            draftDialog:false,
            dialogm1: '',
            status: ['Público','Privado'],
            post:{idbet : null, text:""},
            user:{}

        }
    },
    props:["nome","foto", "idGroup", "posts", "isToPublish"],



    created: async function() {
        this.actualPosts = this.posts
            //console.log(this.post)
                
        //var response1 = await axios.get(h + 'posts/1/comments');
        //this.comments = response1.data;
        //console.log(this.comments);

        this.user= JSON.parse(localStorage.getItem("user"));
        this.token= localStorage.getItem("jwt");

        this.user.srcImage = h + "images/" + this.user.iduser

        //this.updatePosts()
        
       
        
       
    },

    methods:{
        publish(){
            if(this.post.idbet != null || this.post.text != ""){
                this.post.public = false 
                this.post.betpublic = (this.betEstado == "Público")
                this.post.iduser = this.user.iduser;
                this.post.idgroup = this.idGroup
                axios.post(h + "posts/?token=" + this.token, this.post)
                     .then(() => {
                         this.post.text = ""
                         this.post.idbet = null
                      })
                     .catch((erro) => {})
            }
            else{
                alert("Têm que escrever algo na publicação ou adicionar uma aposta/rascunho.")
            }
        },
        selectBet(idbet){
            this.post.idbet=idbet;
            this.betDialog = false;
            this.draftDialog = false;
        },
        deleteBet(){
            this.post.idbet = null;
        },
        selectDraft(idbet){
            this.post.idbet=idbet;
            this.draftDialog = false;
        },
        updatePosts: async function(){
          for(var i = 0; i < this.posts.length; i++){
              if(this.posts[i].idbet != null){
                  var response = await axios.get(h + "bets/" + this.posts[i].idbet + "/events")
                  this.posts[i].events = response.data
              }
          }
        },
        test: function(){
alert("DEU")
        },
         addLike: async function(post){
            var response = await axios.post(h + "posts/upvotes?token=" + this.token,{iduser:this.user.iduser,idpost:post.idpost})
            post.postNum ++; 
            post.upvote = 1;
        },

        removeLike: async function(post){
            var response = await axios.delete(h + "posts/"+post.idpost+"/upvotes/"+this.user.iduser+"?token=" + this.token)
            post.postNum --; 
            post.upvote = null;
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