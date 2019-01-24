import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';

@Module({
    imports: [
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                host: configService.get('REDIS_HOST'),
                port: parseInt(configService.get('REDIS_PORT'), 10),
                db: parseInt(configService.get('REDIS_DB'), 10),
                password: configService.get('REDIS_PASSWORD'),
                keyPrefix: configService.get('REDIS_PREFIX'),
            }),
        }),
        
    ],
})
export class DBCacheModule { }
