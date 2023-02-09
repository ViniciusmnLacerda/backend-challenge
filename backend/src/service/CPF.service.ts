import CPFModel from '../database/models/CPF';
import ErrorClient from '../utils/ErrorClient';

export default class CPFService {
  public findOne = async (cpf: string) => {
    const userCpf = await CPFModel.findOne({ where: { cpf }});
    if (!userCpf) throw new ErrorClient(404, 'NotFoundCpfException', 'CPF not found');
    return cpf;
  }

  public create =  async (cpf: string) => {
    const isCPFAlreadyInUse = await this.findOne(cpf);
    if (isCPFAlreadyInUse) throw new ErrorClient(422, 'ExistsCpfException', 'CPF is already in use');
    const newCPF = await CPFModel.create({ cpf })
      .then(({ cpf, createdAt }) => ({ cpf, createdAt }));
    return newCPF;
  }
}