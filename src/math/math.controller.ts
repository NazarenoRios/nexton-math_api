import { Controller, Post, Body } from '@nestjs/common';
import { MathService } from './math.service';

@Controller('math')
export class MathController {
  constructor(private readonly appService: MathService) {}

  @Post('calculate')
  calculate(@Body('expression') expression: string): { result: number } {
    const result = this.appService.evaluateExpression(expression);
    return { result };
  }
}
