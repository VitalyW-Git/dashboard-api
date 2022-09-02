import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] Успешно подключились к базе данных');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error(`[PrismaService] Ошибка при подключении к базе данных: ${e.message}`);
			}
		}
	}

	async disconnect(): Promise<void> {
		try {
			await this.client.$disconnect();
			this.logger.log('[PrismaService] Успешно подключились к базе данных');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error(`[PrismaService] Ошибка при подключении к базе данных: ${e.message}`);
			}
		}
	}
}
