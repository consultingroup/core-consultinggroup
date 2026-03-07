import { Module } from '@nestjs/common';
import { configLoader } from 'src/common/config-loader';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './modules/email/email.module';
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './modules/users/users.module';
import { MaterialsModule } from './modules/materials/materials.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configLoader],
    }),

    SequelizeModule.forRootAsync({
      useFactory: async () => ({
        dialect: "postgres",
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        autoLoadModels: true,
        synchronize: false,
        logging: false,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }),
    }),

    //modules
    EmailModule,
    UsersModule,
    MaterialsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
