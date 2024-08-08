import { E_Appointment_State } from "../enums";

export const pract_appointments = [
  {
    practitioner_id: '1',
    // Only setting appointments for one day so no need to specify the date
    appointments: [
      {
        id: '1',
        duration: '30',
        finish_time: '10:30',
        start_time: '10:00',
        state: E_Appointment_State.CANCELLED,
      },
      {
        id: '2',
        duration: '45',
        finish_time: '11:45',
        start_time: '11:00',
        state: E_Appointment_State.PENDING,
      },
      {
        id: '3',
        duration: '15',
        finish_time: '12:15',
        start_time: '12:00',
        state: E_Appointment_State.CANCELLED,
      },
      {
        id: '4',
        duration: '15',
        finish_time: '16:15',
        start_time: '15:00',
        state: E_Appointment_State.PENDING,
      },
    ],
  },
  {
    practitioner_id: '2',
    // Only setting appointments for one day so no need to specify the date
    appointments: [
      {
        id: '1',
        duration: '30',
        finish_time: '09:30',
        start_time: '09:00',
        state: E_Appointment_State.CANCELLED,
      },
      {
        id: '2',
        duration: '15',
        finish_time: '12:15',
        start_time: '12:00',
        state: E_Appointment_State.PENDING,
      },
      {
        id: '3',
        duration: '15',
        finish_time: '15:15',
        start_time: '15:00',
        state: E_Appointment_State.CANCELLED,
      },
      {
        id: '4',
        duration: '15',
        finish_time: '16:15',
        start_time: '16:00',
        state: E_Appointment_State.PENDING,
      },
    ],
  },
];
