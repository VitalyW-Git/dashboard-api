import express, { Express } from "express";
import {Server} from 'http';
import {UsersController} from "./users/users.controller";
import {ExceptionFilter} from "./errors/exception.filter";
import {ILogger} from "./logger/logger.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "./types";
import 'reflect-metadata';

@injectable()
export class App {
    app: Express;
    server: Server | undefined;
    port: number;

    constructor(@inject(TYPES.ILogger) private logger: ILogger,
                @inject(TYPES.UsersController) private usersController: UsersController,
                @inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
    ) {
        this.app = express();
        this.port = 8080;
    }

    // для примера
    // this.usersController.router =
    // router.method('path', function (req, res) {
    //     res.send('About this wiki');
    // })
    userRouter() {
        this.app.use('/users', this.usersController.router);
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init() {
        this.userRouter();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server run on localhost:${this.port}`)
    }
}

