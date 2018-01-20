import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import locale from 'express-locale';
import Log from 'log'
import routes from './routes';

const log = new Log();
const app = express();
app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(locale());

// Routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {// eslint-disable-line no-unused-vars
  log.debug(err);
  res.status(err.status || 500)
    .send()
});

export default app;