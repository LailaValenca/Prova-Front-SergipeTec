import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }

  listAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl)
      .pipe(
        tap(res => console.log('[EmployeeService] listAll() response count:', Array.isArray(res) ? res.length : 0)),
        map(list => (list || []).map(e => ({ ...e, id: Number((e as any).id) } as Employee)))
      );
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`).pipe(
      tap(res => console.log('[EmployeeService] getEmployee() response:', res)),
      map(e => ({ ...e, id: Number((e as any).id) } as Employee))
    );
  }

  search(query: string): Observable<Employee[]> {
    const trimmed = (query || '').trim().toLowerCase();
    if (!trimmed) return of([]);
    return this.listAll().pipe(
      map(list => (list || []).filter(e => ((e.name || '') as string).toLowerCase().includes(trimmed)))
    );
  }

  createEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee).pipe(
      tap(res => console.log('[EmployeeService] createEmployee() response:', res)),
      map(e => ({ ...e, id: Number((e as any).id) } as Employee))
    );
  }

  updateEmployee(id: number, employee: Omit<Employee, 'id'> | Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee).pipe(
      tap(res => console.log('[EmployeeService] updateEmployee() response:', res)),
      map(e => ({ ...e, id: Number((e as any).id) } as Employee))
    );
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
