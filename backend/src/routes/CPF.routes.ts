import * as express from 'express';
import CPFController from '../controller/CPF.controller';

const cpfRouter = express.Router();

cpfRouter.post(
  '/',
  new CPFController().create,
)

export default cpfRouter;