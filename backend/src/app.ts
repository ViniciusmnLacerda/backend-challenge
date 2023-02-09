import * as express from 'express';
import cpfRouter from './routes/CPF.routes';

export default class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.app.use(express.json());
    this.app.use('/cpf', cpfRouter)
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}