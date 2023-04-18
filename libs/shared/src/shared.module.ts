import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SharedService } from './shared.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
  ],
  providers: [SharedService, AuthGuard],
  exports: [SharedService, AuthGuard],
})
export class SharedModule {
  static registerRmq(service: string, queue: string): DynamicModule {
    const providers = [
      {
        provide: service,
        useFactory(configService: ConfigService) {
          const USER = configService.get('RABBITMQ_USER');
          const PASS = configService.get('RABBITMQ_PASS');
          const HOST = configService.get('RABBITMQ_HOST');

          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${USER}:${PASS}@${HOST}`],
              noAck: false,
              queue,
              queueOptions: {
                durable: true,
              },
            },
          });
        },
      },
    ];

    return {
      module: SharedModule,
      providers,
      exports: providers,
    };
  }
}
