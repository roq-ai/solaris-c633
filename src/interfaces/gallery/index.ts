import { HospitalInterface } from 'interfaces/hospital';
import { GetQueryInterface } from 'interfaces';

export interface GalleryInterface {
  id?: string;
  image: string;
  caption?: string;
  hospital_id?: string;
  created_at?: any;
  updated_at?: any;

  hospital?: HospitalInterface;
  _count?: {};
}

export interface GalleryGetQueryInterface extends GetQueryInterface {
  id?: string;
  image?: string;
  caption?: string;
  hospital_id?: string;
}
