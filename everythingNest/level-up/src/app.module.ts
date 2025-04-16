import { Module } from '@nestjs/common';
import { BookController } from './modules/getBook/book.controller';
import { BookService } from './modules/getBook/book.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/auth/model/auth.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get<'postgres'>('DB_TYPE'),
        host: config.get<string>('DB_HOST'),
        username: config.get<string>('DB_USERNAME'),
        port: config.get<number>('DB_PORT'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [UserEntity],
        migrations: [__dirname + '/migrations/*.ts'],
        migrationsTableName: 'migrations',
        cli: {
          migrationsDir: 'src/migrations',
        },
      }),
    }),
    AuthModule,
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class AppModule {}
