import { Injectable } from '@angular/core';

@Injectable()
export class DropDownService {
  courses: { course: string }[] = [
    { course: 'Mobile Development' },
    { course: 'Web Development' },
    { course: 'IOS Development' },
    { course: 'Android Development' }
  ];

  getData() {
    return this.courses;
  }
  setData(obj: { course: string }) {
    this.courses.unshift(obj);
  }
  constructor() { }

}
