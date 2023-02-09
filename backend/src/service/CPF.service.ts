import CPFModel from '../database/models/CPF';
import ErrorClient from '../utils/ErrorClient';

export default class CPFService {
  public findOne = async (cpf: string) => {
    const userCPF = await CPFModel.findOne({ 
      where: { cpf },
      attributes: { exclude: ['id'] },
    });
    return userCPF;
  }

  public getCPF = async (cpf: string) => {
    const userCPF = await this.findOne(cpf);
    if (!userCPF) throw new ErrorClient(404, 'NotFoundCpfException', 'CPF not found');
    return userCPF;
  }

  public create =  async (cpf: string) => {
    const isCPFAlreadyInUse = await this.findOne(cpf);
    if (isCPFAlreadyInUse) throw new ErrorClient(422, 'ExistsCpfException', 'CPF is already in use');
    const newCPF = await CPFModel.create({ cpf })
      .then(({ cpf }) => ({ cpf }));
    return newCPF;
  }

  public remove = async (cpf: string) => {
    const isCPFValid = await this.findOne(cpf);
    if (!isCPFValid) throw new ErrorClient(404, 'NotFoundCpfException', 'CPF not found');
    await CPFModel.destroy({ where: { cpf }});
  }

  public getAll = async () => {
    const CPFs = await CPFModel.findAll({
      attributes: { exclude: ['id'] }
    });
    return CPFs;
  }
}