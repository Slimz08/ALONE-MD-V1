const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0xHL3ovVTVaeUIxakUzN0RsOUdxbjExT214U1pyamNxL25KWE42Q1ZVaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVZGbjRFL2x5Y2YwcXhsNnZvajZPcURURjZ1dHRkSWFnZVJXeHQ0dEZDOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRTkRoemt0UXVhYXVVdG02S1dYN21ReGhxdk9DeDVjZGMxMk94cVZVZzNnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhTnhEdmx5eTdpVFBRamRTRjZDWDdJaXNDeHpjMHlMQk9ITklCWG9mZVdzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFDTmp1QVFIQzBzYWpCTW9wYzZwYlp0VE9iWEI4UC9GUG9FbmZBblF5bWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpYTWg2N3J4cDE1TzF3eW5uLzVIWElDWGpqUUY0TEVhRER2TTN4czU5VVE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVU43TmNkVHcyZkt1L1Q2SGdlZkc1cEdBUHJKMkIwdkg5NEtiUi9XM21uWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid2dxa3dNSWt3RGdMZi85OFlsMWhSSW9JRGFqSTd4OStGR0tEa29vcEppUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlpcWVueW9jZXM2Vm9mTkFVNVRYTHRkcFBBcmo0Z0VaZFp2VGcvakIzZ0VqeG45UG82SXNGNWpjWDZLcWxPYU41QkpobjZFcENtM0RxRllaSnhXTkF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE2LCJhZHZTZWNyZXRLZXkiOiI2V3F1MlJCbmR2NEdVaTVETUxBZmdia1J2UlhDQkJIY0dRN3g1eTBXWVVBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJCZ3lfbTVkLVJBaXhVaC1BSjlyeTN3IiwicGhvbmVJZCI6Ijg0ODBiZjdhLTE5ZWItNGJhOC05Nzg5LTEzOGVjN2Y5NjkwMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5K2grVEdJRDNMTjNOb0VUUkV0czg5U2RGQnM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQTJQb1R3UWxlWllSWG5oNmpoS3FhSjNkdDVVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjRZTjNWOUhRIiwibWUiOnsiaWQiOiIyNjA5NzM3NjI5NTM6NzVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lucXI2d0ZFUERWeWIwR0dBNGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlFnRzFyUytyVUxkN29JYkp2cUFqSnozL3ZDdVJNNURBTnRna0djb01zZzQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6IndUSyttMHk5cGdTOVFDeGFwSmF5T2VZcUxZaDVOSEVnMiswU2o2UHdENzlZTGVPVFlRRldhdFRnekhibHBMYk03MTJ4dXpoYlhxMUV1TWttT0p1NkRnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJTNzc0VU9FTnplTGVzdFRRMTdSeEhCbHBudnBkbHhrTmpYalB1RWdpSmtZVkQvL3JJaUw0STZaZElBSnZvVGNPcEpqMWtLUEtjVHpRWE55WDZQdVdBUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MDk3Mzc2Mjk1Mzo3NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVSUJ0YTB2cTFDM2U2Q0d5YjZnSXljOS83d3JrVE9Rd0RiWUpCbktETElPIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM5NzQ2MDQ1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUlEbyJ9',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/Toputech/ALONE-MD',
    OWNER_NAME : process.env.OWNER_NAME || "𝛭𝛯𝐿𝐿𝛩",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "260973762953",  
    ANTI_LINK : process.env.ANTI_LINK || "yes",
    ANTI_BAD : process.env.ANTI_BAD || "no",               
    AUTO_REPLY : process.env.AUTO_REPLY || "no",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',             
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "no",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'yes',              
    CHATBOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.BLOCK_ALL || 'no',              
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaeRrcnADTOKzivM0S1r",
    WEBSITE :process.env.URL || "https://files.catbox.moe/eoo6ql.jpg",
    CAPTION : process.env.CAPTION || "ALONE-MD",
    BOT : process.env.BOT_NAME || 'ALONE_MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    GEMINI_API_KEY : process.env.GEMINI_API_KEY || 'AIzaSyCcZqDMBa8FcAdBxqE1o6YYvzlygmpBx14',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL: process.env.ANTICALL || 'no',              
    CHAT_BOT : process.env.CHAT_BOT || 'no',  
                  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
