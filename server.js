const express = require('express');
const fs = require('fs');

const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Require Route files
require('./public/routes/apiRoutes')(app);
require('./public/routes/htmlRoutes')(app);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
