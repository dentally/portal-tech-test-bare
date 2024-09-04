# AppointmentAvailability

To run the tech test run `npm start` from the root of the project. 

## Prerequisites

- Minimum Node.js version 18.19.0
- Run `npm install` to install the dependencies

## How to complete the test

### Background

- Patients use Portal to book appointments with a practitioner.
- Portal suggests a number of available times to book an appointment, spread throughout the day.
- Portal tries to suggest a slot which would be most convenient for the Dentist.

### Assumptions

- The practitioner works from 9am to 5pm every weekday, with a lunch break between 12.30pm and 1.30pm. Appointments should only be suggested when the practitioner is working and when the practice is open.
- The practitioner can only have one Appointment at a time i.e. appointments do not intersect with other appointments for the same practitioner.
- The appointment to be booked is 30 minutes long.
- We can assume any appointments that have been cancelled can be used
- There must be a minimum gap of 10 mins between appointments

### Task

Given the appointments which are already booked for a day, output the available slots for appointment start times, spread throughout the day for one practitioner.

### Additional Tasks

- Change the solution to handle a variable number of practitioners with different appointments, and return available slots which includes different practitioners.
- Change the solution to accept a appointment duration/min gap as a parameter.
- Change the solution to output a random variable number of suggestions.

### How to complete the test

The test has been created using a boilerplate Angular project. This includes TypeScript, TailwindCSS and Karma for testing. Unit tests have been written which will be used to validate the solution. These will fail initially. The project uses IndexedDB to setup and store the practitioners appointments. To view the appointments stored in the database, you can use the browser dev tools by visiting the Application tab and selecting IndexedDB. If you need to clear the database, you can do so here.

- The solution should be implemented in the `app.component.ts` file. You can see here that the data is already setup for you to use and you can implement your solution in the `_generateAvailability` method. 
- The method should set the `availability` property with the available slots for the day. 
- The data has been set up to include appointments only for "today" so you do not need to worry about checking any dates.
- The top of the file includes some constants which you can use to help with your solution.
- There are a couple of helper methods to help you implement your solution if you need them. They can be found at `appointment-availability/src/app/helpers.ts`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

