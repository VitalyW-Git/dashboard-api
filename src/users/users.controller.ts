import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUserController } from './user.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';
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
	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		next(new HTTPError(401, 'Ошибка авторизации', 'login'));
	}

	async register(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		console.log(body);
		/** для отладки нагружаем систему (читаем файл) */
		// data.push(fs.readFileSync(resolve(__dirname, '../../test.mp4')));
		const newUser = new User(body.email, body.name);
		await newUser.setPassword(body.password);
		console.log(newUser.password); // получен hash

		this.ok(res, newUser);
	}

	// register(req: Request, res: Response, next: NextFunction) {
	//     this.ok(res, 'register')
	// }
}
