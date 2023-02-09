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

describe('CPF integration tests - DELETE /cpf/:cpf', function() {
  afterEach(function() {
    sinon.restore()
  });

  describe('removing cpf from list', function() {
    it('when an invalid cpf is passed it should return error', async function() {
      sinon.stub(CPFModel, 'findOne').resolves(undefined);

      const { body, status } = await chai.request(app).delete(`/cpf/${unsedCPF}`);
      expect(body).to.be.deep.equal({ 
        message: "CPF not found",
        type: "NotFoundCpfException",
       });
       
      expect(status).to.be.equal(404);
    });

    it('with valid valid cpf must be done successfully', async function() {
      sinon.stub(CPFModel, 'findOne').resolves(CPFs[0] as ICPF | any);
      sinon.stub(CPFModel, 'destroy').resolves();

      const { status } = await chai.request(app).delete(`/cpf/${CPFInUse}`);

      expect(status).to.be.equal(204);
    });
  });
});