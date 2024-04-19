import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaneModule } from './core/plane/plane.module';
import { AuthModule } from './core/auth/auth.module';
import { TenantsController } from './core/tenants/tenants.controller';
import { TenantsService } from './core/tenants/tenants.service';
import { TenantsModule } from './core/tenants/tenants.module';
import { PrismaModule } from './prisma/prisma.module';
import { ToolsService } from './utils/tools.service';
import { AuthService } from './core/auth/auth.service';
import { UserService } from './core/user/user.service';
import { EmailModule } from './core/email/email.module';
import { VerifyCodeController } from './core/verify-code/verify-code.controller';
import { VerifyCodeModule } from './core/verify-code/verify-code.module';
import { VerifyCodeService } from './core/verify-code/verify-code.service';
import { EmailService } from './core/email/email.service';
import { NetworkModule } from './core/network/network.module';
import { EntityModule } from './core/entity/entity.module';

@Module({
  controllers: [AppController, TenantsController, VerifyCodeController],
  providers: [
    AppService,
    TenantsService,
    ToolsService,
    AuthService,
    UserService,
    VerifyCodeService,
    EmailService,
  ],
  imports: [
    PlaneModule,
    AuthModule,
    TenantsModule,
    PrismaModule,
    EmailModule,
    VerifyCodeModule,
    NetworkModule,
    EntityModule,
  ],
})
export class AppModule {}
