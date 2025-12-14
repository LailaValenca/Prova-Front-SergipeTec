import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }

  // 1. Listar (GET /employees)
  listAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  // 2. Buscar por ID (GET /employees/:id)
  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  // 3. Buscar por texto (GET /employees?q=...) - json-server suporta 'q' para busca full-text
  // Se fosse por nome/email, usaria: /employees?name=...&email=...
  search(query: string): Observable<Employee[]> {
      return this.http.get<Employee[]>(`${this.apiUrl}?q=${query}`);
  }

  // 4. Criar (POST /employees)
  create(employee: Omit<Employee, 'id'>): Observable<Employee> {
    // Note: json-server atribui o 'id' automaticamente para POST
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  // 5. Atualizar (PUT /employees/:id)
  update(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  // 6. Deletar (DELETE /employees/:id)
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}