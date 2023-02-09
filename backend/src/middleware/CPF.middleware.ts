import { NextFunction, Request, Response } from "express";
import ErrorClient from "../utils/ErrorClient";

export default class CPFMiddleware {
  public validateCPF = (req: Request, res: Response, next: NextFunction): void => {
    let { cpf } = req.body;
    if (!cpf) cpf = req.params.cpf;
    console.log('cpf: ', cpf);
    
    if (cpf.includes('.') || cpf.includes('-') || cpf.length !== 11) 
      throw new ErrorClient(400, 'InvalidCpfException', 'CPF is not valid');
        
    const cpfSplit = cpf.split('');
    const cpfIsValid = cpfSplit.some((digit: string) => digit !== cpfSplit[0]);
    if (!cpfIsValid) throw new ErrorClient(422, 'InvalidCpfException', 'CPF is not valid');
    
    const firstDigit = cpfSplit.reduce((acc: number, curr: string, index: number) => {
      if (index < 9) {
        acc += +curr * (10 - index);
      }
      return acc;
    }, 0);

    const isFirstTypeValid = ((firstDigit * 10) % 11 ) === +cpfSplit[9];
    
    if (!isFirstTypeValid) throw new ErrorClient(422, 'InvalidCpfException', 'CPF is not valid');
    
    const secondDigit = cpfSplit.reduce((acc: number, curr: string, index: number) => {
      if (index < 10) {
        acc += +curr * (11 - index);
      }
      return acc;
    }, 0);

    const isSecondTypeValid = ((secondDigit * 10) % 11 ) === +cpfSplit[10];

    if (!isSecondTypeValid) throw new ErrorClient(422, 'InvalidCpfException', 'CPF is not valid');

    next();  
  }
}