
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    
    tbl.increments();
   
    tbl
        .string('vin', 30)
        .unique()
        .notNullable();
    
    tbl
        .string('make', 50)
        .notNullable();

    tbl
        .string('model', 50)
        .notNullable();

    tbl
        .integer('mileage')
        .notNullable();

    tbl 
        .string('transmission');
    
    tbl 
        .string('title');

  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');

};
