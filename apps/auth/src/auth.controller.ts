import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { SharedService } from '@app/shared';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'get-users' })
  async getUsers(@Ctx() context: RmqContext) {
    this.sharedService.acknoledgeMessage(context);

    return this.authService.getUsers();
  }

  @MessagePattern({ cmd: 'save-user' })
  async saveUser(@Ctx() context: RmqContext) {
    this.sharedService.acknoledgeMessage(context);

    return this.authService.saveUser();
  }
}
