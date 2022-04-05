import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { CatsModule } from './cats/cats.module'
import { LoggerMiddleware } from './common/middleware/logger.middleware'
import { UserModule } from './user/user.module'
import { BookmarkModule } from './bookmark/bookmark.module'
import { PrismaModule } from './prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        CatsModule,
        AuthModule,
        UserModule,
        BookmarkModule,
        PrismaModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('cats')
    }
}
