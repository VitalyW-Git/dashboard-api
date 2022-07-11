import {NextFunction, Request, Response} from "express";
import {BaseController} from "../common/base.controller";
import {LoggerService} from "../logger/loger.service";
import {HTTPError} from "../errors/http-error.class";

export class UsersController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
        this.bindRouter([
            {path: '/register', method: 'post', func: this.register},
            {path: '/login', method: 'post', func: this.login},
        ])
    }
    // для примера
    // router.method('path', function (req, res) {
    //     res.send('About this wiki');
    // })
    login(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(401, 'ошибка авторизации'));
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register');
    }

    // register(req: Request, res: Response, next: NextFunction) {
    //     this.ok(res, 'register')
    // }
}