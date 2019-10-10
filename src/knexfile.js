// Updating congifuration for the database

module.exports = {

  development: {
      client: 'pg',
      connection :{
          host: 'localhost',
          port: '5432',
          user: 'postgres',
          password: 'digital123',
          database: 'RestaurantManagementSystem'
    }
  }
};

