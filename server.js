const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env'});

const server = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then( con => {
    console.dir('Database is connected')
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.dir(`Server is running on PORT:${PORT}`));
