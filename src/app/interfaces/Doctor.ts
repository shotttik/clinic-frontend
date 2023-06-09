import { Category } from './Category';

export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  views: number;
  pid: string;
  image: string | null;
  document: string | null;
  category: Category;
}
