

var TeamStat = function(v){
    this.idteam_stats = v.idteam_stats;
    this.idleague = v.idleague;
    this.team_idteam = v.team_idteam;
    this.matchsPlayedHome = v.matchsPlayedHome;
    this.matchsPlayedAway = v.matchsPlayedAway;
    this.winsHome = v.winsHome;
    this.winsAway = v.winsAway;
    this.drawsHome = v.drawsHome;
    this.drawsAway = v.drawsAway;
    this.losesHome = v.losesHome;
    this.losesAway = v.losesAway;
    this.goalsForHome = v.goalsForHome;
    this.goalsForAway = v.goalsForAway;
    this.goalsAgainstHome = v.goalsAgainstHome;
    this.goalsAgainstAway = v.goalsAgainstAway;
    this.matchsPlayedTotal = v.matchsPlayedTotal;
    this.winsTotal = v.winsTotal;
    this.drawsTotal = v.drawsTotal;
    this.losesTotal = v.losesTotal;
    this.goalsForTotal = v.goalsForTotal;
    this.goalsAgainstTotal = v.goalsAgainstTotal;
    this.avgGoalsForHome = v.avgGoalsForHome;
    this.avgGoalsForAway = v.avgGoalsForAway;
    this.avgGoalsAgainstHome = v.avgGoalsAgainstHome;
    this.avgGoalsAgainstAway = v.avgGoalsAgainstAway;
    this.avgGoalsForTotal = v.avgGoalsForTotal;
    this.avgGoalsAgainstTotal = v.avgGoalsAgainstTotal;
    this.goalsDiff = v.goalsDiff;
};


module.exports= TeamStat;