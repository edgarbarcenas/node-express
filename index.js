const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {
  logError,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handle');

const app = express();
const port = 3000;

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};

app.use(express.json());
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);
app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port);
