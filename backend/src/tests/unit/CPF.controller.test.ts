import * as chai from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import CPFController from '../../controller/CPF.controller';
import CPFModel from '../../database/models/CPF';
import ICPF from '../../interfaces/ICPF';
import CPFService from '../../service/CPF.service';
import { CPFInUse, CPFs, newCPF, unsedCPF } from '../mock/CPF.mock';
// @ts-ignore
import sinonChai = require('sinon-chai');

chai.use(sinonChai);

const cpfService = new CPFService();
const cpfController = new  CPFController();

const { expect } = chai;

describe('CPF controller tests', function() {
  afterEach(function() {
    sinon.restore();
  })

  describe('registering new cpf', function() {
    it('with valid valid cpf must be done successfully', async function() {
      const req = {} as Request;
      const res = {} as Response; 
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(CPFModel, 'findOne').resolves(undefined);
      sinon.stub(CPFModel, 'create').resolves(newCPF as ICPF | any);
      sinon.stub(cpfService, 'create').resolves(unsedCPF as ICPF | any);

      req.body = { cpf: unsedCPF };
      await cpfController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ cpf: unsedCPF });
    });
  });

  describe('checking if a cpf is on the list', function() {
    it('with valid cpf should return successfully', async function() {
      const req = {} as Request;
      const res = {} as Response; 
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(CPFModel, 'findOne').resolves(CPFs[0] as ICPF | any);
      sinon.stub(cpfService, 'getCPF').resolves(CPFs[0] as ICPF | any);

      req.params = { cpf: CPFInUse };
      await cpfController.getCPF(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(CPFs[0]);
    });
  })

  describe('return all cpf that are in the list', function() {
    it('successfully', async function() {
      const req = {} as Request;
      const res = {} as Response; 
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(CPFModel, 'findAll').resolves(CPFs as ICPF[] | any);
      sinon.stub(cpfService, 'getAll').resolves(CPFs as ICPF[] | any);

      await cpfController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(CPFs);
    });
  });

  describe('removing cpf from list', function() {
    it('with valid valid cpf must be done successfully', async function() {
      const req = {} as Request;
      const res = {} as Response; 
      res.sendStatus = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);


      req.params = { cpf: CPFInUse };

      sinon.stub(CPFModel, 'findOne').resolves(CPFs[0] as ICPF | any);
      sinon.stub(CPFModel, 'destroy').resolves();
      sinon.stub(cpfService, 'remove').resolves();

      await cpfController.remove(req, res);
      expect(res.sendStatus).to.have.been.calledWith(204);
    });
  });
});