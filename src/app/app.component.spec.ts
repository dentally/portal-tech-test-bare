import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { pract_appointments } from './data';
import { setSeed } from './helpers';
import { min } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NgxIndexedDBModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe("_generateAvailability", () => {
    const today = new Date().toISOString().split('T')[0];
    beforeEach(() => {
      setSeed(1);
    });

    it("should handle an array that only includes the first practitioners appts from `appointment-availability/src/app/data.ts`", () => {
      expect((component as any)._generateAvailability([pract_appointments[0]])).toEqual([{
        date: today,
        available_slots: [
          { start_time: '08:00', finish_time: '08:30', practitioner_id: '1' },
          { start_time: '08:40', finish_time: '09:10', practitioner_id: '1' },
          { start_time: '09:20', finish_time: '09:50', practitioner_id: '1' },
          { start_time: '10:30', finish_time: '11:00', practitioner_id: '1' },
          { start_time: '13:30', finish_time: '14:00', practitioner_id: '1' },
          { start_time: '14:10', finish_time: '14:40', practitioner_id: '1' },
          { start_time: '16:20', finish_time: '16:50', practitioner_id: '1' },
          { start_time: '17:00', finish_time: '17:30', practitioner_id: '1' },
        ]
      }]);
    });

    it("should handle an array that only includes the second practitioners appts from `appointment-availability/src/app/data.ts`", () => {
      expect((component as any)._generateAvailability([pract_appointments[1]])).toEqual([{
        date: today,
        available_slots: [
          { start_time: '08:00', finish_time: '08:30', practitioner_id: '2' },
          { start_time: '09:30', finish_time: '10:00', practitioner_id: '2' },
          { start_time: '10:10', finish_time: '10:40', practitioner_id: '2' },
          { start_time: '10:50', finish_time: '11:20', practitioner_id: '2' },
          { start_time: '11:30', finish_time: '12:00', practitioner_id: '2' },
          { start_time: '13:30', finish_time: '14:00', practitioner_id: '2' },
          { start_time: '14:10', finish_time: '14:40', practitioner_id: '2' },
          { start_time: '15:20', finish_time: '15:50', practitioner_id: '2' },
          { start_time: '16:20', finish_time: '16:50', practitioner_id: '2' },
          { start_time: '17:00', finish_time: '17:30', practitioner_id: '2' },
        ]
      }]);
    });

    it("should handle an array that includes all practitioners appts from `appointment-availability/src/app/data.ts`", () => {
      expect((component as any)._generateAvailability(pract_appointments)).toEqual([{
        date: today,
        available_slots: [
          { start_time: '08:00', finish_time: '08:30', practitioner_id: '1' },
          { start_time: '08:00', finish_time: '08:30', practitioner_id: '2' },
          { start_time: '08:40', finish_time: '09:10', practitioner_id: '1' },
          { start_time: '09:20', finish_time: '09:50', practitioner_id: '1' },
          { start_time: '09:30', finish_time: '10:00', practitioner_id: '2' },
          { start_time: '10:10', finish_time: '10:40', practitioner_id: '2' },
          { start_time: '10:30', finish_time: '11:00', practitioner_id: '1' },
          { start_time: '10:50', finish_time: '11:20', practitioner_id: '2' },
          { start_time: '11:30', finish_time: '12:00', practitioner_id: '2' },
          { start_time: '13:30', finish_time: '14:00', practitioner_id: '1' },
          { start_time: '13:30', finish_time: '14:00', practitioner_id: '2' },
          { start_time: '14:10', finish_time: '14:40', practitioner_id: '1' },
          { start_time: '14:10', finish_time: '14:40', practitioner_id: '2' },
          { start_time: '15:20', finish_time: '15:50', practitioner_id: '2' },
          { start_time: '16:20', finish_time: '16:50', practitioner_id: '1' },
          { start_time: '16:20', finish_time: '16:50', practitioner_id: '2' },
          { start_time: '17:00', finish_time: '17:30', practitioner_id: '1' },
          { start_time: '17:00', finish_time: '17:30', practitioner_id: '2' },
        ]
      }]);
    });

    it("should handle an appointment duration of 15 minutes", () => {
      expect((component as any)._generateAvailability(pract_appointments, {
        slotDuration: 15,
      })).toEqual([{
        date: today,
        available_slots: [
          { start_time: '08:00', finish_time: '08:15', practitioner_id: '1' },
          { start_time: '08:00', finish_time: '08:15', practitioner_id: '2' },
          { start_time: '08:30', finish_time: '08:45', practitioner_id: '1' },
          { start_time: '08:30', finish_time: '08:45', practitioner_id: '2' },
          { start_time: '09:00', finish_time: '09:15', practitioner_id: '1' },
          { start_time: '09:30', finish_time: '09:45', practitioner_id: '1' },
          { start_time: '09:30', finish_time: '09:45', practitioner_id: '2' },
          { start_time: '10:00', finish_time: '10:15', practitioner_id: '2' },
          { start_time: '10:30', finish_time: '10:45', practitioner_id: '1' },
          { start_time: '10:30', finish_time: '10:45', practitioner_id: '2' },
          { start_time: '11:00', finish_time: '11:15', practitioner_id: '2' },
          { start_time: '11:30', finish_time: '11:45', practitioner_id: '2' },
          { start_time: '13:30', finish_time: '13:45', practitioner_id: '1' },
          { start_time: '13:30', finish_time: '13:45', practitioner_id: '2' },
          { start_time: '14:00', finish_time: '14:15', practitioner_id: '1' },
          { start_time: '14:00', finish_time: '14:15', practitioner_id: '2' },
          { start_time: '14:30', finish_time: '14:45', practitioner_id: '1' },
          { start_time: '14:30', finish_time: '14:45', practitioner_id: '2' },
          { start_time: '15:20', finish_time: '15:35', practitioner_id: '2' },
          { start_time: '16:20', finish_time: '16:35', practitioner_id: '1' },
          { start_time: '16:20', finish_time: '16:35', practitioner_id: '2' },
          { start_time: '16:50', finish_time: '17:05', practitioner_id: '1' },
          { start_time: '16:50', finish_time: '17:05', practitioner_id: '2' },
          { start_time: '17:20', finish_time: '17:35', practitioner_id: '1' },
          { start_time: '17:20', finish_time: '17:35', practitioner_id: '2' },
        ]
      }]);
    });

    it("should handle an appointment duration of 45 minutes", () => {
      expect((component as any)._generateAvailability(pract_appointments, {
        slotDuration: 45,
      })).toEqual([{
        date: today,
        available_slots: [
          { start_time: '08:00', finish_time: '08:45', practitioner_id: '1' },
          { start_time: '08:00', finish_time: '08:45', practitioner_id: '2' },
          { start_time: '09:00', finish_time: '09:45', practitioner_id: '1' },
          { start_time: '09:30', finish_time: '10:15', practitioner_id: '2' },
          { start_time: '10:30', finish_time: '11:15', practitioner_id: '2' },
          { start_time: '13:30', finish_time: '14:15', practitioner_id: '1' },
          { start_time: '13:30', finish_time: '14:15', practitioner_id: '2' },
          { start_time: '16:20', finish_time: '17:05', practitioner_id: '1' },
          { start_time: '16:20', finish_time: '17:05', practitioner_id: '2' },
        ]
      }]);
    });

    it("should handle an appointment gap of 5 minutes", () => {
      expect((component as any)._generateAvailability(pract_appointments, {
        minGap: 5,
      })).toEqual([{
        date: today,
        available_slots: [
          { start_time: '08:00', finish_time: '08:30', practitioner_id: '1' },
          { start_time: '08:00', finish_time: '08:30', practitioner_id: '2' },
          { start_time: '08:35', finish_time: '09:05', practitioner_id: '1' },
          { start_time: '09:10', finish_time: '09:40', practitioner_id: '1' },
          { start_time: '09:30', finish_time: '10:00', practitioner_id: '2' },
          { start_time: '10:05', finish_time: '10:35', practitioner_id: '2' },
          { start_time: '10:30', finish_time: '11:00', practitioner_id: '1' },
          { start_time: '10:40', finish_time: '11:10', practitioner_id: '2' },
          { start_time: '11:15', finish_time: '11:45', practitioner_id: '2' },
          { start_time: '13:30', finish_time: '14:00', practitioner_id: '1' },
          { start_time: '13:30', finish_time: '14:00', practitioner_id: '2' },
          { start_time: '14:05', finish_time: '14:35', practitioner_id: '1' },
          { start_time: '14:05', finish_time: '14:35', practitioner_id: '2' },
          { start_time: '15:15', finish_time: '15:45', practitioner_id: '2' },
          { start_time: '16:15', finish_time: '16:45', practitioner_id: '1' },
          { start_time: '16:15', finish_time: '16:45', practitioner_id: '2' },
          { start_time: '16:50', finish_time: '17:20', practitioner_id: '1' },
          { start_time: '16:50', finish_time: '17:20', practitioner_id: '2' },
          { start_time: '17:25', finish_time: '17:55', practitioner_id: '1' },
          { start_time: '17:25', finish_time: '17:55', practitioner_id: '2' },
        ]
      }]);
    });

    it("should handle an appointment gap of 15 minutes", () => {
      expect((component as any)._generateAvailability(pract_appointments, {
        minGap: 15,
      })).toEqual([{
        date: today,
        available_slots: [
          { start_time: '08:00', finish_time: '08:30', practitioner_id: '1' },
          { start_time: '08:00', finish_time: '08:30', practitioner_id: '2' },
          { start_time: '08:45', finish_time: '09:15', practitioner_id: '1' },
          { start_time: '09:30', finish_time: '10:00', practitioner_id: '1' },
          { start_time: '09:30', finish_time: '10:00', practitioner_id: '2' },
          { start_time: '10:15', finish_time: '10:45', practitioner_id: '2' },
          { start_time: '10:30', finish_time: '11:00', practitioner_id: '1' },
          { start_time: '11:00', finish_time: '11:30', practitioner_id: '2' },
          { start_time: '13:30', finish_time: '14:00', practitioner_id: '1' },
          { start_time: '13:30', finish_time: '14:00', practitioner_id: '2' },
          { start_time: '14:15', finish_time: '14:45', practitioner_id: '1' },
          { start_time: '14:15', finish_time: '14:45', practitioner_id: '2' },
          { start_time: '15:15', finish_time: '15:45', practitioner_id: '2' },
          { start_time: '16:15', finish_time: '16:45', practitioner_id: '1' },
          { start_time: '16:15', finish_time: '16:45', practitioner_id: '2' },
          { start_time: '17:00', finish_time: '17:30', practitioner_id: '1' },
          { start_time: '17:00', finish_time: '17:30', practitioner_id: '2' },
        ]
      }]);
    });
  });
});
