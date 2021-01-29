<template>
    <v-content>
      <section id="hero">
        <v-row no-gutters>
          <v-img
            :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
           :src="require('@/assets/home8.jpg')"
          >
            <v-theme-provider dark>
              <v-container fill-height>
                <v-row
                  align="center"
                  class="white--text mx-auto"
                  justify="center"
                >
                  <v-col
                    class="white--text text-center"
                    cols="12"
                    tag="h1"
                  >
                    <span
                    :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']"
                      class="font-weight-light"
                    >
                      Isto é o
                    </span>

                    <br>

                    <span
                      :class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']"
                      class="font-weight-black"
                    >
                      BettingSpree
                    </span>

                  </v-col>

                  <v-btn
                    class="align-self-end"
                    fab
                    outlined
                    @click="$vuetify.goTo('#about-me')"
                  >
                    <v-icon>mdi-chevron-double-down</v-icon>
                  </v-btn>
                </v-row>
              </v-container>
            </v-theme-provider>
          </v-img>
        </v-row>
      </section>

      <section id="about-me">
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">Acerca do BettingSpree</h2>

          <v-responsive
            class="mx-auto mb-8"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-responsive
            class="mx-auto title font-weight-light mb-8"
            max-width="720"
          >
            O BettingSpree é uma casa de apostas, com uma componente social. Ou seja, é uma casa de apostas com uma rede social integrada de maneira a fornecer aos apostadores uma plataforma centralizada para realizarem as suas apostas.
          </v-responsive>

         <center>
            <v-img max-width="300" class="mb-12" :src="require('@/assets/logoBettingSpree.png')"></v-img>
         </center>
          <div></div>

          <v-btn
            class="mr-5"
            color="grey"
            href="businessCase.pdf"
            outlined
            large
            download
          >
            <span class="grey--text text--darken-1 font-weight-bold">
              Modelo de negócio
            </span>
          </v-btn>
          
          <v-btn
            class="ml-5"
            color="grey"
            href="relTecnico.pdf"
            outlined
            large
            download
          >
            <span class="grey--text text--darken-1 font-weight-bold">
              Relatório Técnico
            </span>
          </v-btn>

        </v-container>

        <div class="py-12"></div>
      </section>

      <section
        id="features"
        class="grey lighten-3"
      >
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">Caraterísticas do BettingSpree</h2>

          <v-responsive
            class="mx-auto mb-12"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-row>
            <v-col
              v-for="({ icon, title, text }, i) in features"
              :key="i"
              cols="12"
              md="4"
            >
              <v-card
                class="py-12 px-4"
                color="grey lighten-5"
                flat
              >
                <v-theme-provider dark>
                  <div>
                    <v-avatar
                      color="green"
                      size="88"
                    >
                      <v-icon
                        large
                        v-text="icon"
                      ></v-icon>
                    </v-avatar>
                  </div>
                </v-theme-provider>

                <v-card-title
                  class="justify-center font-weight-black text-uppercase"
                  v-text="title"
                ></v-card-title>

                <v-card-text
                  class="subtitle-1"
                  v-text="text"
                >
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <div class="py-12"></div>
      </section>

      <section id="stats">
        <v-parallax
          :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
          :src="require('@/assets/para2.jpg')"
        >
          <v-container fill-height>
            <v-row class="mx-auto">
              <v-col
                v-for="[value, title] of stats"
                :key="title"
                cols="12"
                md="3"
              >
                <div class="text-center">
                  <div
                    class="display-3 font-weight-black mb-4"
                    v-text="value"
                  ></div>

                  <div
                    class="title font-weight-regular text-uppercase"
                    v-text="title"
                  ></div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-parallax>
      </section>
  
    <!-- Depoimento -->
    <section id="dep" class="grey lighten-3">
        <div class="py-6"></div>

        <v-container>
          <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">Testemunhos</h2>

          <v-responsive
            class="mx-auto mb-12"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

        <center>
         <v-avatar 
            class="elevation-12 mb-12"
            size="128"
          >
            <v-img :src="require('@/assets/test2.png')"></v-img>
          </v-avatar>

        <v-responsive
            class="mx-auto title font-weight-normal mb-2"
            max-width="720"
          >
            Tiago Ferreira
        </v-responsive>


          <v-responsive
            class="mx-auto title font-weight-light mb-8"
            max-width="720"
          >
            "Está simples e prática. Como forma de tornar mais colectiva a maneira de fazer apostas penso que sinceramente está dentro dos requisitos. É sem dúvida intuitiva e criativa"
          </v-responsive>
        
         <v-avatar
            class="elevation-12 mb-12"
            size="128"
          >
            <v-img :src="require('@/assets/test3.jpg')"></v-img>
          </v-avatar>

        <v-responsive
            class="mx-auto title font-weight-normal mb-2"
            max-width="720"
          >
            Daniel Abreu
        </v-responsive>

          <v-responsive
            class="mx-auto title font-weight-light mb-8"
            max-width="720"
          >
            "Pauta-se por uma simplicidade e uma prática brutal, o que é muitas vezes difícil de encontrar. Preenche todos os requisitos para quem está à procura de algo deste género"
          </v-responsive>


        </center>

        </v-container>

        <div class="py-4"></div>
      </section>

      <section id="blog">
        <div class="py-12"></div>

        <v-container>
          <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">Estás pronto para apostar?</h2>

          <v-responsive
            class="mx-auto mb-12"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

        <center>
         <v-btn
            
            color="green"
            href="http://35.232.162.209/"
            outlined
            x-large
          >
            <span class="grey--text text--darken-1 font-weight-bold">
              BettingSpree
            </span>
          </v-btn>
          
          </center>

        </v-container>

        <div class="py-12"></div>
      </section>

      <v-sheet
        id="contact"
        color="#333333"
        dark
        tag="section"
        tile
      >
        <div class="py-12"></div>

        <v-container >
          <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">Entra em contacto connosco</h2>

          <v-responsive
            class="mx-auto mb-12"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-theme-provider light>
            <v-container style="display:block;margin:auto;text-align: center;border-radius: 5px;background-color: #FFFFFF;padding: 20px;width: 75%;" >
         
           <form @submit.prevent="sendEmail">
        
          <input 
            type="text" 
            v-model="name"
            name="Nome"
            placeholder="Nome"
          >
         
          <input 
            type="email" 
            v-model="email"
            name="email"
            placeholder="Email"
            >
         
          <textarea 
            name="message"
            v-model="message"
            cols="30" rows="5"
            placeholder="Mensagem">
          </textarea>
          
          <input type="submit" value="Enviar!">
        </form>
            </v-container>
          </v-theme-provider> 
          
        </v-container>

        <center>
        <v-btn
          class="align-self-end"
          fab
          outlined
          @click="$vuetify.goTo('#about-me')"
        >
          <v-icon>mdi-chevron-double-up</v-icon>
        </v-btn>
        </center>

        <div class="py-12"></div>
      </v-sheet>
    
      <!-- Equipa -->
      <v-sheet
        id="team"
        tag="section"
        tile
      >
        <div class="py-12"></div>

        <v-container >
          <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">Equipa</h2>
          
          <v-responsive
            class="mx-auto mb-12"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

              <v-row>

                <v-col
                  v-for="(image, index) in galeria"
                  :key="index"
                  class="d-flex child-flex"
                  cols="4"
                >
                  <v-hover v-slot="{ hover }">
                  <v-img
                    :src="require(`../assets/${image.name}.jpg`)"
                    :lazy-src="require(`../assets/${image.name}.jpg`)" 
                    aspect-ratio="1"
                    class="grey lighten-2"
                  > 
                  
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out green darken-2 v-card--reveal display-3 white--text"
                        style="height: 100%;"
                      >
                        {{image.description}}
                      </div>
                    </v-expand-transition>
                  
                  </v-img>
                  </v-hover>
                
                </v-col>
              
              </v-row>


        </v-container>
      </v-sheet>
    
    </v-content> 

</template>

<script>
import emailjs from 'emailjs-com';

export default {
data () {
      return {
        name: '',
        email: '',
        message: '',
        articles: [
          {
            src: 'https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
            title: 'Mobile first & Responsive',
            text: 'Phasellus lorem enim, luctus ut velit eget, convallis egestas eros. Sed ornare ligula eget tortor tempor, quis porta tellus dictum.',
          },
          {
            src: 'https://images.unsplash.com/photo-1475938476802-32a7e851dad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
            title: 'Think outside the box',
            text: 'Nam ut leo ipsum. Maecenas pretium aliquam feugiat. Aenean vel tempor est, vitae tincidunt risus. Sed sodales vestibulum nibh.',
          },
          {
            src: 'https://images.unsplash.com/photo-1416339442236-8ceb164046f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1892&q=80',
            title: 'Small changes, big difference',
            text: 'Vestibulum in dictum velit, in rhoncus nibh. Maecenas neque libero, interdum a dignissim in, aliquet vitae lectus. Phasellus lorem enim, luctus ut velit eget.',
          },
        ],
        features: [
          {
            icon: 'mdi-account-group-outline',
            title: 'Comunidade Vibrante',
            text: 'O BettingSpree através do fornecimento de uma rede social integrada, consegue garantir os mecanismos típicos de uma rede social! Promove-se portanto o contacto e a troca de informação numa comunidade rica e vibrante de apostadores, colocando o foco numa comunidade e não na entidade individual.',
          },
          {
            icon: 'mdi-soccer',
            title: 'Casa de apostas',
            text: 'Também é oferecida uma casa de apostas, a partir daqui o utilizador poderá apostar nos principais jogos das principais ligas de futebol! São integrados mecanismos de partilha de apostas, de maneira a que o utilizador com um simples clique consiga partilhar a aposta para toda a comunidade.',
          },
          {
            icon: 'mdi-chart-timeline-variant-shimmer',
            title: 'Estatísticas',
            text: 'De maneira a que se consiga analisar e tomar as melhores decisões no que concerne às apostas, também são oferecidos mecanimos de consulta de estatísticas acerca dos encontros! Desta maneira os utilizadores conseguirão fazer decisões mais certas, apoiadas, e sem ter que recorrer a outros serviços externos.',
          },
        ],
        stats: [
          ['3', 'Ligas'],
          ['18+', 'Métricas de estatística'],
          ['3', 'Bases de Dados'],
          ['1', 'Serviço de Manutenção']
        ],  
        galeria: [
          {name: '1', description: 'Luís Braga'},
          {name: '2', description: 'Luís Martins'},
          {name: '3', description: 'João Nunes'},
          {name: '4', description: 'Mateus Silva'},
          {name: '5', description: 'Filipe Cunha'},
          {name: '6', description: 'Adriana Meireles'},
          {name: '7', description: 'Guilherme Andrade'},
          {name: '13', description: 'Shahzod Yusupov'},
          {name: '12', description: 'Davide Matos'},
        ]

      }
      
    }, 
    methods: { 
        
        sendEmail(e){ 
            try {
                emailjs.sendForm('service_3inu91s', 'template_2zlclcf', e.target,
                    'user_8KuK9O7aoVlZSH91KyasI', {
                    name: this.name,
                    email: this.email,
                    message: this.message
            })
            } catch(error) {
            console.log({error})
            }
        alert("Email enviado com sucesso!")
        // Reset form field
        this.name = ''
        this.email = ''
        this.message = ''            
    }
    
    }
}   
</script>

<style>

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .8;
  position: absolute;
  width: 100%;
}

</style>

<style scoped>
* {box-sizing: border-box;}
label {
  float: left;
}
input[type=text], [type=email], textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}
input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
input[type=submit]:hover {
  background-color: #b8c7b9;
}

</style>