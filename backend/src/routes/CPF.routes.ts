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

cpfRouter.get(
  '/:cpf',
  new CPFController().getCPF,
)

cpfRouter.delete(
  '/:cpf',
  cpfMidleware.validateCPF,
  new CPFController().remove,
)

export default cpfRouter;