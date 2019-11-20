const app = require('./index');

const PORT = process.env.PORT || 2019;

// Start application
app.listen(PORT);

module.exports = app;
