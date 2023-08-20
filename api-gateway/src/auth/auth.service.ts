import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserMSG } from 'src/common/constants';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { User } from 'src/user/model/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxy: ClientProxySuperFlights,
    private readonly jwtService: JwtService,
  ) {}
  private _clientProxyUser = this.clientProxy.clientProxyUsers();
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this._clientProxyUser
      .send(UserMSG.VALID_USER, { username, password })
      .toPromise();

    if (user) return user;
    return null;
  }

  async signIn(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async signUp(user: User) {
    return await this._clientProxyUser.send(UserMSG.CREATE, user).toPromise();
  }
}
