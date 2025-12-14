import { Component } from '@angular/core';
import { EmployeeFormComponent } from '../employees/employee-form/employee-form';

@Component({
  selector: 'app-employee-new',
  standalone: true,
  imports: [EmployeeFormComponent],
  templateUrl: './employee-new.html',
  styleUrls: ['./employee-new.css'],
})
export class EmployeeNew {}
