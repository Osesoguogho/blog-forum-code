const cron = require("node-cron");

const API_URL = "http://localhost:3800/api/blogspot/crons";

cron.schedule("*/14 * * * *", async() => {
    try {
       await fetch(API_URL);
       console.log("✔ API ping sent: ", new Date().toLocaleString)
    } catch(err) {
        console.log("✨API call failed: ", err.message)
    }
})