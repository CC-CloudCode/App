<template>
<v-container class="my-5">
    <v-row dense>
      <v-col cols="12">
         <v-card class="text-xs-center ma-3" >
             
                 
                     
                    <v-row v-if="isToPublish" class="ml-4">
                        
                        <v-list-item-avatar @click="goToProfile(user.iduser)" style="display: inline-block; cursor: pointer;">
                        <img :src= user.srcImage>
                        </v-list-item-avatar>
                
         <v-col cols="6" >
             <br><br>
      </v-col>
   
                          </v-row >                  
                            <v-card-text v-if="isToPublish"  >
                           <div >
                            <v-textarea @click:append="publish" v-model="post.text" append-icon="mdi-send-outline" color="#afd29a" auto-grow outlined rows="1" row-height="15"   background-color="grey lighten-3"  placeholder="Escreva algo sobre a publicação..." ></v-textarea>
                            
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
                            <v-container v-else>
                             <v-dialog v-model="draftDialog" scrollable >
                                <template v-slot:activator="{ on, attrs }" >
                                    <v-btn
                                    class="grey--text"
                                    color="white"
                                    v-bind="attrs"
                                    v-on="on"
                                   
                                    >
                                    <v-icon>mdi-plus-circle-outline</v-icon>
                                    Rascunho
                                    </v-btn>
                                </template>
                                    <v-card>
        <v-card-title>Select Bet</v-card-title>
        <v-divider ></v-divider>
        <DraftsPost @selectBet="(idBet)=>{selectBet(idBet)}"/>
        <v-divider></v-divider>
      </v-card>
                            </v-dialog>




                            
                            
                            <v-dialog width="70%" v-model="betDialog" scrollable>
                                <template v-slot:activator="{ on, attrs }" >
                                    <v-btn
                                    class="grey--text"
                                    color="white"
                                    v-bind="attrs"
                                    v-on="on"
                                    >
                                    <v-icon>mdi-plus-circle-outline</v-icon>
                                    Bet
                                    </v-btn>
                                </template>
                                    <v-card>
        <v-card-title>Select Bet</v-card-title>
        <v-divider ></v-divider>
        <v-card-text >
            <Bets @selectBet="(idBet)=>{selectBet(idBet)}"/>
        </v-card-text>
        <v-divider></v-divider>
      </v-card>
                            </v-dialog>
                            </v-container>
                           </div>
                       </v-card-text>
                      
                    <hr v-if="this.myPosts.length!=0 || !isToPublish">
                    
        <div v-if="this.myPosts.length!=0">
      
         <v-list :key="id"  v-model="myPosts" color="transparent" class="justify-center">
            <v-container class="pa-3" v-for="(item, index) in myPosts" v-bind:key="item.idpost">
                <hr color="#afd29a" v-if="index!=0">
                <v-list-item>
                    <v-list-item-avatar @click="goToProfile(item.iduser)" style="display: inline-block; cursor: pointer;">
                        <img :src= item.srcImage>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="headline" @click="goToProfile(item.iduser)" style="display: inline-block; cursor: pointer;">{{item.username}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.date}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content>
                       <v-col >
                        <v-btn v-if="item.idgroup != null" @click="goToGroup(item.idgroup)" text small >
                            <v-icon >mdi-account-group</v-icon>
                            <span class="ma-1">{{item.namegroup}}</span>
                        </v-btn>
                       </v-col>

                    </v-list-item-content>

                        <v-spacer></v-spacer>


                    <v-card-actions>
                        <v-icon @click="copyLink(item)"> mdi-share-variant-outline</v-icon>
                        <v-icon v-if="item.iduser == user.iduser || isAdmin" @click="deletePost(item.idpost)" style="padding-left:22.0%"> mdi-trash-can-outline</v-icon>
                    </v-card-actions>
                </v-list-item>
                
               
                <v-card-text>
                  {{item.text}}
                </v-card-text>
               
                <v-card class="pa-3" v-if="item.idbet != null" color="grey lighten-4" outlined>
                    <v-container v-if="item.betpublic">
                    <center>
                    <h3>
                        ODD TOTAL : {{item.oddTotal.toFixed(2)}}
                    </h3>
                    <br>
                    <v-btn class="white--text" color="#afd29a" @click="colocaNoBoletim(item.events)">Colocar no boletim</v-btn>
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
                            <span> (Odd: {{event.odd.toFixed(2)}}) </span>
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
                                Odd Total : {{item.oddTotal.toFixed(2)}}
                            </v-card-text>
                            <v-btn v-if="user.iduser != item.iduser" class="white--text" color="#afd29a" @click="copyBet(item.oddTotal.toFixed(2), item.events, item.idbet)">
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
                    <span>Gosto</span>
                    <v-btn fab text small @click="showComments(index)">

                        <v-icon color="grey" > mdi-comment  </v-icon>
                    </v-btn>
                    <span>Comentar</span>




                </v-card-actions>
                
                <v-expand-transition>
                     <div v-if="item.showComments">
                       <v-divider></v-divider>
                        <Comment v-if="item.showComments" :comments="item.comments" :isAdmin="isAdmin" :isMyPost="item.iduser == user.iduser"/>
                        <v-card-text>
                           <div>
                            <v-textarea @click:append="makeComment(item)" v-model="item.textComment" append-icon="mdi-send-outline" auto-grow outlined rows="1" row-height="15"   background-color="grey lighten-3"  placeholder="Escreva um comentário..." ></v-textarea>
                           </div>
                       </v-card-text>
                     </div>
                    
                </v-expand-transition>
            </v-container>
            
            </v-list>

            <v-dialog
            width="40%"
            v-model="showPrivateBet"
            style="z-index:1010"
            >
            <v-card class="pa-5">
                 <v-text-field
                    class="pa-1"
                    name="textFieldQuantia"
                    v-model.number="textFieldQuantia"
                    type="number"
                    label="Quantia"
                    placeholder="100.00€"
                    :rules="rulesQuantia" 
                    outlined
                    @change="calculaGains()"
                    required
                  ></v-text-field>
                  <div v-if="gains != null && gains > 0">
                    <p
                      class="font-weight-bold green--text"
                      style="white-space: pre-line"
                    >
                      Ganhos Totais: {{ this.gains.toFixed(2) }}€
                    </p>
                  </div>
                  <center>
                  <v-btn  text small @click="makebet" >
                      Apostar
                  </v-btn> 
                  </center>
            </v-card>
            </v-dialog>
            
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
const betsApi = require('@/config/hosts.js').hostBetsApi


export default {
     components:{
         Comment,
         Bets,
         DraftsPost
  },
    data(){
        return{
            id:0,
            actualPosts:[],
            showPrivateBet : false,
            betAtual: {
                events: [],
                oddTotal: 0
            },
            myPosts:[],
            comments:[],
            show:false,
            token: "",
            betDialog:false,
            betEstado: "Público",
            draftDialog:false,
            dialogm1: '',
            status: ['Público','Privado'],
            post:{idbet : null, text:""},
            user:{},
            postsAux:[],
            textComment:"",
             rulesQuantia: [
                v => {
                const pattern1 = /^\d+$/
                const pattern2 = /^\d+\.\d$/
                const pattern3 = /^\d+\.\d\d$/
                return (pattern1.test(v) || pattern2.test(v) || pattern3.test(v)) || 'Formato de número inválido'
                },
                v => v > 0 || 'Não pode introduzir um valor negativo ou zero'
                
                
                ], 
            textFieldQuantia: '', 
            gains:''
        }
    },
    props:["nome","foto", "idGroup", "posts", "isToPublish", "isAdmin"],



    created: async function() {
        this.actualPosts = this.posts
            //console.log(this.post)
                
        //var response1 = await axios.get(h + 'posts/1/comments');
        //this.comments = response1.data;
        //console.log(this.comments);

        this.user= JSON.parse(localStorage.getItem("user"));
        this.token= localStorage.getItem("jwt");

        this.user.srcImage = h + "images/" + this.user.iduser
        this.myPosts = this.posts


        //this.updatePosts()
        
       
        
       
    },
    computed: {
        
    },

    methods:{
        publish(){
            if(this.post.idbet != null || this.post.text != ""){
                this.post.public = false 
                this.post.betpublic = (this.betEstado == "Público")
                this.post.iduser = this.user.iduser;
                this.post.idgroup = this.idGroup
                axios.post(h + "posts/?token=" + this.token, this.post)
                     .then(async () => {
                         this.post.text = ""
                         this.post.idbet = null
                         if(this.idGroup == null){
                             var response = await axios.get(h + "users/" + this.user.iduser + "/feed/?token=" + this.token)
                         }
                         else{
                             var response = await axios.get(h + "groups/" + this.idGroup + "/posts/?token=" + this.token)
                         }
                         
                         this.postsAux = response.data
                         await this.updatePosts()
                         this.myPosts = this.postsAux
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
        copyLink(item){
            let url = "http://localhost:8080/posts/" + item.idpost
            navigator.clipboard.writeText(url);
            alert("Ligação da publicação copiada!")
            //document.execCommand("copy");
        },
        selectDraft(idbet){
            this.post.idbet=idbet;
            this.draftDialog = false;
        },
        deletePost: async function(idpost){
            if(confirm("De certeza que pretende apagar esta publicação?")){
                var aux = await axios.delete(h + "posts/" + idpost +"?token="+this.token)
                if(this.idGroup == null){
                    if(this.$route.name == "Meu Perfil"){
                        var response = await axios.get(h + "users/" + this.user.iduser + "/posts?token=" + this.token)
                    }
                    else {
                        var response = await axios.get(h + "users/" + this.user.iduser + "/feed?token=" + this.token)
                    }
                }
                else{
                    var response = await axios.get(h + "groups/" + this.idGroup + "/posts?token=" + this.token)
                }
                this.postsAux = response.data
                var updated = await this.updatePosts()
                this.myPosts = this.postsAux
            }

        },
        updatePosts: async function(){
        var finished = false
        for(var i = 0; i < this.postsAux.length; i++){
          this.postsAux[i].showComments = false;
          this.postsAux[i].srcImage = h +'images/'+this.postsAux[i].iduser
          await this.getBet(i)
          if(i == this.postsAux.length-1) finished = true
        }
        return finished
      },
      getBet: async function(i){
        if(this.postsAux[i].idbet != null){
            var response = await axios.get(h + "bets/" + this.postsAux[i].idbet + "/events" + "/?token=" + this.token)
            this.postsAux[i].events = response.data
            this.postsAux[i].oddTotal = 1
            for(var j = 0; j < this.postsAux[i].events.length; j++){
                var response2 = await axios.get(betsApi + "fixtures/" +this.postsAux[i].events[j].idbetapi )
                this.postsAux[i].events[j].eventBetApi = response2.data[0]
                this.postsAux[i].events[j].eventBetApi.begintime = this.postsAux[i].events[j].eventBetApi.begintime.substr(0,19).replace('T', ' ') 
                if(this.postsAux[i].events[j].bettype == 0){
                    this.postsAux[i].events[j].teamBet = response2.data[0].hometeamname
                    this.postsAux[i].events[j].odd = response2.data[0].oddhome
                     
                }
                else if(this.postsAux[i].events[j].bettype == 1){
                    this.postsAux[i].events[j].teamBet = response2.data[0].hometeamname + " " + response2.data[0].awayteamname
                    this.postsAux[i].events[j].odd = response2.data[0].odddraw
                }
                else{
                    this.postsAux[i].events[j].teamBet = response2.data[0].awayteamname
                    this.postsAux[i].events[j].odd = response2.data[0].oddaway
                }
                this.postsAux[i].oddTotal *= this.postsAux[i].events[j].odd
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
        
        goToProfile: function(iduser){
            if(iduser == this.user.iduser){
                this.$router.push({name: "Meu Perfil"})
            }
            else{
                this.$router.push({name: 'Perfil', params:{ id : iduser}})
            }
        },
        goToGroup: function(user){
           // this.$router.push({name: "testing",params: user})
        },
        showComments: async function(index){
            if(!this.myPosts[index].showComments){
                this.myPosts[index].textComment = ""
                if(this.myPosts[index].comments == undefined){
                    var response = await axios.get(h + "posts/" + this.myPosts[index].idpost + "/comments?token=" + this.token)
                    this.myPosts[index].comments = response.data
                    for(var i = 0; i < this.myPosts[index].comments.length; i++){
                        this.myPosts[index].comments[i].foto = h + "images/" + this.myPosts[index].comments[i].iduser
                    }
                }
                this.$set(this.myPosts[index], "showComments", true)
            }
            else {
                this.$set(this.myPosts[index], "showComments", false)
            }
            //this.$nextTick(function(){this.$set(this.myPosts[index], "showComments", !this.myPosts[index].showComments);console.log(this.myPosts[index].showComments)})
            this.id++;
            console.log(this.myPosts[index].showComments)
        },
        makeComment: async function(post){
            var comment ={}
            if(post.textComment.length > 0){
                comment.idpost = post.idpost
                comment.iduser = this.user.iduser
                comment.text = post.textComment
                await axios.post(h + "comments/?token=" + this.token, comment)
                post.textComment = ""
                var response = await axios.get(h + "posts/" + post.idpost + "/comments?token=" + this.token)
                this.$set(post, "comments", response.data)
                for(var i = 0; i < post.comments.length; i++){
                        post.comments[i].foto = h + "images/" + post.comments[i].iduser
                }
                this.id++;
            }
        },
        colocaNoBoletim: async function(events){
            
            this.$emit("refreshCart")
            console.log("refreshCart nas pubs")
            for(var i = 0; i < events.length; i++){
                    var obj = {}
                    //obj.name = this.drafts[index].ve
                    obj.team = events[i].teamBet;
                    obj.odd = events[i].odd;
                    obj.idfixture = events[i].idbetapi;
                    obj.tipoaposta = events[i].bettype;

                    console.log("addCart: " + JSON.stringify(obj) )

                    this.$emit("refreshBoletim", obj)
                }
        },
        copyBet: async function(oddTotal, events, idbet){
            this.betAtual.oddTotal = oddTotal
            this.betAtual.idbet = idbet
            this.betAtual.events = events
            this.showPrivateBet = true
        },
        calculaGains: async function(){
            this.gains = this.betAtual.oddTotal * this.textFieldQuantia
        },
        async makebet(){ 

        console.log(this.textFieldQuantia)

        var noValueMoney = false

        var userid = JSON.parse(localStorage.getItem("user")).iduser
        var response = await axios.get(h + "users/" + userid + "/balance" + "/?token=" + this.token)

        var balance = response.data.balance

        if(this.textFieldQuantia > balance){
          noValueMoney = true;  
          this.$emit("noValueMoney",true)    
          //this.dialog=false
          return;
        }
          // verificar se tem saldo indisponível ---> por fazer
          //...

          // verificar se os jogos estão disponiveis para apostar:
          var notOpenFixture = false;

          var pedidos = []
          var i = 0;
          for(; i < this.betAtual.events.length; i++){
            pedidos[i] = await axios.get(betsApi + "fixtures/isopen/"+this.betAtual.events[i].eventBetApi.idfixture)
          }

          axios
               .all(pedidos)
               .then(
                 axios.spread((...responses) => {
                   for(var j = 0; j<responses.length; j++){
                     //console.log("aaaaaaa  " + responses[j].data[0].isopen)
                     //this.actualCartFixture = this.cart[j].team
                     if(responses[j].data[0].isopen == 0){
                       var notOpenFixture = true;
                       return;
                     }

                   }
                   //se chega aqui é porque os jogos estão todos disponiveis
                   
                   var bet = {}
                   //bet.cart = this.cart
                   bet.money = parseFloat(this.textFieldQuantia)
                  //fazer o post da bet

                  var currentdate = new Date(); 
                  var datetime = currentdate.getFullYear() + '-' + currentdate.getMonth() + '-' + currentdate.getDate()
                                + 'T' + currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds();
                  bet.date = datetime

                  bet.iduser = JSON.parse(localStorage.getItem("user")).iduser
                  bet.originalbetid = this.betAtual.idbet
                  bet.isdraft = false
                  console.log(bet)
                  axios.post(h + 'bets' + "/?token=" + this.token, bet)
                    .then(async dados => {
                      console.log(dados.data.insertId)
                      var betid = dados.data.insertId
                      console.log('id da bet' + betid)
                      var item = {}
                      
                      for(var i = 0; i < this.betAtual.events.length; i++){
                        event = {}
                        event.idbetapi = this.betAtual.events[i].eventBetApi.idfixture
                        event.odd =  this.betAtual.events[i].odd
                        event.bettype =  this.betAtual.events[i].bettype
                        event.idbet = betid 
                        console.log(event)
                        // if else para apenas retirar o balanço da aposta no último evento do boletim e para não repetir 
                        if (i != this.betAtual.events.length-1){ 
                          await axios.post(h + 'bets/events/' + "?token=" + this.token, event) 
                        } else { 
                           axios.post(h + 'bets/events' + "/?token=" + this.token, event)
                          .then(dados => {
                            
                            axios.put(h + "users/" + userid + "/balance" + "/?token=" + this.token, {balance: -this.textFieldQuantia}).then(dados => { 
                              
                              this.$emit("refreshBalance")
                              this.showPrivateBet = false
                            
                              
                            })
                            

                          })
                          .catch(err => {this.error = err.message})
                        }
  
                      } 
                      

                    })
                    .catch(err => {this.error = err.message})
                }

                 )
               )
               .catch((err) => {
                 this.error = err.message;
               });
      }

    }
}
</script>