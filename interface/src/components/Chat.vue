  <template>

<div >

<div class="teste elevation-5" >
<v-list subheader>
      <v-subheader>Chat</v-subheader>

      <v-list-item
        v-for="item in conversas"
        :key="item.idConversa"
        @click="abrirChat(item)"
      >
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="nomeUtilizador(item)"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon color='#aacc95'> mdi-message</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>

    </div>

     <div  class=" teste1 " style="padding-right : 13%">
    <div class="splitscreen">


<template v-for="(item,index) in chats">
        
        <Chat v-bind:key ="item" style="width: 300px; height:350px; margin-right:20px"

        :participants="item.participants"
        :myself="myself"
        :messages="item.messages"
        :chat-title="chatTitle"
        :placeholder="placeholder"
        :colors="colors"
        :border-style="borderStyle"
        :hide-close-button="hideCloseButton"
        :close-button-icon-size="closeButtonIconSize"
        :submit-icon-size="submitIconSize"
        :submit-image-icon-size="submitImageIconSize"
        :load-more-messages="toLoad.length > 0 ? loadMoreMessages : null"
        :async-mode="asyncMode"
        :scroll-bottom="scrollBottom"
        :display-header="true"
        :send-images="false"
        :profile-picture-config="profilePictureConfig"
        :timestamp-config="timestampConfig"
        @onImageClicked="onImageClicked"
        @onMessageSubmit="(message) => {onMessageSubmit(message,item,index)}"
        @onType="onType(item)"
        @onClose="onCloses(index)"/>

        </template>
        
        </div>
         </div>
  </div>
</template>

<script>

import { Chat } from 'vue-quick-chat'
import io from "socket.io-client";
import axios from 'axios';
import 'vue-quick-chat/dist/vue-quick-chat.css';
const host = require("@/config/hosts").hostChatApi


export default {
    components: {
      Chat
    },
    data () {
      return {
          userID: "",
          user :"",
          conversas: [],
          chat: "",
        items: [
          { active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
          { active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
          { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
          { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }
        ],
        items2: [
          { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' }
        ],


        chats:[],

              myself: {
              name: this.userID,
              id: this.userID,
              profilePicture: ''
          },
           
            chatTitle: '',
            placeholder: 'Mensagem...',
            colors: {
                header: {
                    bg: '#aacc95',
                    text: '#fff'
                },
                message: {
                    myself: {
                        bg: '#fff',
                        text: '#bdb8b8'
                    },
                    others: {
                        bg: '#afd29a',
                        text: '#fff'
                    },
                    messagesDisplay: {
                        bg: '#f7f3f3'
                    }
                },
                submitIcon: '#afd29a',
                submitImageIcon: '#b91010',
            },
            borderStyle: {
                topLeft: "10px",
                topRight: "10px",
                bottomLeft: "10px",
                bottomRight: "10px",
            },
            hideCloseButton: false,
            submitIconSize: 25,
            closeButtonIconSize: "20px",
            asyncMode: false,
            toLoad: [
                {
                    content: 'Hey, John Doe! How are you today?',
                    myself: false,
                    participantId: 2,
                    timestamp: {year: 2011, month: 3, day: 5, hour: 10, minute: 10, second: 3, millisecond: 123},
                    uploaded: true,
                    viewed: true,
                    type: 'text'
                },
                {
                    content: "Hey, Adam! I'm feeling really fine this evening.",
                    myself: true,
                    participantId: 3,
                    timestamp: {year: 2010, month: 0, day: 5, hour: 19, minute: 10, second: 3, millisecond: 123},
                    uploaded: true,
                    viewed: true,
                    type: 'text'
                },
            ],
            scrollBottom: {
                messageSent: true,
                messageReceived: false
            },
            displayHeader:true,
            profilePictureConfig: {
                others: true,
                myself: true,
                styles: {
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%'
                }
            },
            timestampConfig: {   
                format: 'HH:mm',
                relative: false
            }
        }
      },
      created: async function(){
        this.user = JSON.parse(localStorage.getItem("user"))
        this.userID = this.user.iduser
        this.socket = io.connect(host,{query:"idUtilizador=" + this.userID});
        this.myself.id = this.userID
        this.refreshConversas()

          this.socket.on("mensagem", msg => {
      console.log("MENSAGEM RECEBIDA")
      console.log(msg)
      var newM = {}
      newM.content = msg.conteudo
      newM.type = 'text'
      newM.participantId = msg.from
      newM.timestamp = msg.dataEnvio

      this.chats.find(element => element.idConversa == msg.idConversa ).messages.push(newM)  
  })

      },
      methods:{
         refreshConversas: async function () {
            let response = await axios.get(host+"api/conversas/participante/"+ this.userID + "?token=" + this.token )
            console.log(response.data)
            this.conversas = response.data
            for(let i = 0; i<this.conversas.length; i++){
              var id
              if(this.userID == this.conversas[i].participantes[0].idUtilizador) id = this.conversas[i].participantes[1].idUtilizador
              else id = this.conversas[i].participantes[0].idUtilizador
              this.conversas[i].avatar = host+ '/images/' + id
            }
        },
        loadMoreMessages(resolve) {
            setTimeout(() => {
                resolve(this.toLoad); //We end the loading state and add the messages
                //Make sure the loaded messages are also added to our local messages copy or they will be lost
                this.messages.unshift(...this.toLoad);
                this.toLoad = [];
            }, 1000);
        },
        onMessageSubmit: function (message,chat,index) {
          console.log(chat)
          console.log(message)
            /*
            * example simulating an upload callback. 
            * It's important to notice that even when your message wasn't send 
            * yet to the server you have to add the message into the array
            */
            this.chats[index].messages.push(message);
                       var data = {}
            data.to = chat.participants[0].id; /// MUDAR COM SESSOES
            data.idConversa = chat.idConversa;
            data.conteudo = message.content
            data.from = this.userID;
           // alert(data)
            this.socket.emit('mensagem', data)
            
 
            /*
            * you can update message state after the server response
            */
            // timeout simulating the request
            setTimeout(() => {
                message.uploaded = true
            }, 2000)
        },
        onCloses(index) {
          this.chats.splice(index,1)
            
        },
        parseParticipantes(participantes){
            var newParticipantes = []
            participantes.forEach(e =>{
              if(e.idUtilizador != this.userID){
                //alert(JSON.stringify(e))
                var newP = {
                  name: e.nome,
                  id: e.idUtilizador,
                  profilePicture: host+'images/'+ e.idUtilizador
                }
                newParticipantes.push(newP)
              }
            })
            /*
            for(let i = 0; i < participantes.length; i++){
              e = participantes[i]
              if(e.idUtilizador != this.userID){
                alert(JSON.stringify(e))
                var newP = {
                  name: e.nome,
                  id: e.idUtilizador,
                  profilePicture: host+'images/'+ e.idUtilizador
                }
                newParticipantes.push(newP)
              }

            }*/
            return newParticipantes;
        },
        parseMessage(messages){
          var newMessages = []
            messages.forEach(m => {
              var newM = {}
              newM.content = m.conteudo
              newM.type = 'text'
              newM.participantId = m.from
              newM.timestamp = m.dataEnvio 
              if(m.from == this.userID)
                newM.myself = true
              else 
                newM.myself = false
              newMessages.push(newM)
            });
            return newMessages
        },
        chatExiste(idConversa){
          var result = false;
          this.chats.forEach(e => {
            if(e.idConversa == idConversa)
              result = true
          })
          return result
        },
        abrirChat(item){
          if(this.chatExiste(item._id))
            return;
          var chat = {}
          this.refreshConversas()
          chat.idConversa = item._id
          chat.messages = this.parseMessage(item.mensagens) 
        //  alert(JSON.stringify(this.parseParticipantes(item.participantes)))
          chat.participants = this.parseParticipantes(item.participantes) 
          if(this.chats.length >= 3)
            this.chats.splice(2,1)
          this.chats.push(chat)
        },
        nomeUtilizador: function(item){
          if( item.participantes[0].idUtilizador == this.userID ) return item.participantes[1].nome
          else return item.participantes[0].nome
        },
      }
    }
</script>

  
  
<style >

.teste1{
	position: fixed;
	right: 0px;
  bottom: 0px;

   z-index:99;
}

.teste{
	position: fixed;
	right: 0px;
  bottom: 0px;
  width: 13.5%;
  height:50%; 
  background:white;
   z-index:100;
}

.doctor {
  position: -webkit-sticky;
  position: sticky;
  float: right;
  bottom: 1rem;
  align-self: flex-end;
}


.splitscreen {
    display:flex;
}
.splitscreen .left {
    flex: 1;
}
.splitscreen .right {
    flex: 1;
}

.message-content{
    width:100%;
}


</style>