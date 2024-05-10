import { Module } from '@nestjs/common';
import { PlaneModule } from './core/plane/plane.module';
import { AuthModule } from './core/auth/auth.module';
import { TenantsModule } from './core/tenants/tenants.module';
import { EmailModule } from './core/email/email.module';
import { VerifyCodeModule } from './core/verify-code/verify-code.module';
import { NetworkModule } from './core/network/network.module';
import { EntityModule } from './core/entity/entity.module';
import { ContactModule } from './core/contact/contact.module';
import { ProtocolModule } from './core/protocol/protocol.module';
import { DashboardModule } from './core/dashboard/dashboard.module';

@Module({
  imports: [
    AuthModule,
    ContactModule,
    EmailModule,
    EntityModule,
    NetworkModule,
    PlaneModule,
    ProtocolModule,
    TenantsModule,
    VerifyCodeModule,
    DashboardModule,
  ],
})
export class AppModule {}
