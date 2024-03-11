import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TenantsService } from '../tenants/tenants.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private tenantService: TenantsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik9ol0pnip',
    });
  }

  async validate(payload: { userId: number; shop_id: number }) {
    const tenant = await this.tenantService.findOne(Number(payload.userId));

    if (!tenant) {
      throw new UnauthorizedException();
    }

    return { tenant };
  }
}
