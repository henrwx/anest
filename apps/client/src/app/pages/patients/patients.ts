import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PatientsService, Patient } from '../../services/patients.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreatePatientDialog } from './create-patient/create-patient';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.html',
  styleUrls: ['./patients.css'],
  imports: [
    DatePipe,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class Patients implements OnInit {
  private dialog = inject(MatDialog);
  private patientsService = inject(PatientsService);

  displayedColumns: string[] = ['id', 'status', 'name', 'dateOfBirth'];
  dataSource = new MatTableDataSource<Patient>([]);
  selectedPatient: Patient | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.patientsService.getPatients().subscribe({
      next: (patients: Patient[]) => {
        this.dataSource.data = patients;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failed to load patients', err);
      },
    });
  }

  selectPatient(patient: Patient): void {
    if (this.selectedPatient?.id === patient.id) {
      this.selectedPatient = null;
    } else {
      this.selectedPatient = patient;
    }
  }

  openCreatePatientDialog(): void {
    const dialogRef = this.dialog.open(CreatePatientDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.dataSource.data = result;
    });
  }
}
