import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUserController } from './user.controller.interface';
/** для отладки нагружаем систему */
// import fs from 'fs';
// import { resolve } from 'path';
// const data = [];

@injectable()
export class UsersController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private LoggerService: ILogger) {
		super(LoggerService);
		this.bindRouter([
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/login', method: 'post', func: this.login },
		]);
	}

	// для примера
	// router.method('path', function (req, res) {
	//     res.send('About this wiki');
	// })
	login(req: Request, res: Response, next: NextFunction): void {
		next(new HTTPError(401, 'Ошибка авторизации', 'login'));
	}

	register(req: Request, res: Response, next: NextFunction): void {
		/** для отладки нагружаем систему (читаем файл) */
		// data.push(fs.readFileSync(resolve(__dirname, '../../test.mp4')));
		this.ok(res, 'register');
	}

	// register(req: Request, res: Response, next: NextFunction) {
	//     this.ok(res, 'register')
	// }
}
