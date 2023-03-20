import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { services } from "./services";
import { Nfta } from "./entity/Nfta";

import { createConnection } from "typeorm";

const port = 3001;

createConnection().then(async connection => {
  // create express app
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());
  app.use('/', services);
  app.listen(port);
  console.log("App Listening on port:" + port);
}).catch(error => console.log(error));