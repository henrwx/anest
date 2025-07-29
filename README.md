# Patient Management App

This is a full-stack, monorepo application built with **Nx**, **NestJS**, **Angular**, **Prisma**, and **PostgreSQL** for managing patient records. It supports creating and viewing patients, with associated addresses and statuses.

---

## Tech Stack & Versions

- **Node.js:** 24.41.1
- **npm:** 11.5.1
- **Angular:** 20.1.3
- **NestJS:** 11.1.5
- **Prisma:** 6.12.0
- **PostgreSQL:** 14.18 (via Homebrew on macOS)
- **Nx:** 21.3.8

---

**Project Structure**

This monorepo takes a simplified approach by defining the Prisma schema at the Nx-project level, and with the NestJS and Angular applications within the `/apps` directory.

---

## Setup Instructions

### 1. Verify Prerequisites

- Verify your installed **Node.js**, **npm** (if you are using it), and **PostgreSQL** versions
- Clone this repository

### 2. Install Dependencies

In the directory where you cloned the repo, run the following command:

```bash
npm install
```

### 3. Define Environment Variables

Create a local `.env` file by copying the example file, i.e.:

```bash
cp .env.example .env
```

Replace the `user` and `password` with your local **PostgreSQL** credentials.

### 4. Initialize the Database

Run the following commands to:
- Applying the existing Prisma migrations
- Generate the Prisma types and client

```bash
npx prisma migrate deploy && npx prisma generate
```

### 5. Run the Applications

In two separate terminal windows, run each of the following commands to start each application:

**Backend - NestJS API**

```bash
nx serve api
```

**Frontend - Angular Client**

```bash
nx serve client
```

They will be running at `http://localhost:3000/api` and `http://localhost:4200`, respectively.


---

## Database Schema

Currently, we are collecting minimal patient-related data, i.e.:

**Address**

| Name        	| Type   	| Comment        	|
|-------------	|--------	|----------------	|
| streetLine1 	| String 	|                	|
| streetLine2 	| String 	| Optional field 	|
| city        	| String 	|                	|
| state       	| String 	|                	|
| zip         	| String 	|                	|

**Patient**

| Name        	| Type          	| Comment                                        	|
|-------------	|---------------	|------------------------------------------------	|
| firstName   	| String        	|                                                	|
| middleName  	| String        	| Optional field                                 	|
| lastName    	| String        	|                                                	|
| dateOfBirth 	| DateTime      	|                                                	|
| addresses   	| Address[]     	| Array of addresses, based on the Address model 	|
| status      	| PatientStatus 	| Enum value based on the PatientStatus enum     	|

In order to support multiple addresses in the future, the corresponding models were normalized, placing a reference from addresses-to-patients on the **Address** model.

Initial planning included modeling the data more closely to FHIR standards; however, the current implementation was designed for simplicity, which can be migrated in the future.

---

## API Endpoints

### Patients

`GET /patients` - Retrieve all patients.

`GET /patients/:id` - Retrieve patient by ID.

`POST /patients` - Create a patient.

`PATCH /patients/:id` - Update a patient.

`DELETE /patients/:id` - Delete a patient.

For this project, we only needed to use `GET /patients` and `POST /patients`.

---

## Frontend Features

**Patients Page**

Displays a table of all patients, where clicking a row displays all of their information. There is also an "+ Add Patient" button to open a dialog for creating a new patient.

**Create Patient Modal**

Displays an Angular dialog with a form to enter information for the new patient.
