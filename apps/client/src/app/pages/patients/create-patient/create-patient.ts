import { Component, inject } from '@angular/core';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Patient,
  PatientAddress,
  PatientsService,
  PatientStatus,
} from '../../../services/patients.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.html',
  styleUrls: ['./create-patient.css'],
  imports: [
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class CreatePatientDialog {
  private dialogRef = inject(MatDialogRef<CreatePatientDialog>);
  private fb = inject(FormBuilder);
  private patientService = inject(PatientsService);

  patientStatuses = Object.values(PatientStatus);

  form: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    middleName: [''],
    lastName: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    streetLine1: ['', Validators.required],
    streetLine2: [''],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
    status: ['', Validators.required],
  });

  cancel() {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const {
      firstName,
      lastName,
      middleName,
      dateOfBirth,
      streetLine1,
      streetLine2,
      city,
      state,
      zip,
      status,
    } = this.form.value;

    const address: PatientAddress = {
      streetLine1,
      streetLine2 /* NOTE: Should omit if empty */,
      city,
      state,
      zip,
    };

    const patient: Patient = {
      firstName,
      middleName /* NOTE: Should omit if empty */,
      lastName,
      dateOfBirth,
      addresses: [address],
      status,
    };

    this.patientService.createPatient(patient).subscribe({
      next: (patients: Patient[]) => {
        this.dialogRef.close(patients);
      },
      error: (err: HttpErrorResponse) => {
        console.log('Failed to create patient', err);
      },
    });
  }
}
