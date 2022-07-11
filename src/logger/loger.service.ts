import { Logger} from "tslog";

export class LoggerService {
    public logger: Logger;

    constructor() {
        this.logger = new Logger({
            displayInstanceName: false, // Определяет, должно ли отображаться имя экземпляра (например, имя хоста). default: false
            displayLoggerName: false, // Определяет, должно ли отображаться необязательное имя регистратора.
            displayFilePath: 'hidden', // Определяет, должны ли отображаться путь к файлу и строка. Возможны 3 настройки:
            displayFunctionName: false, // Определяет, должны ли отображаться имя класса и метода или функции.
        })
    }

    log(...args: unknown[]) {
        this.logger.info(...args)
    }

    error(...args: unknown[]) {
        // отправка в sentry / rollbar
        this.logger.error(...args)
    }

    warn(...args: unknown[]) {
        this.logger.warn(...args)
    }
}