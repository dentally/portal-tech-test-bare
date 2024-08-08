import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { forkJoin, Observable } from 'rxjs';
import { E_IndexDb_Resource } from './enums';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private _dbService: NgxIndexedDBService) {}

  add<T>(resource: E_IndexDb_Resource, data: T): Observable<T> {
    return this._dbService.add(resource, data);
  }

  addAll<T>(resource: E_IndexDb_Resource, data: Array<T>): Observable<Array<T>> {
    const addObservables = data.map((i) => this.add(resource, i));

    return forkJoin(addObservables);
  }

  getAll<T>(resource: E_IndexDb_Resource): Observable<T[]> {
    return this._dbService.getAll(resource);
  }

  get<T>(resource: E_IndexDb_Resource, id: number): Observable<T> {
    return this._dbService.getByKey(resource, id);
  }

  delete(resource: E_IndexDb_Resource, id: number): Observable<any> {
    return this._dbService.delete(resource, id);
  }
}
