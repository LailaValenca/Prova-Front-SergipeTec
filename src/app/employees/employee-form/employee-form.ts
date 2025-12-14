// src/app/employees/employee-form/employee-form.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee, EmployeeCreate } from '../../models/employee.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.html',
  styleUrls: ['./employee-form.css']
})
export class EmployeeFormComponent implements OnInit {
  // Injeções
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);

  employeeForm!: FormGroup; 
  employeeId: number | null = null; 
  isEditMode: boolean = false;
  submitMessage: string = '';

  ngOnInit(): void {
    this.initializeForm();
    this.checkRouteAndLoadData();
  }

  initializeForm(): void {
    // Cria o formulário e define as validações
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      active: [true]
    });
  }

  checkRouteAndLoadData(): void {
    // Verifica se há um ID na rota para definir o modo Edição
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.employeeId = +idParam; 
        this.isEditMode = true;
        this.loadEmployeeData(this.employeeId);
        return;
      }
    });
  }

  loadEmployeeData(id: number): void {
    this.employeeService.getEmployee(id).subscribe({
      next: (employee: Employee) => {
        // Preenche o formulário com os dados carregados
        this.employeeForm.patchValue(employee);
      },
      error: (err: any) => {
        console.error('Erro ao carregar funcionário:', err);
        this.submitMessage = 'Erro ao carregar dados do funcionário para edição.';
      }
    });
  }

  onSubmit(): void {
    this.submitMessage = '';
    if (this.employeeForm.invalid) {
      this.submitMessage = 'Por favor, preencha todos os campos obrigatórios corretamente.';
      this.employeeForm.markAllAsTouched();
      return;
    }

    const employeeData: EmployeeCreate = this.employeeForm.value;

    let apiCall: Observable<Employee | void>;
    let successMsg: string;

    if (this.isEditMode && this.employeeId) {
      // Atualizar (PUT /employees/:id)
      apiCall = this.employeeService.updateEmployee(this.employeeId, employeeData as any);
      successMsg = 'Funcionário atualizado com sucesso!';
      apiCall.subscribe({
        next: (res: any) => {
          alert(successMsg);
          this.router.navigate(['/employees']);
        },
        error: (err: any) => {
          console.error('Erro ao salvar:', err);
          this.submitMessage = 'Falha ao salvar os dados. Erro de comunicação com a API.';
        }
      });
    } else {
      this.employeeService.listAll().subscribe({
        next: (list) => {
          // calcula maior id numérico existente
          const numericIds = list
            .map(e => (typeof e.id === 'number' ? e.id : parseInt(String(e.id), 10)))
            .filter(n => !isNaN(n));
          const maxId = numericIds.length ? Math.max(...numericIds) : 0;
          const nextId = maxId + 1;

          const payload: any = { id: nextId, ...employeeData };
          this.employeeService.createEmployee(payload as any).subscribe({
            next: (res: any) => {
              alert('Funcionário criado com sucesso!');
              this.router.navigate(['/employees']);
            },
            error: (err: any) => {
              console.error('Erro ao criar:', err);
              this.submitMessage = 'Falha ao criar o funcionário. Erro de comunicação com a API.';
            }
          });
        },
        error: (err) => {
          console.error('Erro ao obter lista para gerar id:', err);
          this.submitMessage = 'Falha ao gerar id para novo funcionário.';
        }
      });
    }
  }
}