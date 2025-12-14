import { Component, OnInit, inject } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router'; 
import { EmployeeFormComponent } from '../employees/employee-form/employee-form'; 

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [EmployeeFormComponent],
  templateUrl: './employee-edit.html',
  styleUrls: ['./employee-edit.css'],
})
// Implemente OnInit
export class EmployeeEdit implements OnInit {
  private route = inject(ActivatedRoute);
  
  employeeId: number | null = null; 

  ngOnInit(): void {
    // Captura o ID do parâmetro 'id' da URL
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString) {
        this.employeeId = +idString; // Converte a string para número
        console.log(`[EmployeeEdit] ID do funcionário para edição: ${this.employeeId}`);
      
      }
    });
  }
}