import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ResponseEntity } from '../../../shared/interface/response.interface';
import { StorageService } from '../../../shared/service/storage.service';
import { Contact } from '../interface/contact.interface';

@Injectable({providedIn: 'root'})
export class ContactService {
  constructor(
    private readonly http: HttpClient,
    private readonly snackBar: MatSnackBar,
  )
  {
  }

  public index(personId: string): Observable<Contact[]> {
    return this.http.get<ResponseEntity<Contact[]>>(`${StorageService.getEndpoint()}/persons/${personId}/contacts`).pipe(
      map(res => res.data),
    );
  }

  public find(personId: string, id: string): Observable<Contact> {
    return this.http.get<ResponseEntity<Contact>>(`${StorageService.getEndpoint()}/persons/${personId}/contacts/${id}`).pipe(
      map(res => res.data),
    );
  }

  public create(personId: string, entity: Contact): Observable<Contact> {
    return this.http.post<ResponseEntity<Contact>>(`${StorageService.getEndpoint()}/persons/${personId}/contacts`, entity).pipe(
      tap(_ => this.snackBar.open(`Contato ${entity.type} - ${entity.value} cadastrado com sucesso`, undefined, {
        duration: 2000,
      })),
      map(res => res.data),
    );
  }

  public update(personId: string, entity: Contact): Observable<Contact> {
    return this.http.put<ResponseEntity<Contact>>(`${StorageService.getEndpoint()}/persons/${personId}/contacts/${entity.id}`, entity).pipe(
      tap(_ => this.snackBar.open(`Contato ${entity.type} - ${entity.value} atualizado com sucesso`, undefined, {
        duration: 2000,
      })),
      map(res => res.data),
    );
  }

  public delete(personId: string, entity: Contact): Observable<void> {
    return this.http.delete<void>(`${StorageService.getEndpoint()}/persons/${personId}/contacts/${entity.id}`).pipe(
      tap(_ => this.snackBar.open(`Contato ${entity.type} - ${entity.value} deletado com sucesso`, undefined, {
        duration: 2000,
      })),
    );
  }
}
