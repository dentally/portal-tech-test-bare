import { E_Appointment_State } from "./enums";

export type AppointmentBase = {
  id: string;
  duration: string;
  finish_time: string;
  start_time: string;
  state: E_Appointment_State;
};

export type PractitionerAppointmentsBase = {
  practitioner_id: string;
  appointments: Array<AppointmentBase>;
};

export type AvailabilitySlotBase = {
  start_time: string;
  finish_time: string;
  practitioner_id: string;
};

export type AvailabilityBase = {
  date: string;
  available_slots: Array<AvailabilitySlotBase>;
}
