import { DataTypes, DATE, INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class CPF extends Model {
  declare id: number;
  declare cpf: string;
  declare createdAt: string;
}

CPF.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cpf: {
    type: STRING,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'cpf',
  tableName: 'cpf',
});

export default CPF;
