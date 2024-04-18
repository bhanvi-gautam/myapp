
---

# Todo List Application with Login and Signup

This project is a simple todo list application with user authentication (login and signup) built using React.js, Node.js, Express, and MySQL. Users can perform CRUD operations on their todos after logging in. Additionally, users have the capability to update their details after logging in.

## Installation

### React.js

Navigate to the `react-js` directory and run the following commands:

npm install
npm start


### Node.js

Navigate to the `node-js` directory and run the following commands:

npm install
npm start


## Environment Variables

The environment variables required for this application can be found below. They come with default values as follows:

--------------------------------
# Server environment
NODE_ENV=development

# Port number
PORT=3306

# Database configuration
DB_HOST=db-host
DB_USER=db-user
DB_PASS=db-pass
DB_NAME=db-name

# JWT secret key
JWT_SECRET=your-jwt-secret-key
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=200
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30

# Log config
LOG_FOLDER=logs/
LOG_FILE=%DATE%-app-log.log
LOG_LEVEL=error

# Redis
REDIS_HOST=redis-host
REDIS_PORT=6379
REDIS_USE_PASSWORD=no
REDIS_PASSWORD=your-password
----------------------------

## Sequelize

This project utilizes Sequelize as an ORM for managing MySQL databases. To create or sync database tables, follow these steps:

1. Navigate to the `src` directory.
2. Open the `app.js` file, which serves as the entry file for the Node.js application.
3. Comment out the following lines to prevent automatic synchronization or alteration of the database:


// db.sequelize.sync()
// db.sequelize.sync({alter: true})


4. Save the changes.
5. Run your Node.js server.
6. Uncomment the previously commented lines after the tables are created to prevent accidental alterations to the database structure.


## Additional Notes

- Make sure to replace placeholder values in the `.env` file with your actual configuration details.
- Ensure that MySQL and Redis servers are running and accessible with the provided configurations.
- For security reasons, do not expose sensitive information such as JWT secret keys or database credentials in your repository.
- Consider implementing additional security measures such as input validation and authentication middleware to enhance the security of your application.

---





