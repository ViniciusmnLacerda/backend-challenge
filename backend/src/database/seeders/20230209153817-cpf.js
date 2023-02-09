module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('cpf', [
      {
        cpf: "92238233318",
        created_at: new Date("2023-02-09T15:42:25.000Z")
      },
      {
        cpf: "08051342127",
        created_at: new Date("2023-02-09T15:42:30.000Z")
      },
      {
        cpf: "36806723810",
        created_at: new Date("2023-02-09T15:42:35.000Z")

      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('cpf', null, {});
  },
};
