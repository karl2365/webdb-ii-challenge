exports.up = function(knex) {
    return knex.schema.createTable('sales', tbl => {
      
    tbl.increments();
     
    tbl
        .string('salesperson', 50)
        .notNullable();
      
    tbl
        .decimal('price')
        .notNullable();
  
    tbl
        .integer('carid')
        .notNullable();
    
    tbl.foreign('carid').references('cars.id');
  
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('sales');
  
  };
  