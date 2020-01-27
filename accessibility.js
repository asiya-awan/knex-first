exports.up = function(knex) {
  const addNotificationOptions = knex.schema
      .table('User', (table) => {
          table
              .boolean('allowNotifications')
              .notNullable()
              .default(true);
      });

  const insertNotificationOptionsAttribute = knex('SystemAttribute')
      .insert({
          columnName: 'allowNotifications',
          tableName: 'User',
          attributeKey: 'allowNotifications',
          displayName: 'Allow Notifications',
          type: 'checkbox',
          modelName: 'User',
          options: JSON.stringify({
              default: true
          }),
          references: null
      });

  return Promise.all([
      addNotificationOptions,
      insertNotificationOptionsAttribute
  ]);
};

exports.down = function(knex) {
  const removeNotificationOptions = knex.schema
      .table('User', (table) => {
          table.dropColumn('allowNotifications');
      });
  const deleteNotificationOptionsAttribute = knex('SystemAttribute')
      .where('modelName', '=', 'User')
      .where('columnName', '=', 'allowNotifications')
      .where('tableName', '=', 'User')
      .delete();

  return Promise.all([
      removeNotificationOptions,
      deleteNotificationOptionsAttribute
  ]);
};
