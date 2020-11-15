<template>
    <v-container >      
        <v-card    
            color="#D3D3D3"
            elevation="1"
            height="800"
            width="800"
            class="mx-auto"
        >            
            <v-card
                max-width="650"
                height="50"
                class="mx-auto ma-15"
                
                border-color= "#000000" 
            >
                <v-row align-content="space-between" justify="space-around">
                    <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Total apostado </span>
                    <v-img
                        
                        max-height="35"
                        max-width="35"
                        src="https://cdns.iconmonstr.com/wp-content/assets/preview/2018/240/iconmonstr-arrow-right-thin.png"
                    ></v-img>
                    <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Dinheiro que Ganha </span>  

                 </v-row>
            </v-card>

            <!-- cabeçalho dos boletins-->
            <v-card
                width="550"
                height="50"
                class="mx-auto"
                outlined
            >
                <v-row align-content="space-between" justify="space-around">
                    <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Boletim1 </span>
                    <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Odd Total </span>  
                    <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Dinheiro Apostado </span>  
                    <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Dinheiro que Ganha </span>
                </v-row>
            </v-card>

            <!-- sheet dos boletins-->
            <v-card
                max-width="500"
                height="400"
                class="mx-auto"
            >
                <v-simple-table height="200px">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    Jogo
                                </th>
                                <th class="text-left">
                                    Odd
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="event in events"
                                :key="event.idevent"
                            >
                                <td>{{ event.idevent }}</td>
                                <td>{{ event.odd }}</td>
                            </tr>
                        </tbody>
                    </template>
               </v-simple-table>
            </v-card>

            <!-- cabeçalho dos boletins no fim-->
            <v-card
                max-width="550"
                height="50"
                class="mx-auto ma-5"                    
            >
                <v-row  justify="space-around">
                    <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Boletim1 </span>
                    <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Odd Total </span>  
                    <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Dinheiro Apostado </span>  
                    <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Dinheiro que Ganha </span> 
                </v-row>
            </v-card>   
        </v-card>      
    </v-container>
</template>

<script>
import Toolbar from '../components/Toolbar.vue'

export default {
  components: { Toolbar },
    data(){
        return{
        
            events:[
                {
                idevent: 1,
                idbetapi :1,
                odd: 5.5,
                bettype:1,
                idbet:1,
                state:2,
                },
                {
                idevent: 2,
                idbetapi :2,
                odd: 7.5,
                bettype:2,
                idbet:1,
                state:2,
                },
                {
                idevent: 3,
                idbetapi :2,
                odd: 8.5,
                bettype:2,
                idbet:1,
                state:2,
                },
                {
                idevent: 5,
                idbetapi :2,
                odd: 10.5,
                bettype:2,
                idbet:1,
                state:2,
                },
                
            ],   
        }
    }
}
</script>