/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { FlightMSG, PassengerMSG } from 'src/common/constants';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { ClientProxySuperFlights} from 'src/common/proxy/client-proxy';
import { Flight } from './model/flight.model';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt_auth.guard';

@ApiTags('flight')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/flight')
export class FlightController {
  constructor(private readonly clienProxy: ClientProxySuperFlights) {}
  private _clientProxyFlights = this.clienProxy.clientProxyFlights();

  @Post()
  create(@Body() flight: Flight): Observable<IFlight> {
    return this._clientProxyFlights.send(FlightMSG.CREATE, flight);
  }

  @Get()
  findAll(): Observable<IFlight[]> {
    return this._clientProxyFlights.send(FlightMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IFlight[]> {
    return this._clientProxyFlights.send(FlightMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() flight: Flight): Observable<IFlight> {
    return this._clientProxyFlights.send(FlightMSG.UPDATE, { id, flight });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyFlights.send(FlightMSG.DELETE, id);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this._clientProxyFlights
      .send(PassengerMSG.FIND_ONE, passengerId)
      .toPromise();

    if (!passenger)
      throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);
    return this._clientProxyFlights.send(FlightMSG.ADD_PASSENGER, {
      flightId,
      passengerId,
    });
  }
}
