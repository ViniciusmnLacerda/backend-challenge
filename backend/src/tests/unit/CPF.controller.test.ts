import * as chai from 'chai';
import CPFController from '../../controller/CPF.controller';
import CPFService from '../../service/CPF.service';
// @ts-ignore
import sinonChai = require('sinon-chai');

chai.use(sinonChai);

const cpfService = new CPFService();
const  cpfController = new  CPFController();

const { expect } = chai;

describe('CPF controller tests')