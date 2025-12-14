export interface Employee {
  id: number;
  name: string;
  email: string; 
  role: string; 
  active: boolean;
}

export type EmployeeCreate = Omit<Employee, 'id'>;