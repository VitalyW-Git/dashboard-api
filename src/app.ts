import express, { Express } from "express";
import {Server} from 'http';
import {LoggerService} from "./logger/loger.service";
import {UsersController} from "./users/users.controller";
import {ExceptionFilter} from "./errors/exception.filter";

export class App {
    app: Express;
    server: Server | undefined;
    port: number;
    logger: LoggerService;
    usersController: UsersController;
    exceptionFilter: ExceptionFilter;

    constructor(logger: LoggerService,
                userController: UsersController,
                exceptionFilter: ExceptionFilter)
    {
        this.app = express();
        this.port = 8080;
        this.logger = logger;
        this.usersController = userController;
        this.exceptionFilter = exceptionFilter;
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

