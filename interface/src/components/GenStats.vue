<template>
    
                            <v-row align="start" justify="center">
                              <v-col>
                                
                                <h3> {{this.statshometeam}}: </h3>

                                <p :class="this.hometeamstats.matchsPlayedHome > this.awayteamstats.matchsPlayedHome ? 'font-weight-bold' : ''">
                                  {{
                                    this.hometeamstats.matchsPlayedHome
                                  }}
                                  Jogos jogados em casa
                                </p>

                                <p :class="this.hometeamstats.matchsPlayedAway > this.awayteamstats.matchsPlayedAway ? 'font-weight-bold' : ''">
                                  {{
                                    this.hometeamstats.matchsPlayedAway
                                  }}
                                  Jogos jogados fora de casa
                                </p>

                                <p :class="this.hometeamstats.winsHome > this.awayteamstats.winsHome ? 'font-weight-bold' : ''" >
                                  {{ this.hometeamstats.winsHome }} Vitórias em
                                  casa
                                </p>

                                <p :class="this.hometeamstats.winsAway > this.awayteamstats.winsAway ? 'font-weight-bold' : ''">
                                  {{ this.hometeamstats.winsAway }} Vitórias
                                  fora
                                </p>

                                <p :class="this.hometeamstats.losesHome > this.awayteamstats.losesHome ? 'font-weight-bold' : ''">
                                  {{ this.hometeamstats.losesHome }} Derrotas
                                  casa
                                </p>

                                <p :class="this.hometeamstats.losesAway > this.awayteamstats.losesAway ? 'font-weight-bold' : ''">
                                  {{ this.hometeamstats.losesAway }} Derrotas
                                  fora
                                </p>

                                <p :class="this.hometeamstats.drawsAway > this.awayteamstats.drawsAway ? 'font-weight-bold' : ''">
                                  {{ this.hometeamstats.drawsAway }} Empates
                                  fora
                                </p>
                                
                                <p :class="this.hometeamstats.drawsHome > this.awayteamstats.drawsHome ? 'font-weight-bold' : ''">
                                  {{ this.hometeamstats.drawsHome }} Empates
                                  casa
                                </p>
                                
                                <p :class="this.hometeamstats.goalsForHome > this.awayteamstats.goalsForHome ? 'font-weight-bold' : ''">
                                  {{ this.hometeamstats.goalsForHome }} Golos
                                  marcados em casa
                                </p>
                                
                                <p :class="this.hometeamstats.goalsForAway > this.awayteamstats.goalsForAway ? 'font-weight-bold' : ''">
                                  {{ this.hometeamstats.goalsForAway }} Golos
                                  marcados fora de casa
                                </p>
                                
                                <p :class="this.hometeamstats.goalsAgainstHome > this.awayteamstats.goalsAgainstHome ? 'font-weight-bold' : ''">
                                  {{
                                    this.hometeamstats.goalsAgainstHome
                                  }}
                                  Golos sofridos em casa
                                </p>
                                
                                <p :class="this.hometeamstats.goalsAgainstAway > this.awayteamstats.goalsAgainstAway ? 'font-weight-bold' : ''">
                                  {{
                                    this.hometeamstats.goalsAgainstAway
                                  }}
                                  Golos sofridos fora
                                </p>

                                 <p :class="Math.round((this.hometeamstats.goalsForHome / this.hometeamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100  > Math.round((this.awayteamstats.goalsForHome / this.awayteamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 ? 'font-weight-bold' : ''">
                                  {{Math.round((this.hometeamstats.goalsForHome / this.hometeamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos marcados em casa
                                </p>

                                <p :class="Math.round((this.hometeamstats.goalsForAway / this.hometeamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100  > Math.round((this.awayteamstats.goalsForAway / this.awayteamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 ? 'font-weight-bold' : ''">
                                  {{Math.round((this.hometeamstats.goalsForAway / this.hometeamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos marcados fora de casa
                                </p>
                                
                                 <p :class="Math.round((this.hometeamstats.goalsAgainstHome / this.hometeamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100  > Math.round((this.awayteamstats.goalsAgainstHome / this.awayteamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 ? 'font-weight-bold' : ''">
                                  {{Math.round((this.hometeamstats.goalsAgainstHome / this.hometeamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos sofridos em casa
                                </p>  

                                <p :class="Math.round((this.hometeamstats.goalsAgainstAway / this.hometeamstats.matchsPlayedAway+ Number.EPSILON) * 100) / 100  > Math.round((this.awayteamstats.goalsAgainstAway / this.awayteamstats.matchsPlayedAway+ Number.EPSILON) * 100) / 100 ? 'font-weight-bold' : ''">
                                  {{Math.round((this.hometeamstats.goalsAgainstAway / this.hometeamstats.matchsPlayedAway+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos sofridos fora de casa
                                </p>

                                <p :class="Math.round((this.hometeamstats.goalsForTotal / this.hometeamstats.matchsPlayedTotal+ Number.EPSILON) * 100) / 100  > Math.round((this.awayteamstats.goalsForTotal / this.awayteamstats.matchsPlayedTotal+ Number.EPSILON) * 100) / 100 ? 'font-weight-bold' : ''">
                                  {{Math.round((this.hometeamstats.goalsForTotal / this.hometeamstats.matchsPlayedTotal+ Number.EPSILON) * 100) / 100 }}
                                  Média de golos marcados
                                </p>
                                
                                <p :class="Math.round((this.hometeamstats.goalsAgainstTotal / this.hometeamstats.matchsPlayedTotal+ Number.EPSILON) * 100) / 100 > Math.round((this.awayteamstats.goalsAgainstTotal / this.awayteamstats.matchsPlayedTotal+ Number.EPSILON) * 100) / 100 ? 'font-weight-bold' : ''">
                                   {{Math.round((this.hometeamstats.goalsAgainstTotal / this.hometeamstats.matchsPlayedTotal+ Number.EPSILON) * 100) / 100 }}
                                  Média de golos sofridos total
                                </p>
                                
                              </v-col>

                              <v-col>
                                 <h3> {{this.statsawayteam}}: </h3> 

                                <p :class="this.awayteamstats.matchsPlayedHome > this.hometeamstats.matchsPlayedHome ? 'font-weight-bold' : ''">
                                  {{
                                    this.awayteamstats.matchsPlayedHome
                                  }}
                                  Jogos jogados em casa
                                </p>

                                <p :class="this.awayteamstats.matchsPlayedAway > this.hometeamstats.matchsPlayedAway ? 'font-weight-bold' : ''">
                                  {{
                                    this.awayteamstats.matchsPlayedAway
                                  }}
                                  Jogos jogados fora de casa
                                </p>

                                <p :class="this.awayteamstats.winsHome > this.hometeamstats.winsHome ? 'font-weight-bold' : ''">
                                  {{ this.awayteamstats.winsHome }} Vitórias em
                                  casa
                                </p>

                                <p :class="this.awayteamstats.winsAway > this.hometeamstats.winsAway ? 'font-weight-bold' : ''">
                                  {{ this.awayteamstats.winsAway }} Vitórias
                                  fora
                                </p>

                                <p :class="this.awayteamstats.losesHome > this.hometeamstats.losesHome ? 'font-weight-bold' : ''">
                                  {{ this.awayteamstats.losesHome }} Derrotas
                                  casa
                                </p>

                                <p :class="this.awayteamstats.losesAway > this.hometeamstats.losesAway ? 'font-weight-bold' : ''">
                                  {{ this.awayteamstats.losesAway }} Derrotas
                                  fora
                                </p>

                                <p :class="this.awayteamstats.drawsAway > this.hometeamstats.drawsAway ? 'font-weight-bold' : ''">
                                  {{ this.awayteamstats.drawsAway }} Empates
                                  fora
                                </p>
                                
                                <p :class="this.awayteamstats.drawsHome > this.hometeamstats.drawsHome ? 'font-weight-bold' : ''">
                                  {{ this.awayteamstats.drawsHome }} Empates
                                  casa
                                </p>
                                
                                <p :class="this.awayteamstats.goalsForHome > this.hometeamstats.goalsForHome ? 'font-weight-bold' : ''">
                                  {{ this.awayteamstats.goalsForHome }} Golos
                                  marcados em casa
                                </p>
                                
                                <p :class="this.awayteamstats.goalsForAway > this.hometeamstats.goalsForAway ? 'font-weight-bold' : ''">
                                  {{ this.awayteamstats.goalsForAway }} Golos
                                  marcados fora de casa
                                </p>
                                
                                <p :class="this.awayteamstats.goalsAgainstHome > this.hometeamstats.goalsAgainstHome ? 'font-weight-bold' : ''">
                                  {{
                                    this.awayteamstats.goalsAgainstHome
                                  }}
                                  Golos sofridos em casa
                                </p>
                                
                                <p :class="this.awayteamstats.goalsAgainstAway > this.hometeamstats.matchsPlayedHome ? 'font-weight-bold' : ''">
                                  {{
                                    this.awayteamstats.goalsAgainstAway
                                  }}
                                  Golos sofridos fora
                                </p>

      <p :class="Math.round((this.awayteamstats.goalsForHome / this.awayteamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 > Math.round((this.hometeamstats.goalsForHome / this.hometeamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 ? 'font-weight-bold' : ''"> 
                                  {{Math.round((this.awayteamstats.goalsForHome / this.awayteamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos marcados em casa
                                </p>

       <p :class="Math.round((this.awayteamstats.goalsForAway / this.awayteamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 > Math.round((this.hometeamstats.goalsForAway / this.hometeamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 ? 'font-weight-bold' : ''">
                                  {{Math.round((this.awayteamstats.goalsForAway / this.awayteamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos marcados fora de casa
                                </p>
                                
       <p :class="Math.round((this.awayteamstats.goalsAgainstHome / this.awayteamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 > Math.round((this.hometeamstats.goalsAgainstHome / this.hometeamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 ? 'font-weight-bold' : ''">
                                  {{Math.round((this.awayteamstats.goalsAgainstHome / this.awayteamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos sofridos em casa
                                </p>  

        <p :class="Math.round((this.awayteamstats.goalsAgainstAway / this.awayteamstats.matchsPlayedAway+ Number.EPSILON) * 100) / 100 > Math.round((this.hometeamstats.goalsAgainstAway / this.hometeamstats.matchsPlayedAway+ Number.EPSILON) * 100) / 100 ? 'font-weight-bold' : ''">
                                  {{Math.round((this.awayteamstats.goalsAgainstAway / this.awayteamstats.matchsPlayedAway+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos sofridos fora de casa
                                </p>

                                <p :class="Math.round((this.awayteamstats.goalsForTotal / this.awayteamstats.matchsPlayedTotal+ Number.EPSILON) * 100) / 100 > Math.round((this.hometeamstats.goalsForTotal / this.hometeamstats.matchsPlayedTotal+ Number.EPSILON) * 100) / 100 ? 'font-weight-bold' : ''">
                                  {{Math.round((this.awayteamstats.goalsForTotal / this.awayteamstats.matchsPlayedTotal+ Number.EPSILON) * 100) / 100 }}
                                  Média de golos marcados
                                </p>
                                
                                <p :class="Math.round((this.awayteamstats.goalsAgainstTotal / this.awayteamstats.matchsPlayedTotal+ Number.EPSILON) * 100) / 100 > Math.round((this.hometeamstats.goalsAgainstTotal / this.hometeamstats.matchsPlayedTotal+ Number.EPSILON) * 100) / 100 ? 'font-weight-bold' : ''">
                                   {{Math.round((this.awayteamstats.goalsAgainstTotal / this.awayteamstats.matchsPlayedTotal+ Number.EPSILON) * 100) / 100 }}
                                  Média de golos sofridos total
                                </p>
                                
                                
                              </v-col> 
                </v-row> 
    
</template> 

<script>
   export default { 
        
        props: ['statshometeam','statsawayteam','hometeamstats','awayteamstats'], 
   }
</script>