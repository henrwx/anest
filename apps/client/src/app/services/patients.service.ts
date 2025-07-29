import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/* NOTE: Should fetch from the server */
export enum PatientStatus {
  Active = 'Active',
  Churned = 'Churned',
  Inquiry = 'Inquiry',
  Onboarding = 'Onboarding',
}

export interface PatientAddress {
  id?: number;
  patientId?: number;
  streetLine1: string;
  streetLine2?: string;
  city: string;
  state: string;
  zip: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Patient {
  id?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  status: PatientStatus;
  addresses: PatientAddress[];
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({ providedIn: 'root' })
export class PatientsService {
  private apiUrl = 'http://localhost:3000/api/patient';

  private http = inject(HttpClient);

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  createPatient(patient: Patient): Observable<Patient[]> {
    return this.http.post<Patient[]>(this.apiUrl, patient);
  }
}
