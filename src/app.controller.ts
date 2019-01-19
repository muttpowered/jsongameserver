import { Controller, Get } from '@nestjs/common';

// Just a dead end point, rest is elsewhere
@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return `Hello world`;
  }
}
