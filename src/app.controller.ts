import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// LEARN: A controller is responsible for receiving specific set of requests
// based on specifc routing (decorator @Controller('path')). Usually more than
// one route is associated with one controller.
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // LEARN: A decorator for HTTP method may also have an optional path
  // f.e. @Get(stuff), which in this controller would respond to requests
  // GET /path/stuff.
  // Routes can also be defined by wildcards f.e. @Get(pa*th) will serve any of
  // /path, /paxth, /pa8th, /paxxxxxxxxth
  // LEARN: For routes with dynamic parameters - define them after all static
  // paths - @Get(':id'), inject @Params() into the fxn signature to access them.
  // LEARN: Default status code can be changed with a decorator @HttpCode()
  // If you need dynamic choice of status code, inject @Res() and send the
  // response manually.
  @Get()
  // LEARN: For a handler to the access to the details of the client's request
  // we can inject the request object with decorator inside the signature
  // getHello(@Req() request: Request): ...
  // usually though, it is done through decorators that access request's parts
  // directly f.e. @Body(key?: string) or @Headers(name?: string)
  getHello(): string {
    // LEARN: When a request handler returs JS object or array, it will be
    // serialized automatically. With returning primitives (f.e. strings),
    // just the raw value will be returned.
    return this.appService.getHello();
  }
}
