import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ResponseEntity } from '../../../shared/interface/response.interface';
import { StorageService } from '../../../shared/service/storage.service';
import { Person } from '../interface/person.interface';

@Injectable({providedIn: 'root'})
export class PersonService {
  constructor(private readonly http: HttpClient, private readonly snackBar: MatSnackBar) {
  }

  public index(): Observable<Person[]> {
    return this.http.get<ResponseEntity<Person[]>>(`${StorageService.getEndpoint()}/persons`).pipe(
      map(res => res.data),
    );
  }

  public find(id: string): Observable<Person> {
    return this.http.get<ResponseEntity<Person>>(`${StorageService.getEndpoint()}/persons/${id}`).pipe(
      map(res => res.data),
    );
  }

  public create(entity: Person): Observable<Person> {
    return this.http.post<ResponseEntity<Person>>(`${StorageService.getEndpoint()}/persons`, entity).pipe(
      tap(_ => this.snackBar.open(`${entity.name} criado com sucesso`, undefined, {
        duration: 2000,
      })),
      map(res => res.data),
    );
  }

  public update(entity: Person): Observable<Person> {
    return this.http.put<ResponseEntity<Person>>(`${StorageService.getEndpoint()}/persons/${entity.id}`, entity).pipe(
      tap(_ => this.snackBar.open(`${entity.name} atualizado com sucesso`, undefined, {
        duration: 2000,
      })),
      map(res => res.data),
    );
  }

  public delete(entity: Person): Observable<void> {
    return this.http.delete<void>(`${StorageService.getEndpoint()}/persons/${entity.id}`).pipe(
      tap(_ => this.snackBar.open(`${entity.name} deletado com sucesso`, undefined, {
        duration: 2000,
      })),
    );
  }
}
