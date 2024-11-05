const path = require("path");
const express = require("express");
const http = require("http");
const app = express();
const swaggerTools = require("swagger-tools");
const YAML = require('yamljs');
const serverPort = 5001;
require('dotenv').config();


const options = {
  swaggerUi: path.join(__dirname, "/swagger.json"),
  controllers: path.join(__dirname, "./api/controllers"),
  useStubs: true, // Conditionally turn on stubs (mock mode)
};

const swaggerConfig = YAML.load("./api/swagger.yaml");
// console.log(swaggerConfig)
// development protocol https
if (process.env.NODE_ENV === 'development') {
  swaggerConfig.schemes = ['http'];
}

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerConfig, (middleware) => {
  // Interpret Swagger resources and attach
  // metadata to request - must be first in swagger-tools middleware chain
  app.use("/", middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use("/", middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use("/", middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());
  app.use("/", middleware.swaggerUi());

  // Health Check
  app.get("/", (res) => {
    res.status(200).send("success");
  });
});

http.createServer(app).listen(serverPort, () => {
 console.log(`Your server is listening on port ${serverPort} (http://localhost:${serverPort})`);
  console.log(`Swagger-ui is available on http://localhost:${serverPort}/docs/`);
});

module.exports = app;