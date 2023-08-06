import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

@InputType()
export class CreatePurchaseCommand {
  @Field()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 2,
  })
  @Min(0.01)
  amount: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
}
