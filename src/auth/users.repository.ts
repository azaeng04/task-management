import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });
    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          'An error occurred while trying to add the user credentials. Please try again later or contact support.',
        );
      } else {
        throw new InternalServerErrorException(
          'An unexpected error occurred while trying to add the user credentials. Please try again later or contact support.',
        );
      }
    }
  }

  async findUserByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }
}
