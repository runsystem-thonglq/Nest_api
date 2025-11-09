import { Module } from "@nestjs/common";

import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleModule } from "@nestjs/schedule";
import { BullModule } from "@nestjs/bull";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { dataSourceOptions } from "./database/data-source";
import { ToeicModule } from "@modules/toeic/toeic.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...dataSourceOptions,
        synchronize: configService.get("NODE_ENV") !== "production",
        autoLoadEntities: true,
        logging: configService.get("NODE_ENV") !== "production",
      }),
    }),
    // RedisModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: "single",
    //     host: configService.get("REDIS_HOST"),
    //     port: parseInt(configService.get("REDIS_PORT")),
    //     connectTimeout: 10000,
    //     retryStrategy: (times: number) => {
    //       return Math.min(times * 50, 2000);
    //     },
    //   }),
    // }),
    ScheduleModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get("REDIS_HOST"),
          port: configService.get("REDIS_PORT"),
          retryStrategy: (times: number) => {
            return Math.min(times * 50, 2000);
          },
        },
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get("MAIL_HOST"),
          port: config.get("MAIL_PORT"),
          auth: {
            user: config.get("MAIL_USER"),
            pass: config.get("MAIL_PASS"),
          },
        },
        template: {
          dir: __dirname + "/shared/email",
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    ToeicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
