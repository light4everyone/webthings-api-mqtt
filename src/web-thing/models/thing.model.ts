import Property from './property.model';

interface Thing {
  type: string[];
  title: string;
  name: string;
  description?: string;
  properties: { [name: string]: Property };
}

export default Thing;
