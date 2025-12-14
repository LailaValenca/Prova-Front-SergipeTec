import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css'],
})
export class EmployeeList implements OnInit {
  private employeeService = inject(EmployeeService);
  private cdr = inject(ChangeDetectorRef);
  
  employees: Employee[] = []; //
  searchQuery: string = ''; //
  loading: boolean = false; //
  errorMessage: string = ''; //
  debugMessages: string[] = [];
  showTable: boolean = true;

  ngOnInit(): void {
    this.loadEmployees(); //
  }

  loadEmployees(): void {
    this.loading = true; //
    this.errorMessage = ''; //
    
    // Timeout de fallback para casos de API lenta
    const fallback = setTimeout(() => {
      if (this.loading) {
        console.error('[EmployeeList] loadEmployees timeout — no response');
        this.errorMessage = 'Tempo esgotado ao carregar funcionários. Tente novamente.';
        this.loading = false;
      }
    }, 6000);

    this.employeeService.listAll().subscribe({
      next: (data) => {
        this.addDebug('[EmployeeList] received ' + (data?.length ?? 0) + ' employees');
        this.showTable = false;
        setTimeout(() => {
          this.employees = data;
          this.loading = false;
          try { this.addDebug('[EmployeeList] employees JSON: ' + JSON.stringify(this.employees.slice(0,10))); } catch(e){}
          this.addDebug('[EmployeeList] state: loading=' + this.loading + ', employees=' + this.employees.length);
          this.showTable = true;
          clearTimeout(fallback);
          try { this.cdr.detectChanges(); } catch(e) {}
        }, 0);
      },
      error: (err) => {
        this.addDebug('[EmployeeList] error loading employees: ' + (err?.message ?? err));
        this.errorMessage = 'Erro ao carregar lista de funcionários. Verifique a conexão com o servidor.';
        this.loading = false;
        this.addDebug('[EmployeeList] state: loading=' + this.loading + ', employees=' + this.employees.length);
        clearTimeout(fallback); //
        try { this.cdr.detectChanges(); } catch(e) {}
      }
    });
  }

  onSearch(): void {
    const trimmedQuery = this.searchQuery.trim();
    this.addDebug('[EmployeeList] onSearch() query=' + trimmedQuery);
    const fallbackSearch = setTimeout(() => {
      if (this.loading) {
        console.error('[EmployeeList] search timeout — no response');
        this.errorMessage = 'Tempo esgotado na busca. Verifique sua conexão.';
        this.loading = false;
      }
    }, 6000);
    if (!trimmedQuery) {
      this.loadEmployees(); // Recarrega a lista completa se a busca estiver vazia
      return;
    }
    
    this.loading = true; //
    this.errorMessage = ''; //
    this.employeeService.search(trimmedQuery).subscribe({
      next: (data) => {
        this.addDebug('[EmployeeList] search received ' + (data?.length ?? 0) + ' results');
        if (Array.isArray(data) && data.length > 0) {
          this.showTable = false;
          setTimeout(() => {
            this.employees = data;
            this.loading = false;
            try { this.addDebug('[EmployeeList] employees JSON: ' + JSON.stringify(this.employees.slice(0,10))); } catch(e){}
            this.addDebug('[EmployeeList] state: loading=' + this.loading + ', employees=' + this.employees.length);
            this.showTable = true;
            clearTimeout(fallbackSearch);
            try { this.cdr.detectChanges(); } catch(e) {}
          }, 0);
        } else {
          this.addDebug('[EmployeeList] service returned no results, showing empty list');
          this.showTable = false;
          setTimeout(() => {
            this.employees = [];
            this.loading = false;
            this.addDebug('[EmployeeList] state: loading=' + this.loading + ', employees=' + this.employees.length);
            this.showTable = true;
            clearTimeout(fallbackSearch);
            try { this.cdr.detectChanges(); } catch(e) {}
          }, 0);
        }
      },
      error: (err) => {
        this.addDebug('[EmployeeList] search error: ' + (err?.message ?? err));
        this.errorMessage = 'Erro ao buscar funcionários. Tente refinar sua pesquisa.';
        this.loading = false;
        this.addDebug('[EmployeeList] state: loading=' + this.loading + ', employees=' + this.employees.length);
        clearTimeout(fallbackSearch);
        try { this.cdr.detectChanges(); } catch(e) {}
      }
    });
  }
  

  private addDebug(msg: string) {
    try {
      this.debugMessages.unshift(new Date().toLocaleTimeString() + ' - ' + msg);
      if (this.debugMessages.length > 20) this.debugMessages.pop();
      console.log(msg);
    } catch (e) {
      // no-op
    }
  }
  /**
   * Limpa a busca e recarrega a lista completa.
   */
  clearSearch(): void {
    if (this.searchQuery !== '') {
        this.searchQuery = '';
        this.loadEmployees();
    }
  }

  deleteEmployee(id: number): void {
    if (confirm('Tem certeza que deseja deletar este funcionário?')) {
      this.addDebug('[EmployeeList] deleteEmployee() id=' + id);
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.addDebug('[EmployeeList] deleteEmployee() success, reloading list');
          // Atualiza estado local imediatamente e recarrega do backend para garantir
          this.employees = this.employees.filter(e => e.id !== id);
          this.showTable = false;
          setTimeout(() => {
            this.showTable = true;
            this.loadEmployees();
            try { this.cdr.detectChanges(); } catch(e) {}
          }, 10);
        },
        error: (err) => {
          this.addDebug('[EmployeeList] deleteEmployee() error: ' + (err?.message ?? err));
          console.error('Erro ao deletar:', err);
          this.errorMessage = 'Erro ao deletar funcionário. O recurso pode já ter sido removido.';
        }
      });
    }
  }
}