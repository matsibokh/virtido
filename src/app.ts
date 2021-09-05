import * as express from 'express';
import { user, operations } from './controllers';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/user/', user.default);
app.use('/operations/', operations.default);

app.use( '*', (req, res) => {
  res.status(404);
  res.send('Request not found')
})
   
app.listen(3000, () => {
  console.log('Server started on localhost:3000');
})

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception, ${err}`);
});