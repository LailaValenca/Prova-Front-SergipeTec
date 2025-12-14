import { Routes } from '@angular/router';
import { EmployeeList } from './employee-list/employee-list';
import { EmployeeNew } from './employee-new/employee-new';
import { EmployeeEdit } from './employee-edit/employee-edit';

export const routes: Routes = [
  { path: 'employees', component: EmployeeList },
  { path: 'employees/new', component: EmployeeNew },
  { path: 'employees/edit/:id', component: EmployeeEdit },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
];