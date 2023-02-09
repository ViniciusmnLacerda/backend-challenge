import { Request, Response } from 'express';
import CPFService from '../service/CPF.service';

const cpfService = new CPFService();

export default class CPFController {
  public create = async (req: Request, res: Response) => {
    const { cpf } = req.body;
    const newCpf = await cpfService.create(cpf);
    res.status(200).json(newCpf)
  }
}
