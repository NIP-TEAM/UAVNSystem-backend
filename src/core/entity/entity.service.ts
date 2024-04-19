import { Injectable } from '@nestjs/common';

@Injectable()
export class EntityService {
  findAll(maps: [number, number][]) {
    return maps.map((item) => ({
      map: item,
      speed: (Math.random() * 10).toFixed(2),
      status: Math.random() > 0.3 ? true : false,
    }));
  }
}
