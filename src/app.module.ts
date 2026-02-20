import { Module } from '@nestjs/common';
import { configLoader } from 'src/common/config-loader'
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configLoader]
    }),

    //modules
    EmailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
