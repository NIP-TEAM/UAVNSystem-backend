import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { getHashPassword } from 'src/utils/utils';

@Injectable()
export class TenantsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  findOne(id: number) {
    return this.prisma.userInfo.findFirst({
      where: {
        id: id,
      },
    });
  }

  private roundsOfHashing = 10;
  generateRandomPassword() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    const passwordLength = Math.floor(Math.random() * 11) + 6;
    let password = '';

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    return password;
  }

  async register({ email, password, name }: CreateTenantDto) {
    const isExist = await this.prisma.userInfo.findFirst({
      where: {
        email: email.toLowerCase(),
      },
    });
    if (isExist) throw new BadRequestException('this email is existed');
    else {
      // generate password
      const radomPassword = password || this.generateRandomPassword();
      const hashedPassword = await getHashPassword(radomPassword);

      //   const merchat = await this.prisma.merchant.create({
      //     data: {
      //       email,
      //       name: first_name + last_name,
      //       phone: '111',
      //     },
      //   });
      //create account
      await this.prisma.userInfo.create({
        data: {
          email: email.toLowerCase(),
          password: hashedPassword,
          name,
          active: false,
          lastLogin: '0',
        },
      });
    }
  }
}
