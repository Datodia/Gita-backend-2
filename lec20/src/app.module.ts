import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpensesModule } from './expenses/expenses.module';
import { UsersModule } from './users/users.module';
import { GetUserAgentMiddleware } from './middlewares/get-user-agent.middlewate';
import { IsAdminMiddleware } from './middlewares/is-admin.middleware';

@Module({
  imports: [ExpensesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(GetUserAgentMiddleware)
    //   .forRoutes({path: '/expenses', method: RequestMethod.ALL})

    consumer
      .apply(IsAdminMiddleware(['editor']))
      .forRoutes({path: '/users/*', method: RequestMethod.DELETE})
  }
}
