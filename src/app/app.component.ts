import { Component, OnInit } from '@angular/core';
import {
  E_IndexDb_Resource,
  E_Practice_Opening_Hours,
  E_Practitioner_Lunch_Hours,
} from './enums';
import {
  AvailabilityBase,
  PractitionerAppointmentsBase,
  AvailabilitySlotBase,
  AppointmentBase,
} from './types';
import { DbService } from './db.service';
import { timeToMinutes, minutesToTime, random } from './helpers';
import { CommonModule } from '@angular/common';

const SLOT_DURATION = 30; // Fixed duration of 30 minutes
const MIN_GAP = 10; // Minimum gap of 10 minutes between appointments
const NUM_SUGGESTIONS = 4; // Number of suggestions to generate

interface I_AvailabilityOptions {
  slotDuration: number;
  minGap: number;
  numberOfSuggestions: number;
}

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
        this.availability = this._generateAvailability(data);
      });
  }

  private _generateAvailability(data: Array<PractitionerAppointmentsBase>, options?: I_AvailabilityOptions): Array<AvailabilityBase> {
    const startOfDay = timeToMinutes(E_Practice_Opening_Hours.START_TIME);
    const endOfDay = timeToMinutes(E_Practice_Opening_Hours.END_TIME);
    const lunchStart = timeToMinutes(E_Practitioner_Lunch_Hours.START_TIME);
    const lunchEnd = timeToMinutes(E_Practitioner_Lunch_Hours.END_TIME);

    return [{ date: this._today, available_slots: [] }];
  }
}
