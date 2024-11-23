import { Test, TestingModule } from '@nestjs/testing';
import { MathService } from './math.service';

describe('MathService', () => {
  let mathService: MathService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MathService],
    }).compile();

    mathService = module.get<MathService>(MathService);
  });

  describe('evaluateExpression', () => {
    it('should return 700 for expression "10 * (2 + 5) * 10"', () => {
      const result = mathService.evaluateExpression('10 * (2 + 5) * 10');
      expect(result).toBe(700);
    });

    it('should handle addition: "2 + 2"', () => {
      const result = mathService.evaluateExpression('2 + 2');
      expect(result).toBe(4);
    });

    it('should handle subtraction: "10 - 5"', () => {
      const result = mathService.evaluateExpression('10 - 5');
      expect(result).toBe(5);
    });

    it('should handle multiplication: "4 * 5"', () => {
      const result = mathService.evaluateExpression('4 * 5');
      expect(result).toBe(20);
    });

    it('should handle division: "20 / 4"', () => {
      const result = mathService.evaluateExpression('20 / 4');
      expect(result).toBe(5);
    });

    it('should respect operator precedence: "2 + 3 * 4"', () => {
      const result = mathService.evaluateExpression('2 + 3 * 4');
      expect(result).toBe(14);
    });

    it('should handle nested parentheses: "(2 + 3) * (4 + 5)"', () => {
      const result = mathService.evaluateExpression('(2 + 3) * (4 + 5)');
      expect(result).toBe(45);
    });

    it('should handle multiple nested parentheses: "10 * (2 + (5 * 2))"', () => {
      const result = mathService.evaluateExpression('10 * (2 + (5 * 2))');
      expect(result).toBe(120);
    });

    it('should handle spaces in the expression: " 10 * ( 2 + 5 ) * 10 "', () => {
      const result = mathService.evaluateExpression(' 10 * ( 2 + 5 ) * 10 ');
      expect(result).toBe(700);
    });
  });
});
