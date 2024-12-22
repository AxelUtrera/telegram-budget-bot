import { ValueTransformer } from "typeorm";

export class DecimalTransformer implements ValueTransformer {
  to(value: number): string {
    return value.toFixed(2).toString();
  }

  from(value: string): number {
    return value ? Number.parseFloat(value) : null;
  }
}
