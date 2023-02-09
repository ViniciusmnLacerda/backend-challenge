import * as chai from 'chai';
import * as sinon from 'sinon';
import App from '../../app';
import CPFModel from '../../database/models/CPF';
import ICPF from '../../interfaces/ICPF';
import CPFService from '../../service/CPF.service';
import {
  CPFEqualDigits, CPFInput, CPFInUseInput,
  CPFs,
  CPFWithDot, CPFWrongDigit, CPFWrongLength
} from '../mock/CPF.mock';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const cpfService = new CPFService();

describe('CPF integration tests - POST /cpf', function() {
  afterEach(function() {
    sinon.restore()
  });

  describe('registering new cpf', function() {
    it('with a cpf that is in use should return error', async function() {
      sinon.stub(CPFModel, 'findOne').resolves(CPFs as ICPF[] | any);

      const { body, status } = await chai.request(app).post('/cpf').send(CPFInUseInput);
      expect(body).to.be.deep.equal({ 
        message: "CPF is already in use",
        type: "ExistsCpfException",
       });
       
      expect(status).to.be.equal(422);
    });

    it('when cpf includes "." or "-" should return error', async function() {
      const { body, status } = await chai.request(app).post('/cpf').send(CPFWithDot);
      expect(body).to.be.deep.equal({ 
        message: "CPF is not valid",
        type: "InvalidCpfException",
       });
       
      expect(status).to.be.equal(400);
    });

    it('when the cpf has the wrong length should return error', async function() {
      const { body, status } = await chai.request(app).post('/cpf').send(CPFWrongLength);
      expect(body).to.be.deep.equal({ 
        message: "CPF is not valid",
        type: "InvalidCpfException",
       });
       
      expect(status).to.be.equal(400);
    });

    it('when the cpf digit is invalid should return error', async function() {
      const { body, status } = await chai.request(app).post('/cpf').send(CPFWrongDigit);
      expect(body).to.be.deep.equal({ 
        message: "CPF is not valid",
        type: "InvalidCpfException",
       });
       
      expect(status).to.be.equal(422);
    });

    it('when all cpf digits are the same should return error', async function() {
      const { body, status } = await chai.request(app).post('/cpf').send(CPFEqualDigits);
      expect(body).to.be.deep.equal({ 
        message: "CPF is not valid",
        type: "InvalidCpfException",
       });
       
      expect(status).to.be.equal(422);
    });

    it('with valid cpf should return successfully', async function() {
      sinon.stub(CPFModel, 'findOne').resolves(undefined);
      sinon.stub(CPFModel, 'create').resolves(CPFInput as ICPF | any);

      const { body, status } = await chai.request(app).post('/cpf').send(CPFInput);
      expect(body).to.be.deep.equal(CPFInput)
      expect(status).to.be.equal(201);
    });
  });

});