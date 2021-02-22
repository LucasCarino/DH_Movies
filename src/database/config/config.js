module.exports = {
  "development": {
    "username": "root",
    "password": "root",
    "database": "movies_db",
    "host": "127.0.0.1",
    "dialect": "mysql",
    define: {
      underscored: true,
      paranoid: true
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "uutamukdd5wax2eb",
    "password": "Dbzv6u7CMlnHCazglUs9",
    "database": "bsa0lz63awqn1j6hcwnt",
    "host": "bsa0lz63awqn1j6hcwnt-mysql.services.clever-cloud.com",
    "dialect": "mysql",
    define: {
      underscored: true,
      paranoid: true
    }
  }
}
