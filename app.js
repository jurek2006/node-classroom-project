const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const contactRoutes = require('./routes/contact');
app.use(contactRoutes);

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});
