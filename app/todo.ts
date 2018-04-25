export class Todo {
  id: number;
  title: string = '';
  colorDate: string = 'D'
  complete: boolean = false;
  priority: string = 'None';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}