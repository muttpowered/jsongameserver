import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'mysql' as 'mysql',
                host: configService.get('DB_HOST'),
                port: parseInt(configService.get('DB_PORT'), 10),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                synchronize: true,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            }),
        }),
    ],
    providers: [],
})
export class DatabaseModule { }
