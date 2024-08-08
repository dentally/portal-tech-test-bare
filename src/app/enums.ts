export enum E_Appointment_State {
  PENDING = "Pending",
  CONFIRMED = "Confirmed",
  ARRIVED = "Arrived",
  IN_SURGERY = "In surgery",
  DID_NOT_ATTEND = "Did not attend",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export enum E_Practice_Opening_Hours {
  START_TIME = "08:00",
  END_TIME = "18:00",
}

export enum E_Practitioner_Lunch_Hours {
  START_TIME = "12:30",
  END_TIME = "13:30",
}

export enum E_IndexDb_Resource {
  PRACTITIONER_APPOINTMENTS = "practitioner_appointments",
}
