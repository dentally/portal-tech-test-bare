import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { pract_appointments } from './data';
import { setSeed } from './helpers';

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

  describe('_generateAvailability', () => {
    const today = new Date().toISOString().split('T')[0];
    beforeEach(() => {
      setSeed(1);
    });
    it('should handle an array that only includes the first practitioners appts from `appointment-availability/src/app/data.ts`', () => {
      expect(
        (component as any)._generateAvailability([pract_appointments[0]])
      ).toEqual([
        {
          date: today,
          available_slots: [
            { start_time: '08:00', finish_time: '08:30', practitioner_id: '1' },
            { start_time: '08:40', finish_time: '09:10', practitioner_id: '1' },
            { start_time: '09:20', finish_time: '09:50', practitioner_id: '1' },
            { start_time: '10:00', finish_time: '10:30', practitioner_id: '1' },
            { start_time: '11:55', finish_time: '12:25', practitioner_id: '1' },
            { start_time: '13:30', finish_time: '14:00', practitioner_id: '1' },
            { start_time: '14:10', finish_time: '14:40', practitioner_id: '1' },
            { start_time: '16:25', finish_time: '16:55', practitioner_id: '1' },
            { start_time: '17:05', finish_time: '17:35', practitioner_id: '1' },
          ],
        },
      ]);
    });

    it('should handle an array that only includes the second practitioners appts from `appointment-availability/src/app/data.ts`', () => {
      expect(
        (component as any)._generateAvailability([pract_appointments[1]])
      ).toEqual([
        {
          date: today,
          available_slots: [
            { start_time: '08:00', finish_time: '08:30', practitioner_id: '2' },
            { start_time: '08:40', finish_time: '09:10', practitioner_id: '2' },
            { start_time: '09:20', finish_time: '09:50', practitioner_id: '2' },
            { start_time: '10:00', finish_time: '10:30', practitioner_id: '2' },
            { start_time: '10:40', finish_time: '11:10', practitioner_id: '2' },
            { start_time: '11:20', finish_time: '11:50', practitioner_id: '2' },
            { start_time: '13:30', finish_time: '14:00', practitioner_id: '2' },
            { start_time: '14:10', finish_time: '14:40', practitioner_id: '2' },
            { start_time: '14:50', finish_time: '15:20', practitioner_id: '2' },
            { start_time: '16:25', finish_time: '16:55', practitioner_id: '2' },
            { start_time: '17:05', finish_time: '17:35', practitioner_id: '2' },
          ],
        },
      ]);
    });

    it('should handle an array that includes all practitioners appts from `appointment-availability/src/app/data.ts`', () => {
      expect(
        (component as any)._generateAvailability(pract_appointments)
      ).toEqual([
        {
          date: today,
          available_slots: [
            { start_time: '08:00', finish_time: '08:30', practitioner_id: '1' },
            { start_time: '08:00', finish_time: '08:30', practitioner_id: '2' },
            { start_time: '08:40', finish_time: '09:10', practitioner_id: '1' },
            { start_time: '08:40', finish_time: '09:10', practitioner_id: '2' },
            { start_time: '09:20', finish_time: '09:50', practitioner_id: '1' },
            { start_time: '09:20', finish_time: '09:50', practitioner_id: '2' },
            { start_time: '10:00', finish_time: '10:30', practitioner_id: '1' },
            { start_time: '10:00', finish_time: '10:30', practitioner_id: '2' },
            { start_time: '10:40', finish_time: '11:10', practitioner_id: '2' },
            { start_time: '11:20', finish_time: '11:50', practitioner_id: '2' },
            { start_time: '11:55', finish_time: '12:25', practitioner_id: '1' },
            { start_time: '13:30', finish_time: '14:00', practitioner_id: '1' },
            { start_time: '13:30', finish_time: '14:00', practitioner_id: '2' },
            { start_time: '14:10', finish_time: '14:40', practitioner_id: '1' },
            { start_time: '14:10', finish_time: '14:40', practitioner_id: '2' },
            { start_time: '14:50', finish_time: '15:20', practitioner_id: '2' },
            { start_time: '16:25', finish_time: '16:55', practitioner_id: '1' },
            { start_time: '16:25', finish_time: '16:55', practitioner_id: '2' },
            { start_time: '17:05', finish_time: '17:35', practitioner_id: '1' },
            { start_time: '17:05', finish_time: '17:35', practitioner_id: '2' },
          ],
        },
      ]);
    });

    it('should handle an appointment duration of 15 minutes', () => {
      expect(
        (component as any)._generateAvailability(pract_appointments, {
          slotDuration: 15,
        })
      ).toEqual([
        {
          date: today,
          available_slots: [
            { start_time: '08:00', finish_time: '08:15', practitioner_id: '1' },
            { start_time: '08:00', finish_time: '08:15', practitioner_id: '2' },
            { start_time: '08:25', finish_time: '08:40', practitioner_id: '1' },
            { start_time: '08:25', finish_time: '08:40', practitioner_id: '2' },
            { start_time: '08:50', finish_time: '09:05', practitioner_id: '1' },
            { start_time: '08:50', finish_time: '09:05', practitioner_id: '2' },
            { start_time: '09:15', finish_time: '09:30', practitioner_id: '1' },
            { start_time: '09:15', finish_time: '09:30', practitioner_id: '2' },
            { start_time: '09:40', finish_time: '09:55', practitioner_id: '1' },
            { start_time: '09:40', finish_time: '09:55', practitioner_id: '2' },
            { start_time: '10:05', finish_time: '10:20', practitioner_id: '1' },
            { start_time: '10:05', finish_time: '10:20', practitioner_id: '2' },
            { start_time: '10:30', finish_time: '10:45', practitioner_id: '1' },
            { start_time: '10:30', finish_time: '10:45', practitioner_id: '2' },
            { start_time: '10:55', finish_time: '11:10', practitioner_id: '2' },
            { start_time: '11:20', finish_time: '11:35', practitioner_id: '2' },
            { start_time: '11:55', finish_time: '12:10', practitioner_id: '1' },
            { start_time: '13:30', finish_time: '13:45', practitioner_id: '1' },
            { start_time: '13:30', finish_time: '13:45', practitioner_id: '2' },
            { start_time: '13:55', finish_time: '14:10', practitioner_id: '1' },
            { start_time: '13:55', finish_time: '14:10', practitioner_id: '2' },
            { start_time: '14:20', finish_time: '14:35', practitioner_id: '1' },
            { start_time: '14:20', finish_time: '14:35', practitioner_id: '2' },
            { start_time: '14:45', finish_time: '15:00', practitioner_id: '2' },
            { start_time: '15:10', finish_time: '15:25', practitioner_id: '2' },
            { start_time: '15:35', finish_time: '15:50', practitioner_id: '2' },
            { start_time: '16:25', finish_time: '16:40', practitioner_id: '1' },
            { start_time: '16:25', finish_time: '16:40', practitioner_id: '2' },
            { start_time: '16:50', finish_time: '17:05', practitioner_id: '1' },
            { start_time: '16:50', finish_time: '17:05', practitioner_id: '2' },
            { start_time: '17:15', finish_time: '17:30', practitioner_id: '1' },
            { start_time: '17:15', finish_time: '17:30', practitioner_id: '2' },
            { start_time: '17:40', finish_time: '17:55', practitioner_id: '1' },
            { start_time: '17:40', finish_time: '17:55', practitioner_id: '2' },
          ],
        },
      ]);
    });

    it('should handle an appointment duration of 45 minutes and gap of 5 minutes', () => {
      expect(
        (component as any)._generateAvailability(pract_appointments, {
          minGap: 5,
          slotDuration: 45,
        })
      ).toEqual([
        {
          date: today,
          available_slots: [
            { start_time: '08:00', finish_time: '08:45', practitioner_id: '1' },
            { start_time: '08:00', finish_time: '08:45', practitioner_id: '2' },
            { start_time: '08:50', finish_time: '09:35', practitioner_id: '1' },
            { start_time: '08:50', finish_time: '09:35', practitioner_id: '2' },
            { start_time: '09:40', finish_time: '10:25', practitioner_id: '1' },
            { start_time: '09:40', finish_time: '10:25', practitioner_id: '2' },
            { start_time: '10:30', finish_time: '11:15', practitioner_id: '2' },
            { start_time: '13:30', finish_time: '14:15', practitioner_id: '1' },
            { start_time: '13:30', finish_time: '14:15', practitioner_id: '2' },
            { start_time: '14:20', finish_time: '15:05', practitioner_id: '2' },
            { start_time: '15:10', finish_time: '15:55', practitioner_id: '2' },
            { start_time: '16:20', finish_time: '17:05', practitioner_id: '1' },
            { start_time: '16:20', finish_time: '17:05', practitioner_id: '2' },
            { start_time: '17:10', finish_time: '17:55', practitioner_id: '1' },
            { start_time: '17:10', finish_time: '17:55', practitioner_id: '2' },
          ],
        },
      ]);
    });

    it('should handle an appointment gap of 15 minutes', () => {
      expect(
        (component as any)._generateAvailability(pract_appointments, {
          minGap: 15,
        })
      ).toEqual([
        {
          date: today,
          available_slots: [
            { start_time: '08:00', finish_time: '08:30', practitioner_id: '1' },
            { start_time: '08:00', finish_time: '08:30', practitioner_id: '2' },
            { start_time: '08:45', finish_time: '09:15', practitioner_id: '1' },
            { start_time: '08:45', finish_time: '09:15', practitioner_id: '2' },
            { start_time: '09:30', finish_time: '10:00', practitioner_id: '1' },
            { start_time: '09:30', finish_time: '10:00', practitioner_id: '2' },
            { start_time: '10:15', finish_time: '10:45', practitioner_id: '1' },
            { start_time: '10:15', finish_time: '10:45', practitioner_id: '2' },
            { start_time: '11:00', finish_time: '11:30', practitioner_id: '2' },
            { start_time: '12:00', finish_time: '12:30', practitioner_id: '1' },
            { start_time: '13:30', finish_time: '14:00', practitioner_id: '1' },
            { start_time: '13:30', finish_time: '14:00', practitioner_id: '2' },
            { start_time: '14:15', finish_time: '14:45', practitioner_id: '1' },
            { start_time: '14:15', finish_time: '14:45', practitioner_id: '2' },
            { start_time: '15:00', finish_time: '15:30', practitioner_id: '2' },
            { start_time: '16:30', finish_time: '17:00', practitioner_id: '1' },
            { start_time: '16:30', finish_time: '17:00', practitioner_id: '2' },
            { start_time: '17:15', finish_time: '17:45', practitioner_id: '1' },
            { start_time: '17:15', finish_time: '17:45', practitioner_id: '2' },
          ],
        },
      ]);
    });
  });
});
