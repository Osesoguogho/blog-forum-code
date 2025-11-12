const cron = require("node-cron");
const env = require("dotenv");
env.config();


 const crons = cron.schedule("*/14 * * * *", async() => {
    try {
       await fetch(`${process.env.API_URL}/api/verify`);
       console.log("✔ API ping sent: ", new Date().toLocaleString())
    } catch(err) {
        console.log("✨API call failed: ", err.message)
    }
},  {
    scheduled: true, // ✅ auto-starts when loaded
    timezone: "UTC", // optional: you can change this if you prefer another timezone
  })


 module.exports = crons;