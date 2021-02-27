import { ContactTypeEnum } from '../enum/contact-type.enum';

export interface Contact {
  id: string;
  type: ContactTypeEnum;
  value: string;
}
