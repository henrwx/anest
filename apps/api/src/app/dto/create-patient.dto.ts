import { Type } from 'class-transformer';
import {
  IsDate,
  IsOptional,
  IsString,
  ValidateNested,
  IsEnum,
} from 'class-validator';

import { PatientStatus } from '@prisma/client';

class AddressDto {
  @IsString()
  streetLine1!: string;

  @IsOptional()
  @IsString()
  streetLine2?: string;

  @IsString()
  city!: string;

  @IsString()
  state!: string;

  @IsString()
  zip!: string;
}

export class CreatePatientDto {
  @IsString()
  firstName!: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsString()
  lastName!: string;

  @IsDate()
  @Type(() => Date)
  dateOfBirth!: Date;

  @IsEnum(PatientStatus)
  status!: PatientStatus;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses?: AddressDto[];
}
