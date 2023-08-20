import { HttpStatus, Injectable } from '@nestjs/common';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { Passenger } from './model/passenger.model';
import { PASSENGER } from 'src/common/models/models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>,
  ) {}
  async createPassenger(passenger: Passenger): Promise<IPassenger> {
    const newPassenger = new this.model(passenger);
    return await newPassenger.save();
  }

  async getAllPassengers(): Promise<IPassenger[]> {
    return await this.model.find();
  }

  async getOnePassenger(id: string): Promise<IPassenger> {
    return await this.model.findById(id);
  }

  async updatePassenger(id: string, passenger: Passenger): Promise<IPassenger> {
    return await this.model.findByIdAndUpdate(id, passenger, { new: true });
  }

  async deletePassenger(id: string) {
     await this.model.findByIdAndDelete(id);
     return {'status': HttpStatus.OK, 'msg': 'Deleted'}
  }
}
