<template>
<v-container class="my-5">
    <v-row dense>
      <v-col cols="12">
         <v-card class="text-xs-center ma-3" >

            <v-list-item>
                    <v-list-item-avatar @click="goToProfile(user)">
                        <img src="../assets/default_avatar.jpg">
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="headline">Saitama</v-list-item-title>
                        <v-list-item-subtitle>Wed, 10:15 AM</v-list-item-subtitle>
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
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident nam debitis animi, et, rem vitae mollitia ad quidem, aspernatur deserunt a perferendis! Sit laboriosam deleniti commodi repudiandae explicabo minus dolorem.
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad tempore molestiae nesciunt aspernatur, ex officiis quam eum dolores voluptates similique nulla fugit quisquam velit est distinctio placeat, commodi hic quidem?
                </v-card-text>
                <v-card-actions>
                    <h4 class="ma-0">20</h4>
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
                            <v-text-field class="questrial" height="45px" background-color="grey lighten-3" append-icon="mdi-camera " placeholder="Write a comment..." rounded></v-text-field>
                           </div>
                       </v-card-text>
                     </div>
                </v-expand-transition>

         </v-card>
      </v-col>
    </v-row>


</v-container>
</template>


<script>

export default {
    data(){
        return{
            show:false,
            links: [
                {icon: 'share' ,text: 'Share'},
                {icon: 'report', text: 'Report'},
                {icon: 'save', text: 'Save'}
            ]

        }
    },

    created: async function() {
        // sacar as informacoes do Post com axios
    },

    methods:{

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