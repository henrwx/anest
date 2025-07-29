import { Module } from '@nestjs/common';
import { PatientModule } from './patient.module';

@Module({
  imports: [PatientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
