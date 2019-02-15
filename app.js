const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const routes = require('./routes/routes');
const notFoundController = require('./controllers/notFound404');
app.use(routes);
app.use(notFoundController);

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});
