//////////////////////////////////////////////////////
// File name: app.js
// Author: Daniel Howe
// Copyright: 2020 Howe Neat, Inc.
// Description: Folding@home team stat monitoring
//////////////////////////////////////////////////////

var team = 261768; // Replace with your team number

var version = "0.0.1"; // App version

console.log("Starting Folding@Home stat monitoring app version: "+version);
// console.log("ENV check process.env.DB-HOST: "+process.env.DB-HOST);

//////////////// Global Declarations //////////////////////
const express = require("express");
const app = express();
const request = require("request");
const cron = require("node-cron"); 

const pool = require("./dbPool.js"); // mySQL cfg

//////////////// Variables tracked for statistics /////////
var teamRank; // Team rank
var total_teams_comp; // Total number of teams
var teamRankPercent;  // Score
var teamWorkUnits; // Total work units from team
var dateUpdated; // Last update of stats

//////////////// Functions          //////////////////////
function getTeamStats(teamID) {
    console.log("Checking Folding@Home Team: "+team);
    return new Promise(function (resolve, reject){
        let requestUrl = `https://stats.foldingathome.org/api/team/${teamID}`;
        request(requestUrl, function(error, response, body) {
            if(!error && response.statusCode == 200){
                let parsedData = JSON.parse(body);
                dateUpdated = parsedData.last;
                //console.log("Last updated: "+dateUpdated);
                teamRank = parsedData.rank;
                total_teams_comp = parsedData.total_teams;
                teamWorkUnits = parsedData.wus;
                //console.log("Team rank: "+teamRank);
                //console.log("Total number of teams: "+total_teams_comp);
                //console.log("Total Work Units Completed: "+teamWorkUnits);
                teamRankPercent = (teamRank / total_teams_comp) * 100;
                //console.log("Score: "+teamRankPercent + "%");
                console.log("Writing to db..");
				let sql = "INSERT INTO fah_stats (date, teamRank, total_teams_comp, teamRankPercent, teamWorkUnits) VALUES (?,?,?,?,?)";
				return new Promise(function(resolve, reject){
					 pool.query(sql,[dateUpdated, teamRank, total_teams_comp, teamRankPercent, teamWorkUnits], function(err, rows,fields){
						 if(err) throw err;
						 //console.log("Rows found: " + rows.length);
						 console.log("Sleeping..zz..");
						 resolve(rows);
					 });//query
				});//promise
				
            }
            else {
                console.log('error: ',error);
                console.log('statusCode: ', response && response.statusCode);
                reject(error);
            }
        });
    });
}


/////////////// CRON JOB TO POST UPDATES TO DB ///////////
/////////////// UPDATES OCCUR ONCE EVERY DAY @ 23:00  ////
cron.schedule("23 * * * * *", function() {
    getTeamStats(team);
});
