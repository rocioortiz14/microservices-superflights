import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FLIGHT } from 'src/common/models/models';
import { Flight } from './model/flight.model';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlight>,
  ) {}

  async createFlight(flight: Flight): Promise<IFlight> {
    const newFlight = new this.model(flight);
    return await newFlight.save();
  }

  async getAllFlights(): Promise<IFlight[]> {
    return await this.model.find().populate('passengers');
  }

  async getFlight(id: string): Promise<IFlight> {
    return await this.model.findById(id).populate('passengers');
  }

  async updateFlight(id: string, flight: Flight): Promise<IFlight> {
    return await this.model.findByIdAndUpdate(id, flight, { new: true });
  }

  async deleteFlight(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Deleted' };
  }

  async addPassenger(flightId: string, passengerId: string): Promise<IFlight>{
    return await this.model.findByIdAndUpdate(flightId, {$addToSet: {passengers: passengerId}}, {new: true}).populate('passengers');
  }
}
