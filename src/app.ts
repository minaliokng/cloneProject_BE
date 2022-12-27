import * as express from 'express';
import * as cors from 'cors';
import helmet from 'helmet';
import * as compression from 'compression';
import morgan from './middlewares/morgan';
import apiRouter from './routes';
import errorHandler from './middlewares/errorHandler';
import logger from './config/logger';

class App {
  private app;

  constructor() {
    this.app = express();
  }

  private setMiddlewares() {
    this.app.use(cors()); // TODO: 프론트앤드 서버 배포 후 해당 도메인만 연결하도록 설정
    this.app.use(helmet({ crossOriginOpenerPolicy: false }));
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan);
    this.app.use(apiRouter);
    this.app.use(errorHandler);
  }

  public listen(port: number) {
    this.setMiddlewares();
    this.app.listen(port, () => {
      logger.info(`${port} 포트로 서버가 열렸습니다.`);
    });
  }
}

export default App;
