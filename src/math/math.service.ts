import { Injectable } from '@nestjs/common';

@Injectable()
export class MathService {
  evaluateExpression(expression: string): number {
    // Remove unnecessary spaces
    expression = expression.replace(/\s+/g, '');

    // Resolve parentheses recursively
    while (expression.includes('(')) {
      expression = expression.replace(/\(([^()]+)\)/g, (_, innerExp) =>
        this.evaluateExpression(innerExp).toString(),
      );
    }

    // Solve operations (priority: *, /, +, -)
    return this.calculateExpression(expression);
  }

  private calculateExpression(expression: string): number {
    const operators = /(\*|\/|\+|\-)/;

    // Separating numbers and operators
    const terms = expression.split(operators).filter(Boolean);
    const stack: number[] = [];
    let currentOperator = '+';

    for (const term of terms) {
      if (operators.test(term)) {
        currentOperator = term;
      } else {
        const num = parseFloat(term);
        switch (currentOperator) {
          case '+':
            stack.push(num);
            break;
          case '-':
            stack.push(-num);
            break;
          case '*':
            stack.push(stack.pop()! * num);
            break;
          case '/':
            stack.push(stack.pop()! / num);
            break;
        }
      }
    }

    // sum of all values ​​on the stack
    return stack.reduce((sum, value) => sum + value, 0);
  }
}
