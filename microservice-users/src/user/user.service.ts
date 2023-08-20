import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from './model/user.model';
import { IUser } from 'src/common/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}

  async checkPassword(password: string, passwordDb: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDb);
  }

  async findByUsername(username: string) {
    return await this.model.findOne({ username });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async createUser(user: User): Promise<IUser> {
    const hash = await this.hashPassword(user.password);
    const newUser = new this.model({ ...user, password: hash });
    return await newUser.save();
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.model.find();
  }

  async getUser(id: string): Promise<IUser> {
    return await this.model.findById(id);
  }

  async updateUser(id: string, user: User): Promise<IUser> {
    const hash = await this.hashPassword(user.password);
    const userUpdate = { ...user, password: hash };
    return await this.model.findByIdAndUpdate(id, userUpdate, { new: true });
  }

  async deleteUser(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Deleted' };
  }
}
