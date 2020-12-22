# Project Overview
**Folding@home** is a crowd source computing project.  Get started 'folding' by contributing to research at home, by setting up an account and joining a team.  For more information, go to https://foldingathome.org/

**fah_stats** is a node.js CRON daemon for logging team stats to a mySQL database.  The update 
time is configurable, but is not recommended to be more frequent than once a day.  
This for example will execute at the 23:00 hour of the day

Data is returned from the folding@home API and stored into a database.  The API
documentation can be found at https://stats.foldingathome.org/api

# dB Schema
The database needs to be created in a schema with the following data types
```
CREATE TABLE `ilwm70lty119hzkm`.`fah_stats` (
  `idfah_stats` INT NOT NULL,
  `date` DATE NOT NULL,
  `teamRank` INT NOT NULL,
  `total_teams_comp` INT NOT NULL,
  `teamRankPercent` FLOAT NOT NULL,
  `teamWorkUnits` INT NOT NULL,
  PRIMARY KEY (`idfah_stats`));
```

# dbPool.js
The dbPool.js file needs to be created in the root directory to store our database 
login information.  For security purposes this has been removed from the repo, 
and will need to be created with the following information

```javascript
const mysql = require('mysql');

const pool  = mysql.createPool({
    connectionLimit: 10,
	host: "some.address.com",
	user: "simon",
	password: "says",
	database: "db_name_here"
});

module.exports = pool;
```

# Feedback
For any feedback on this project please let me know: daniel@howeneat.com
