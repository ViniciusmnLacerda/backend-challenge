import * as express from 'express';
import CPFController from '../controller/CPF.controller';
import CPFMiddleware from '../middleware/CPF.middleware';

const cpfRouter = express.Router();
const cpfMidleware = new CPFMiddleware()

cpfRouter.post(
  '/',
  cpfMidleware.validateCPF,
  new CPFController().create,
)

export default cpfRouter;