import express from 'express';
import displayRoutes from 'express-routemap';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { API_VERSION, LOG_FORMAT, NODE_ENV, PORT } from './config/config';
import { Routes } from './interfaces/route.interface';
import { logger, stream } from './utils/logger';
import corsConfig from './config/cors.config';

class App {
  public app: express.Application;
  public env: string;
  public port: number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = Number(PORT) || 5000;
    this.config();
    this.initializeRoutes(routes);
  }

  /**
   * initializeRoutes
   */
  public initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use(`/api/${API_VERSION}`, route.router);
    });
  }

  private config(): void {
    this.app.use(morgan(LOG_FORMAT ?? '../logs', { stream }));
    this.app.use(cors(corsConfig));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(hpp());
    this.app.use(cookieParser());
  }

  public listen() {
    this.app.listen(this.port, () => {
      displayRoutes(this.app);
      logger.info(`=================================`);
      logger.info(`=========== ENV: ${this.env} ============`);
      logger.info(`🚀Listening on http://localhost:${this.port} 🚀`);
      logger.info(`=================================`);
    });
  }
}

export default App;
