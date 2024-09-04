import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './infrastructure/controllers/health.controller';
import { HealthService } from './core/services/health.service';
import { TaskModule } from './modules/tasks/task.module';
import { UserModule } from './modules/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.DB_SYNC === 'true',
      logging: true,
      keepConnectionAlive: true,
    }),

    TaskModule,
    UserModule,
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class AppModule {}
