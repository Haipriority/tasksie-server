import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // <-- provides UserRepository
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // optional: export if other modules need it
})
export class UserModule {}
