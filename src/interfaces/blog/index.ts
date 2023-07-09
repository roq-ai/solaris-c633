import { HospitalInterface } from 'interfaces/hospital';
import { GetQueryInterface } from 'interfaces';

export interface BlogInterface {
  id?: string;
  title: string;
  content: string;
  hospital_id?: string;
  created_at?: any;
  updated_at?: any;

  hospital?: HospitalInterface;
  _count?: {};
}

export interface BlogGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  hospital_id?: string;
}
