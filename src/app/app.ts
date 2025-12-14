import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', loadComponent: () => import('./employee-list/employee-list').then(m => m.EmployeeList) },
  { path: 'employees/new', loadComponent: () => import('./employees/employee-form/employee-form').then(m => m.EmployeeFormComponent) },
  { path: 'employees/:id/edit', loadComponent: () => import('./employees/employee-form/employee-form').then(m => m.EmployeeFormComponent) },
  { path: '**', redirectTo: 'employees' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
