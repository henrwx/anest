import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePatientDto) {
    await this.prisma.patient.create({
      data: {
        firstName: dto.firstName,
        middleName: dto.middleName,
        lastName: dto.lastName,
        dateOfBirth: dto.dateOfBirth,
        status: dto.status,
        addresses: {
          create: dto.addresses ?? [],
        },
      },
    });
    return this.prisma.patient.findMany({
      include: { addresses: true },
    });
  }

  findAll() {
    return this.prisma.patient.findMany({
      include: { addresses: true },
    });
  }

  findOne(id: number) {
    return this.prisma.patient.findUnique({
      where: { id },
      include: { addresses: true },
    });
  }

  update(id: number, dto: UpdatePatientDto) {
    return this.prisma.patient.update({
      where: { id },
      data: {
        firstName: dto.firstName,
        middleName: dto.middleName,
        lastName: dto.lastName,
        dateOfBirth: dto.dateOfBirth,
        status: dto.status,
        addresses: {
          create: dto.addresses ?? [],
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.patient.delete({
      where: { id },
    });
  }
}
