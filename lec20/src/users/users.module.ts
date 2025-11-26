import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { GetUserAgentMiddleware } from 'src/middlewares/get-user-agent.middlewate';
import { ExpensesModule } from 'src/expenses/expenses.module';

@Module({
  imports: [forwardRef(() => ExpensesModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GetUserAgentMiddleware)
      .exclude({path: '/users', method: RequestMethod.DELETE})
      .forRoutes({path: '/users', method: RequestMethod.ALL })
  }
}
