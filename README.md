### NestJs Swagger Utils

--

## Usage

```js
import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { IHealthService } from './adapter';
import { Swagger } from 'nestjs-swagger-utils';

@Controller()
export class HealthController {
  constructor(private readonly healthService: IHealthService) {}

  @Get('/health')
  @ApiResponse(Swagger.defaultResponseJSON({ json: { "info": "App UP" }, status: 200, description: 'App UP' }))
  @ApiResponse(Swagger.defaultResponseError({ error: { "message": "App Down" }, status: 500, description: 'App Down' }))
  async getHealth(): Promise<string> {
    return this.healthService.getText();
  }
}
```

#### If you prefer to centralize swagger documantation

 - Create a Swagger class on each module, exemple
 
```
health
     ├── adapter.ts
     ├── controller.ts
     ├── module.ts
     ├── service.ts
     ├── swagger.ts
```
```js
--swagger.ts
import { Swagger } from 'nestjs-swagger-utils';

export class SwagggerResponse {
  static getHealth = {
    200: Swagger.defaultResponseJSON({ json: { 'info': 'App UP' }, status: 200, description: 'App UP' }),
    500: Swagger.defaultResponseError({
      error: { 'message': 'App Down' },
      status: 500,
      description: 'App Down',
    }),
  };
}

export class SwagggerRequest {
  /** If requesters has a body.  */
}
```

```js
--controller.ts
import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { IHealthService } from './adapter';
import { SwagggerResponse } from './swagger';

@Controller()
@ApiTags('health')
export class HealthController {
  constructor(private readonly healthService: IHealthService) {}

  @Get('/health')
  @ApiResponse(SwagggerResponse.getHealth[200])
  @ApiResponse(SwagggerResponse.getHealth[500])
  async getHealth(): Promise<string> {
    return this.healthService.getText();
  }
}
```

---

The following is a list of all the people that have contributed to nest-boilerplate. Thanks for your contributions!

[<img alt="mikemajesty" src="https://avatars1.githubusercontent.com/u/11630212?s=460&v=4&s=117" width="117">](https://github.com/mikemajesty)

## License

It is available under the MIT license.
[License](https://opensource.org/licenses/mit-license.php)
