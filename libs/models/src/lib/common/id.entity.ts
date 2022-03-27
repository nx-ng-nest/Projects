import { IsNotEmpty, IsNumber } from 'class-validator';

export class ID {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
