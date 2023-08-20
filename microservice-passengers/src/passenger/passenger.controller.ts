import { Controller } from '@nestjs/common';
import { Passenger } from './model/passenger.model';
import { PassengerService } from './passenger.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PassengerMSG } from 'src/common/constants';
@Controller()
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}
  @MessagePattern(PassengerMSG.CREATE)
  createPassenger(@Payload() passenger: Passenger) {
    return this.passengerService.createPassenger(passenger);
  }

  @MessagePattern(PassengerMSG.FIND_ALL)
  getAllPassengers() {
    return this.passengerService.getAllPassengers();
  }

  @MessagePattern(PassengerMSG.FIND_ONE)
  getOnePassenger(@Payload() id: string) {
    return this.passengerService.getOnePassenger(id);
  }

  @MessagePattern(PassengerMSG.UPDATE)
  updatePassenger(@Payload() payload: any) {
    return this.passengerService.updatePassenger(payload.id, payload.passenger);
  }

  @MessagePattern(PassengerMSG.DELETE)
  deletePassenger(@Payload() id: string) {
    return this.passengerService.deletePassenger(id);
  }
}
