const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const routes = require('./routes/routes');
app.use(routes);

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});
