const express = require('express');
const app = express();



app.listen(process.env.PORT, () => {
  console.log(`[${Date.now()}] Server listening on port: ${process.env.PORT}`);
});