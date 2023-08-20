import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { User } from './model/user.model';
import { Observable } from 'rxjs';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserMSG } from 'src/common/constants';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt_auth.guard';

@ApiTags('users')
//@UseGuards(JwtAuthGuard)
@Controller('api/v2/user')
export class UserController {
  constructor(private readonly clienProxy: ClientProxySuperFlights) {}
  private _clienProxyUser = this.clienProxy.clientProxyUsers();

  @Post()
  create(@Body() user: User): Observable<IUser> {
    return this._clienProxyUser.send(UserMSG.CREATE, user);
  }

  @Get()
  findAll(): Observable<IUser[]> {
    return this._clienProxyUser.send(UserMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IUser> {
    return this._clienProxyUser.send(UserMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: User): Observable<IUser> {
    return this._clienProxyUser.send(UserMSG.UPDATE, { id, user });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clienProxyUser.send(UserMSG.DELETE, id);
  }
}
