import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SocketUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToWs().getClient()
    return request['handshake']['auth']['userId'];
  },
);