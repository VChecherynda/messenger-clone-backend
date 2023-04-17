import { Controller } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { SharedService } from '@app/shared';
import { AuthGuard } from '@app/shared/auth.guard';

@Controller()
export class PresenceController {
  constructor(
    private readonly presenceService: PresenceService,
    private readonly sharedService: SharedService,
    // Temp
    private readonly authGuard: AuthGuard,
  ) {}

  @MessagePattern({ cmd: 'get-presence' })
  async getHello(@Ctx() context: RmqContext) {
    this.sharedService.acknoledgeMessage(context);

    console.log('authGuard', this.authGuard.hasJwt());

    return this.presenceService.getHello();
  }
}
