import { Department } from "./Department";
export interface Student {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: boolean;
  dayOfBirth: Date;
  departmentId: number;
  isActive: boolean;
  isDelete: boolean;
  department: Department;
}
