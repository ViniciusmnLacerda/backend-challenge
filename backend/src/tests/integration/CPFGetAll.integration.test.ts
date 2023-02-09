import * as chai from 'chai';
import * as sinon from 'sinon';
import App from '../../app';
import CPFModel from '../../database/models/CPF';
import ICPF from '../../interfaces/ICPF';
import CPFService from '../../service/CPF.service';
import { CPFs } from '../mock/CPF.mock';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const cpfService = new CPFService();

describe('CPF integration tests - GET /cpf', function() {
  afterEach(function() {
    sinon.restore()
  });

  describe('return all cpf that are in the list', function() {
    it('successfully', async function() {
      sinon.stub(CPFModel, 'findAll').resolves(CPFs as ICPF[] | any);

      const { body, status } = await chai.request(app).get('/cpf');
      expect(body).to.be.deep.equal(CPFs)
       
      expect(status).to.be.equal(200);
    });
  });
});