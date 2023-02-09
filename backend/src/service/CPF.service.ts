import CPFModel from '../database/models/CPF';

export default class CPFService {
  public create =  async (cpf: string) => {
    const newCPF = await CPFModel.create({ cpf })
      .then(({ cpf, createdAt }) => ({ cpf, createdAt }));
    return newCPF;
  }
}