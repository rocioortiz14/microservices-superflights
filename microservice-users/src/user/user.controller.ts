import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './model/user.model';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from 'src/common/constants';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @MessagePattern(UserMSG.CREATE)
  createUser(@Payload() user: User) {
    return this.userService.createUser(user);
  }

  @MessagePattern(UserMSG.FIND_ALL)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @MessagePattern(UserMSG.FIND_ONE)
  getUser(@Payload() id: string) {
    return this.userService.getUser(id);
  }

  @MessagePattern(UserMSG.UPDATE)
  updateUser(@Payload() payload: any) {
    return this.userService.updateUser(payload.id, payload.user);
  }

  @MessagePattern(UserMSG.DELETE)
  deleteUser(@Payload() id: string) {
    return this.userService.deleteUser(id);
  }

  @MessagePattern(UserMSG.VALID_USER)
  async validateUser(@Payload() payload: any) {
    const user = await this.userService.findByUsername(payload.username);
    if(!user) throw new HttpException('USUARIO NO EXISTE', HttpStatus.NOT_FOUND)
    const isValidPassword = await this.userService.checkPassword(
      payload.password,
      user.password,
    );

    if (user && isValidPassword) return user;
    return null;
  }
}
