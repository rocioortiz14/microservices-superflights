import { Controller } from '@nestjs/common';
import { FlightService } from './flight.service';
import { Flight } from './model/flight.model';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightMSG } from 'src/common/constants';
@Controller()
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @MessagePattern(FlightMSG.CREATE)
  createFlight(@Payload() flight: Flight) {
    return this.flightService.createFlight(flight);
  }

  @MessagePattern(FlightMSG.FIND_ALL)
  getAllFlights() {
    return this.flightService.getAllFlights();
  }

  @MessagePattern(FlightMSG.FIND_ONE)
  getFlight(@Payload() id: string) {
    return this.flightService.getFlight(id);
  }

  @MessagePattern(FlightMSG.UPDATE)
  updateFlight(@Payload() payload: any) {
    return this.flightService.updateFlight(payload.id, payload.flight);
  }

  @MessagePattern(FlightMSG.DELETE)
  deleteFlight(@Payload() id: string) {
    return this.flightService.deleteFlight(id);
  }

  @MessagePattern(FlightMSG.ADD_PASSENGER)
  addPassenger(@Payload() payload: any) {
    return this.flightService.addPassenger(
      payload.flighiId,
      payload.passengerId,
    );
  }
}
