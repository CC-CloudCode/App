  <template>

<div >

<div class="teste elevation-5" >
<v-list subheader>
      <v-subheader>Chat</v-subheader>

      <v-list-item
        v-for="item in items"
        :key="item.title"
        @click="abrirChat(item)"
      >
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon :color="item.active ? '#900000' : 'grey'">mdi-message</v-icon>
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
import 'vue-quick-chat/dist/vue-quick-chat.css';

export default {
    components: {
      Chat
    },
    data () {
      return {
          userID: "Filipe",
          chat:  {messages:[ 
                              {
                                  content: 'received messages',
                                  myself: false,
                                  participantId: 1,
                                  timestamp: {year: 2019, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123},
                                  type: 'text'
                              },
                            ],
                  
                  
                  participants: [
                                  {
                                      name: 'Arnaldo',
                                      id: 1,
                                      profilePicture: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/NafSadh_Profile.jpg/768px-NafSadh_Profile.jpg'
                                  },
                                  {
                                      name: 'José',
                                      id: 2,
                                      profilePicture: 'https://lh3.googleusercontent.com/-G1d4-a7d_TY/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPez_wX5UCJztzEUeCxOd7HBK7-jA.CMID/s83-c/photo.jpg'
                                  }
                                ],
                
                },
        items: [
          { active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
          { active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
          { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
          { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }
        ],
        items2: [
          { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' }
        ],


        chats:[{
                
                  messages:[ 
                              {
                                  content: 'received messages',
                                  myself: false,
                                  participantId: 1,
                                  timestamp: {year: 2019, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123},
                                  type: 'text'
                              },
                            ],
                  
                  
                  participants: [
                                  {
                                      name: 'Arnaldo',
                                      id: 1,
                                      profilePicture: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/NafSadh_Profile.jpg/768px-NafSadh_Profile.jpg'
                                  },
                                  {
                                      name: 'José',
                                      id: 2,
                                      profilePicture: 'https://lh3.googleusercontent.com/-G1d4-a7d_TY/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPez_wX5UCJztzEUeCxOd7HBK7-jA.CMID/s83-c/photo.jpg'
                                  }
                                ],
                
                },


                {
                
                  messages:[ 
                              {
                                  content: 'received messages',
                                  myself: false,
                                  participantId: 1,
                                  timestamp: {year: 2019, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123},
                                  type: 'text'
                              },
                            ],
                  
                  
                  participants: [
                                  {
                                      name: 'Arnaldo',
                                      id: 1,
                                      profilePicture: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/NafSadh_Profile.jpg/768px-NafSadh_Profile.jpg'
                                  },
                                  {
                                      name: 'José',
                                      id: 2,
                                      profilePicture: 'https://lh3.googleusercontent.com/-G1d4-a7d_TY/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPez_wX5UCJztzEUeCxOd7HBK7-jA.CMID/s83-c/photo.jpg'
                                  }
                                ],
                
                }
                ],

              myself: {
              name: this.userID,
              id: this.userID,
              profilePicture: ''
          },
           
            chatTitle: '',
            placeholder: 'Mensagem...',
            colors: {
                header: {
                    bg: '#d30303',
                    text: '#fff'
                },
                message: {
                    myself: {
                        bg: '#fff',
                        text: '#bdb8b8'
                    },
                    others: {
                        bg: '#fb4141',
                        text: '#fff'
                    },
                    messagesDisplay: {
                        bg: '#f7f3f3'
                    }
                },
                submitIcon: '#b91010',
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

      },
      methods:{
                onCloses(index) {
          this.chats.splice(index,1)
      },
              abrirChat(item){
          
          if(this.chats.length >= 3)
            this.chats.splice(2,1)
          this.chats.push(this.chat)
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