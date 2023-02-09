import * as chai from 'chai';
import * as sinon from 'sinon';
import CPFModel from '../../database/models/CPF';
import ICPF from '../../interfaces/ICPF';
import CPFService from '../../service/CPF.service';
import { CPFInUse, CPFs, unsedCPF } from '../mock/CPF.mock';

// @ts-ignore
import sinonChai = require('sinon-chai');

chai.use(sinonChai);

const cpfService = new CPFService();

const { expect } = chai;

describe('CPF service tests', function() {
  afterEach(function() {
    sinon.restore();
  })
  describe('registering new cpf', function() {
    it('with a cpf that is in use should return error', async function() {
      sinon.stub(CPFModel, 'findOne').resolves(CPFs[0] as ICPF | any);
      try {
        await cpfService.create(CPFInUse);
      } catch (err) {
        expect((err as Error).message).to.be.equal('CPF is already in use');
      }
    });

    it('with valid valid cpf must be done successfully', async function() {
      sinon.stub(CPFModel, 'findOne').resolves(null);
      sinon.stub(CPFModel, 'create').resolves({ cpf: unsedCPF } as ICPF | any)

      const newCpf = await cpfService.create(unsedCPF);
      expect(newCpf).to.be.deep.equal(newCpf);
    });
  });

  describe('checking if a cpf is on the list', function() {
    it('when an invalid cpf is passed it should return error', async function() {
      sinon.stub(CPFModel, 'findOne').resolves(null);
      try {
        await cpfService.getCPF(unsedCPF);
      } catch (err) {
        expect((err as Error).message).to.be.equal('CPF not found');
      }
    });

    it('with valid cpf should return successfully', async function() {
      sinon.stub(CPFModel, 'findOne').resolves(CPFs[0] as ICPF | any);
      const userCPF = await cpfService.getCPF(CPFInUse);

      expect(userCPF).to.be.deep.equal(CPFs[0]);
    });
  })

  describe('return all cpf that are in the list', function() {
    it('successfully', async function() {
      sinon.stub(CPFModel, 'findAll').resolves(CPFs as ICPF[] | any);

      const cpfs = await cpfService.getAll();

      expect(cpfs).to.be.deep.equal(CPFs)
    });
  });

  describe('removing cpf from list', function() {
    it('with a cpf that is not in use should return error', async function() {
      sinon.stub(CPFModel, 'findOne').resolves(undefined);
      try {
        await cpfService.remove(unsedCPF);
      } catch (err) {
        expect((err as Error).message).to.be.equal('CPF not found');
      }
    });
  });
});