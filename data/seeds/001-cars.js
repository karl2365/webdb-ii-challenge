
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          vin: '1f876539khl12345', 
          make: 'Ford',
          model: 'Mustang',
          mileage: 127500,
          transmission: '5 speed',
          title: 'clean'
        },
        {
          vin: '1gikehb873709', 
          make: 'Chevy',
          model: 'Camaro',
          mileage: 27500,
          transmission: 'automatic',
          title: 'salvage'
        },
        {
          vin: '1f87653990iu7tgfg5', 
          make: 'Dodge',
          model: 'Ram',
          mileage: 96000
        }
      ]);
    });
};
