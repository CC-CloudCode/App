<template>
    
                            <v-row align="start" justify="center">
                              <v-col>
                               
                                <p :class="this.hometeamstats.matchsPlayedHome > this.awayteamstats.matchsPlayedHome ? 'font-weight-bold' : ''">
                                  {{
                                    this.hometeamstats.matchsPlayedHome
                                  }}
                                  Jogos jogados em casa
                                </p>

                                <p>
                                  {{
                                    this.hometeamstats.matchsPlayedAway
                                  }}
                                  Jogos jogados fora de casa
                                </p>

                                <p>
                                  {{ this.hometeamstats.winsHome }} Vitórias em
                                  casa
                                </p>

                                <p>
                                  {{ this.hometeamstats.winsAway }} Vitórias
                                  fora
                                </p>

                                <p>
                                  {{ this.hometeamstats.losesHome }} Derrotas
                                  casa
                                </p>

                                <p>
                                  {{ this.hometeamstats.losesAway }} Derrotas
                                  fora
                                </p>

                                <p>
                                  {{ this.hometeamstats.drawsAway }} Empates
                                  fora
                                </p>
                                
                                <p>
                                  {{ this.hometeamstats.drawsHome }} Empates
                                  casa
                                </p>
                                
                                <p>
                                  {{ this.hometeamstats.goalsForHome }} Golos
                                  marcados em casa
                                </p>
                                
                                <p>
                                  {{ this.hometeamstats.goalsForAway }} Golos
                                  marcados fora de casa
                                </p>
                                
                                <p>
                                  {{
                                    this.hometeamstats.goalsAgainstHome
                                  }}
                                  Golos sofridos em casa
                                </p>
                                
                                <p>
                                  {{
                                    this.hometeamstats.goalsAgainstAway
                                  }}
                                  Golos sofridos fora
                                </p>

                                 <p>
                                  {{Math.round((this.hometeamstats.goalsForHome / this.hometeamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos marcados em casa
                                </p>

                                <p>
                                  {{Math.round((this.hometeamstats.goalsForAway / this.hometeamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos marcados fora de casa
                                </p>
                                
                                 <p>
                                  {{Math.round((this.hometeamstats.goalsAgainstHome / this.hometeamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos sofridos em casa
                                </p>  

                                <p>
                                  {{Math.round((this.hometeamstats.goalsAgainstAway / this.hometeamstats.matchsPlayedAway+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos sofridos fora de casa
                                </p>

                                <p>
                                  {{Math.round((this.hometeamstats.goalsForTotal / this.hometeamstats.matchsPlayedTotal+ Number.EPSILON) * 100) / 100 }}
                                  Média de golos marcados
                                </p>
                                
                                <p>
                                   {{Math.round((this.hometeamstats.goalsAgainstTotal / this.hometeamstats.matchsPlayedTotal+ Number.EPSILON) * 100) / 100 }}
                                  Média de golos sofridos total
                                </p>
                                
                              </v-col>

                              <v-col>
                                                                
                                <p :class="this.awayteamstats.matchsPlayedHome > this.hometeamstats.matchsPlayedHome ? 'font-weight-bold' : ''">
                                  {{
                                    this.awayteamstats.matchsPlayedHome
                                  }}
                                  Jogos jogados em casa
                                </p>

                                <p>
                                  {{
                                    this.awayteamstats.matchsPlayedAway
                                  }}
                                  Jogos jogados fora de casa
                                </p>

                                <p>
                                  {{ this.awayteamstats.winsHome }} Vitórias em
                                  casa
                                </p>

                                <p>
                                  {{ this.awayteamstats.winsAway }} Vitórias
                                  fora
                                </p>

                                <p>
                                  {{ this.awayteamstats.losesHome }} Derrotas
                                  casa
                                </p>

                                <p>
                                  {{ this.awayteamstats.losesAway }} Derrotas
                                  fora
                                </p>

                                <p>
                                  {{ this.awayteamstats.drawsAway }} Empates
                                  fora
                                </p>
                                
                                <p>
                                  {{ this.awayteamstats.drawsHome }} Empates
                                  casa
                                </p>
                                
                                <p>
                                  {{ this.awayteamstats.goalsForHome }} Golos
                                  marcados em casa
                                </p>
                                
                                <p>
                                  {{ this.awayteamstats.goalsForAway }} Golos
                                  marcados fora de casa
                                </p>
                                
                                <p>
                                  {{
                                    this.awayteamstats.goalsAgainstHome
                                  }}
                                  Golos sofridos em casa
                                </p>
                                
                                <p>
                                  {{
                                    this.awayteamstats.goalsAgainstAway
                                  }}
                                  Golos sofridos fora
                                </p>

                                <p>
                                  {{Math.round((this.awayteamstats.goalsForHome / this.awayteamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos marcados em casa
                                </p>

                                <p>
                                  {{Math.round((this.awayteamstats.goalsForAway / this.awayteamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos marcados fora de casa
                                </p>
                                
                                 <p>
                                  {{Math.round((this.awayteamstats.goalsAgainstHome / this.awayteamstats.matchsPlayedHome+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos sofridos em casa
                                </p>  

                                <p>
                                  {{Math.round((this.awayteamstats.goalsAgainstAway / this.awayteamstats.matchsPlayedAway+ Number.EPSILON) * 100) / 100 }} Média
                                  de golos sofridos fora de casa
                                </p>

                                <p>
                                  {{Math.round((this.awayteamstats.goalsForTotal / this.awayteamstats.matchsPlayedTotal+ Number.EPSILON) * 100) / 100 }}
                                  Média de golos marcados
                                </p>
                                
                                <p>
                                   {{Math.round((this.awayteamstats.goalsAgainstTotal / this.awayteamstats.matchsPlayedTotal+ Number.EPSILON) * 100) / 100 }}
                                  Média de golos sofridos total
                                </p>
                                
                                
                              </v-col> 
                </v-row> 
    
</template> 

<script>
   export default { 
        
        props: ['hometeamstats','awayteamstats'], 
   }
</script>