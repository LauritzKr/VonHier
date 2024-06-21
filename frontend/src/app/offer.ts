import { SafeUrl } from '@angular/platform-browser';

export interface Offer {
  id: string;
  title: string;
  description: string;
  userId: string;
  type: string;
  image: SafeUrl;
  active: boolean;
  views: number;
}
