  <template>

<div >

<div class="conversas elevation-5 overflow-y-auto" >
<v-list  subheader >
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

     <div  class="chat">
    <div class="splitscreen">


<template v-for="(item,index) in chats">
        
    <div v-bind:key="index" class="chatopen">
    <beautiful-chat
        style="
            height: 10px;
            width:200px;
            margin-right: 15%;
            padding-right: 15%;
        "
        :participants="item.participants"
      :titleImageUrl="item.titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="item.messageList"
      :newMessagesCount="item.newMessagesCount"
      :isOpen="item.isChatOpen"
      :close="closeChat"
      
      :showEmoji="true"
      :showFile="true"
      :showEdition="false"
      :showDeletion="false"
      :showTypingIndicator="item.showTypingIndicator"
      :showLauncher="true"
      :showCloseButton="true"
      :colors="colors"
      :alwaysScrollToBottom="false"
      :disableUserListToggle="false"
      :messageStyling="true"
      @onType="handleOnType"
      />
    
    </div>   
        </template>
        
        </div>
         </div>
  </div>
</template>

<script>

import io from "socket.io-client";
import axios from 'axios';
/*
import CloseIcon from 'vue-beautiful-chat/src/assets/close-icon.png'
import OpenIcon from 'vue-beautiful-chat/src/assets/logo-no-bg.svg'
import FileIcon from 'vue-beautiful-chat/src/assets/file.svg'
import CloseIconSvg from 'vue-beautiful-chat/src/assets/close.svg'*/
//import Chat from 'vue-beautiful-chat'

const host = require("@/config/hosts").hostChatApi
const hostDataApi = require("@/config/hosts").hostDataApi


export default {
    components: {
 //       Chat
    },
    data () {
      return {
        /*
        icons:{
            open:{
                img: OpenIcon,
                name: 'default',
            },
            close:{
                img: CloseIcon,
                name: 'default',
            },
            file:{
                img: FileIcon,
                name: 'default',
            },
            closeSvg:{
                img: CloseIconSvg,
                name: 'default',
            },
        },*/
        userID: "",
        user :"",
        conversas: [],
        chat: "",
        token:"",
        myself:{},
        chats:[],

        colors: {
            header: {
            bg: '#afd29a',
            text: '#ffffff'
            },
            launcher: {
            bg: '#4e8cff'
            },
            messageList: {
            bg: '#ffffff'
            },
            sentMessage: {
            bg: '#4e8cff',
            text: '#ffffff'
            },
            receivedMessage: {
            bg: '#eaeaea',
            text: '#222222'
            },
            userInput: {
            bg: '#f4f7f9',
            text: '#565867'
            }
        },
      }
            
      },
      props: ['newIduser'],
      watch: {
        newIduser: async function () {
          
          // caso seja um id novo e caso a conversa ainda não exista na lista de conversas
          var conversa = this.conversas.find(element => element.participantes.find(p => p.idUtilizador == this.newIduser))
          if (this.newIduser != -1 && conversa == undefined) {
            await this.refreshConversas()
            var data = {}
            data.to = this.newIduser
            var novaConversa = this.conversas.find(element => element.participantes.find(p => p.idUtilizador == this.newIduser))
            this.abrirChat(novaConversa)
            //console.log(idUser)
            this.socket.emit("refreshConversas", data)
            this.$emit("refreshed")
          }
          else{
            if(conversa != undefined) this.abrirChat(conversa)
          }
        }
      },
      created: async function(){
        this.user = JSON.parse(localStorage.getItem("user"))
        this.token = localStorage.getItem("jwt")
        this.userID = this.user.iduser
        this.socket = io.connect(host,{query:"idUtilizador=" + this.userID});
        //this.myself.id = this.userID
        //this.myself.name = this.user.username
        //this.myself.profilePicture = hostDataApi+'images/'+this.userID
        this.refreshConversas()

          this.socket.on("mensagem", msg => {
            console.log("MENSAGEM RECEBIDA")
            //this.refreshConversas()
            //var idconversa = msg.idConversa
            //var conversa = this.conversas.find(element => element._id == idconversa)
            //conversa.mensagens.push(msg)
            //var chat = this.chats.find(element => element.idConversa == msg.idConversa)
            //console.log(chat)
            //if(chat != undefined){
              //chat.messages = this.parseMessage(conversa.mensagens)
            //}
            
            //"content":"responde joe","participantId":1,"timestamp":"2021-01-15T16:12:04.331-00:00","uploaded":false,"viewed":false,"type":"text"
            console.log(msg)
            var newM = {}
            newM.content = msg.conteudo
            newM.type = 'text'
            newM.participantId = msg.from
            newM.timestamp = msg.dataEnvio
            newM.myself = false
            newM.viewed = false
            newM.uploaded = true
            //console.log(this.chats.find(element => element.idConversa == msg.idConversa ).messages.push)
            //console.log(msg.idConversa)
            
            //var conversa
            //if((conversa = this.conversas.find(element => element._id == msg.idConversa))){
              //conversa.mensagens.push(msg)
              var chat = this.chats.find(element => element.idConversa == msg.idConversa)
              var index = this.chats.indexOf(chat)
              if(chat != undefined){
                this.chats[index].messages.push(newM)
                //console.log(this.chats[index].messages)
              }

              /*setTimeout(() => {
                newM.uploaded = true
            }, 1000)*/
            //}
            //this.chats.find(element => element.idConversa == msg.idConversa ).messages.push(newM)  
        })

        this.socket.on("refreshConversas", data => {
            console.log("refreshConversas")
            this.refreshConversas()
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
              this.conversas[i].avatar = hostDataApi+ '/images/' + id
            }
        },
        /*
        getParticipantById: (state) => (id) => {
                let curr_participant;
                state.participants.forEach(participant => {
                    if (participant.id === id) {
                        curr_participant = participant;
                    }
                });

                return curr_participant;
        },*/
        onMessageSubmit: function (message,chat,index) {
          //console.log(chat)
          console.log("Vou enviar mensagem: " + JSON.stringify(message))
            /*
            * example simulating an upload callback. 
            * It's important to notice that even when your message wasn't send 
            * yet to the server you have to add the message into the array
            */
            this.chats[index].messages.push(message);
                       var data = {}
            var to
            if(chat.participants[0].id == this.userID) to = chat.participants[1].id
            else to = chat.participants[0].id
            data.to = to; /// MUDAR COM SESSOES
            data.idConversa = chat.idConversa;
            data.conteudo = message.content
            data.token = this.token
            //data.avatar = hostDataApi+ '/images/' + this.userID
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
          this.chats[index].isChatOpen = false
          this.chats.splice(index,1)
            
        },
        submitImageIconSize(){

        },
        parseParticipantes(participantes){
            var newParticipantes = []
            participantes.forEach(e =>{
              if(e.idUtilizador != this.userID){
                //alert(JSON.stringify(e))
                var newP = {
                  name: e.nome,
                  id: e.idUtilizador,
                  imageUrl: hostDataApi+'images/'+ e.idUtilizador
                }
                console.log("PARTICIPANTE: " + JSON.stringify(newP))
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
        abrirChat: async function(item){
            console.log(item)
          if(this.chatExiste(item._id))
            return;
          var chat = {}
          await this.refreshConversas()
          var chatAux = this.conversas.find(element => element._id == item._id ) 
          
          chat.idConversa = item._id
          //chat.messages = this.parseMessage(chatAux.mensagens)
          var chatTitle = item.participantes.find(element => this.userID != element.idUtilizador)
          //chat.chatTitle = chatTitle.nome
          chat.titleImageUrl = hostDataApi + "images/" + chatTitle.idUtilizador
          
          chat.messagesList = []
          chat.participants = this.parseParticipantes(chatAux.participantes)
          chat.newMessagesCount = 0
          chat.isChatOpen = true
          item.showTypingIndicator = ''
        //  alert(JSON.stringify(this.parseParticipantes(item.participantes)))
          //chat.participants = this.parseParticipantes(item.participantes) 
          if(this.chats.length >= 3)
            this.chats.splice(2,1)
          this.chats.push(chat)
        },
        nomeUtilizador: function(item){
          if( item.participantes[0].idUtilizador == this.userID ) return item.participantes[1].nome
          else return item.participantes[0].nome
        },
        sendMessage (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author: 'support', type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
      // called when the user sends a message
      this.messageList = [ ...this.messageList, message ]
    },
    openChat () {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    },
    handleScrollToTop () {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType () {
      console.log('Emit typing event')
    },
    editMessage(message){
      const m = this.messageList.find(m=>m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    }
      }
    }
</script>

  
  
<style >

.chat{
	position: fixed;
	right: 0px;
    bottom: 0px;
    padding-right : 13.5%;  
    margin-right : 13.5%;
   z-index:99;
}

.chatopen{
    height: 10px;
    width:200px;
    margin-right: 15%;
    padding-right: 15%;
}

.conversas{
	position: fixed;
	right: 0px;
  bottom: 0px;
  width: 13.5%;
  height:40%; 
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