import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
  ) {}

  async keepAlive() {
    try {
      await this.sequelize.query('SELECT 1;');
      return { status: 'ok', message: 'Database connection active', timestamp: new Date() };
    } catch (error:any) {
      return { status: 'error', message: error.message };
    }
  }
}