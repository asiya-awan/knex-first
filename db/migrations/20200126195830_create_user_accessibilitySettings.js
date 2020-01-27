
exports.up = (knex) => {
  return knex.schema.createTable('UserAccessibilitySettings', (table) => {
      table.increments();

      table.specificType('createdAt', 'timestamp(3)')
          .defaultTo(knex.raw('CURRENT_TIMESTAMP(3)'))
          .notNullable();

      table.specificType('updatedAt', 'timestamp(3)')
          .defaultTo(knex.raw('CURRENT_TIMESTAMP(3)'))
          .notNullable();

      table.integer('userId')
          .notNullable()
          .unsigned()
          .references('Users.id');

      table.boolean('highContrast')
          .defaultTo(false);             

      table.specificType('fontSize', 'tinyint(3)')
          .defaultTo(0);      

  })
  .then(() => {
      return knex.from(
          knex.raw(
              '?? (??, ??, ??)',
              [
                  'UserAccessibilitySettings',
                  'userId',
                  'highContrast',
                  'fontSize'
              ]
          )
      )
          .insert(function() {
              /* eslint-disable no-invalid-this */
              this.from('Users AS U')
                  .select(
                      knex.raw('?? AS ??', ['id', 'userId']),
                      knex.raw('? AS ??', [false, 'highContrast']),
                      knex.raw('? AS ??', [0, 'fontSize'])
                  );
          });
  })

};

exports.down = (knex) => {
  
  return knex.schema.dropTable('UserAccessibilitySettings');
    
};
