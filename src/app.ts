import express, { Express } from 'express';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IConfigService } from './config/config.service.interface';
import { UserController } from './users/users.controller';
import { ILogger } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';
import { json } from 'body-parser';
import { Server } from 'http';

@injectable()
export class App {
	app: Express;
	server: Server | undefined;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		this.app = express();
		this.port = 8000;
	}

	// для примера
	// this.usersController.router =
	// router.method('path', function (req, res) {
	//     res.send('About this wiki');
	// })
	useMiddleware(): void {
		this.app.use(json());
	}

	userRouter(): void {
		this.app.use('/users', this.userController.router);
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.userRouter();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server run on localhost:${this.port}`);
	}
}
