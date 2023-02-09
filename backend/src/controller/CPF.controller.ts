import { Request, Response } from 'express';
import CPFService from '../service/CPF.service';

const cpfService = new CPFService();

export default class CPFController {
  public create = async (req: Request, res: Response) => {
    const { cpf } = req.body;
    const newCpf = await cpfService.create(cpf);
    res.status(201).json(newCpf)
  }

  public getCPF = async (req: Request, res: Response) => {
    const { cpf } = req.params;
    const userCPF = await cpfService.getCPF(cpf);
    res.status(200).json(userCPF);
  }

  public remove = async (req: Request, res: Response) => {
    const { cpf } = req.params;
    await cpfService.delete(cpf);
    res.sendStatus(204);
  }

  public getAll = async (req: Request, res: Response) => {
    const CPFs = await cpfService.getAll();
    res.status(200).json(CPFs);
  }
}
