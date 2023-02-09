import * as chai from 'chai';
import * as sinon from 'sinon';
import App from '../../app';
import CPFModel from '../../database/models/CPF';
import ICPF from '../../interfaces/ICPF';
import CPFService from '../../service/CPF.service';
import { CPFInUse, CPFs, unsedCPF } from '../mock/CPF.mock';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const cpfService = new CPFService();

describe.only('CPF integration tests - GET /cpf/:cpf', function() {
  afterEach(function() {
    sinon.restore()
  });

  describe('checking if a cpf is on the list', function() {
    it('when an invalid cpf is passed it should return error', async function() {
      sinon.stub(CPFModel, 'findOne').resolves(undefined);

      const { body, status } = await chai.request(app).get(`/cpf/${unsedCPF}`);
      expect(body).to.be.deep.equal({ 
        message: "CPF not found",
        type: "NotFoundCpfException",
       });
       
      expect(status).to.be.equal(404);
    });

    it('with valid cpf should return successfully', async function() {
      sinon.stub(CPFModel, 'findOne').resolves(CPFs[0] as ICPF | any);

      const { body, status } = await chai.request(app).get(`/cpf/${CPFInUse}`);

      expect(body).to.be.deep.equal(CPFs[0])
      expect(status).to.be.equal(200);
    });
  });
});