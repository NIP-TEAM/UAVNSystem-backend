import { Module } from '@nestjs/common';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';
import { VerifyCodeModule } from '../verify-code/verify-code.module';
import { UserModule } from './user/user.module';
import { AuthModule } from '../auth/auth.module';
import { EmailModule } from '../email/email.module';
import { ToolsModule } from 'src/utils/tools.module';

@Module({
  imports: [VerifyCodeModule, UserModule, AuthModule, EmailModule, ToolsModule],
  controllers: [TenantsController],
  providers: [TenantsService],
  exports: [TenantsService],
})
export class TenantsModule {}
