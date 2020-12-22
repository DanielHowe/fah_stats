# Project Overview
Folding@home is a status daemon for recording team stats to a mySQL database.  The update 
time is configurable, but not recommended to be more frequent than once a day (1440 minutes)

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