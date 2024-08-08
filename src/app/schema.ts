import { DBConfig } from "ngx-indexed-db";
import { E_IndexDb_Resource } from "../enums";

export const dbSchema: DBConfig = {
  name: 'PortalDb',
  version: 1,
  objectStoresMeta: [
    {
      store: E_IndexDb_Resource.PRACTITIONER_APPOINTMENTS,
      storeConfig: { keyPath: 'practitioner_id', autoIncrement: true },
      storeSchema: [
        { name: 'appointments', keypath: 'appointments', options: { unique: false } },
        { name: 'practitioner_id', keypath: 'practitioner_id', options: { unique: true } }
      ]
    },
  ],
};
