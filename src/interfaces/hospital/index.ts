import { BlogInterface } from 'interfaces/blog';
import { GalleryInterface } from 'interfaces/gallery';
import { SocialMediaInterface } from 'interfaces/social-media';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface HospitalInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  blog?: BlogInterface[];
  gallery?: GalleryInterface[];
  social_media?: SocialMediaInterface[];
  user?: UserInterface;
  _count?: {
    blog?: number;
    gallery?: number;
    social_media?: number;
  };
}

export interface HospitalGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
