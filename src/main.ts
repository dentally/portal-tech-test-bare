import { provideHttpClient } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { AppComponent } from './app/app.component';
import { DbService } from './app/db.service';
import { firstValueFrom } from 'rxjs';
import { PractitionerAppointmentsBase } from './types';
import { pract_appointments } from './app/data';
import { bootstrapApplication } from '@angular/platform-browser';
import { dbSchema } from './app/schema';
import { E_IndexDb_Resource } from './enums';

export function initializeApp(dbService: DbService) {
  return async (): Promise<any> => {
    const appts = await firstValueFrom(
      dbService.getAll<PractitionerAppointmentsBase>(E_IndexDb_Resource.PRACTITIONER_APPOINTMENTS)
    );
    if (appts.length === 0) {
      await firstValueFrom(
        dbService.addAll<PractitionerAppointmentsBase>(
          E_IndexDb_Resource.PRACTITIONER_APPOINTMENTS,
          pract_appointments
        )
      );
    }
  };
}

const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    importProvidersFrom(NgxIndexedDBModule.forRoot(dbSchema)),
    DbService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [DbService],
      multi: true,
    },
  ],
};

bootstrapApplication(AppComponent, appConfig);
