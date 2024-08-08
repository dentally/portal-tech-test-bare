import { Component, OnInit } from '@angular/core';
import {
  E_IndexDb_Resource,
  E_Practice_Opening_Hours,
  E_Practitioner_Lunch_Hours,
} from '../enums';
import {
  AvailabilityBase,
  PractitionerAppointmentsBase,
  AvailabilitySlotBase,
  AppointmentBase,
} from '../types';
import { DbService } from './db.service';
import { timeToMinutes, minutesToTime } from './helpers';
import { CommonModule } from '@angular/common';

const SLOT_DURATION = 30; // Fixed duration of 30 minutes
const MIN_GAP = 10; // Minimum gap of 10 minutes between appointments
const NUM_SUGGESTIONS = 4; // Number of suggestions to generate

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private _today = new Date().toISOString().split('T')[0];
  public availability: Array<AvailabilityBase> = [
    { date: this._today, available_slots: [] },
  ];

  constructor(private _dbService: DbService) {}

  ngOnInit() {
    this._loadAppointments();
  }

  private _loadAppointments() {
    this._dbService
      .getAll<PractitionerAppointmentsBase>(
        E_IndexDb_Resource.PRACTITIONER_APPOINTMENTS
      )
      .subscribe((data) => {
        this._generateAvailability(data);
      });
  }

  private _generateAvailability(data: Array<PractitionerAppointmentsBase>) {
    const startOfDay = timeToMinutes(E_Practice_Opening_Hours.START_TIME);
    const endOfDay = timeToMinutes(E_Practice_Opening_Hours.END_TIME);
    const lunchStart = timeToMinutes(E_Practitioner_Lunch_Hours.START_TIME);
    const lunchEnd = timeToMinutes(E_Practitioner_Lunch_Hours.END_TIME);

    // let allSlots: Array<AvailabilitySlotBase> = [];
    // let slotSet = new Set<string>(); // To keep track of unique slots
    // const slot_increments = MIN_GAP || 5; // Allow for a minimum gap of 5 minutes between slots

    // data.forEach(practitionerData => {
    //   const appointments = practitionerData.appointments;
    //   let lastEndTime = startOfDay; // Initialize to opening time

    //   for (
    //     let start = startOfDay;
    //     start + SLOT_DURATION <= endOfDay;
    //     start += slot_increments
    //   ) {
    //     const end = start + SLOT_DURATION;

    //     const slot: AvailabilitySlotBase = {
    //       start_time: minutesToTime(start),
    //       finish_time: minutesToTime(end),
    //       practitioner_id: practitionerData.practitioner_id,
    //     };

    //     // Check if the slot is not during lunch hours, does not overlap with appointments, and is unique
    //     if (
    //       (end <= lunchStart || start >= lunchEnd) &&
    //       !this._isOverlapping(slot, appointments) &&
    //       (start === startOfDay || start >= lastEndTime + MIN_GAP) // Allow first slot to start at opening time
    //     ) {
    //       const slotKey = `${slot.start_time}-${slot.finish_time}`;
    //       if (!slotSet.has(slotKey)) {
    //         allSlots.push(slot);
    //         slotSet.add(slotKey); // Add slot to set
    //         lastEndTime = end; // Update the last end time
    //       }
    //     }
    //   }
    // });

    // if (NUM_SUGGESTIONS) {
    //   allSlots = this._getRandomSlots(allSlots, NUM_SUGGESTIONS);
    // }

    // allSlots.sort((a, b) => timeToMinutes(a.start_time) - timeToMinutes(b.start_time));

    this.availability = [];
  }

  private _getRandomSlots(slots: Array<AvailabilitySlotBase>, num: number) {
    let result = [];
    while (result.length < num && slots.length > 0) {
      const index = Math.floor(Math.random() * slots.length);
      result.push(slots.splice(index, 1)[0]);
    }
    return result;
  }

  private _isOverlapping = (
    slot: AvailabilitySlotBase,
    appointments: Array<AppointmentBase>
  ) => {
    const { start_time: slot_start_time, finish_time: slot_finish_time } = slot;
    return appointments.some(({ start_time, finish_time }) => {
      const appointmentStart = timeToMinutes(start_time);
      const appointmentEnd = timeToMinutes(finish_time);
      return !(timeToMinutes(slot_finish_time) <= appointmentStart || timeToMinutes(slot_start_time) >= appointmentEnd);
    });
  };
}
