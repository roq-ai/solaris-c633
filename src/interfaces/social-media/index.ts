import { HospitalInterface } from 'interfaces/hospital';
import { GetQueryInterface } from 'interfaces';

export interface SocialMediaInterface {
  id?: string;
  platform: string;
  link: string;
  hospital_id?: string;
  created_at?: any;
  updated_at?: any;

  hospital?: HospitalInterface;
  _count?: {};
}

export interface SocialMediaGetQueryInterface extends GetQueryInterface {
  id?: string;
  platform?: string;
  link?: string;
  hospital_id?: string;
}
