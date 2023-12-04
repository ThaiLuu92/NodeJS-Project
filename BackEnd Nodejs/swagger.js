import swaggerAutogen from "swagger-autogen";
const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: "localhost:8888",
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes/index.js"];

swaggerAutogen()(outputFile, endpointsFiles, doc);