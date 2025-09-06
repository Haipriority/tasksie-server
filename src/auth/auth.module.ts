// src/auth/auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),  // <-- THIS provides Repository<User> in this module
    PassportModule.register({ session: false }), // registers passport
    forwardRef(() => UserModule),
   JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),  // <- **aquí va el secret**
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  controllers: [AuthController],   // <-- aquí
  providers: [AuthService, JwtAuthGuard,LocalAuthGuard, LocalStrategy],
  exports: [AuthService, JwtModule, JwtAuthGuard,LocalAuthGuard, LocalStrategy],
})
export class AuthModule {}
