import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Implement test to _generateAvailability passing an array that only includes the first practitioners appts from `appointment-availability/src/app/data.ts`

  // Implement test to _generateAvailability passing an array that only includes the second practitioners appts from `appointment-availability/src/app/data.ts`

  // Implement test to _generateAvailability passing an array that includes all practitioners appts from `appointment-availability/src/app/data.ts`

  // Implement test to _generateAvailability with a an appointment duration of 15 minutes

  // Implement test to _generateAvailability with a an appointment duration of 45 minutes

  // Implement test to _generateAvailability with a an appointment gap of 5 minutes

  // Implement test to _generateAvailability with a an appointment gap of 15 minutes

  // Implement test to _generateAvailability with a variable number of suggested slots
});
