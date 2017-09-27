import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DropDownService } from './services/drop-down.service';
import { IPersonModel } from './interface/person-model';
import { InputDataService } from './services/input-data.service';
// FormBuilder imported from anuglar/forms
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DropDownService, InputDataService]
})
export class AppComponent implements OnInit {
  courseForm: FormGroup;
  personDetail: IPersonModel;
  dropDownArr = [];
  selectedOption = null;
  personsList: IPersonModel[] = [];


  constructor(public dropdown: DropDownService, public fieldData: InputDataService, private fb: FormBuilder) {
  }
  onSubmit(): void {
    // adds the user submited data to personDetail object
    this.personDetail.chosenCourse = this.selectedOption;
    this.personDetail.name = this.courseForm.value.username;
    this.personDetail.email = this.courseForm.value.email;
    this.personDetail.address = this.courseForm.value.address;
    this.fieldData.setPersonData({ ...this.personDetail });
    this.personsList.push({ ...this.personDetail });
    console.log({ ...this.personDetail });
    console.log(this.courseForm);
    this.courseForm.reset();
    console.log(this.personsList);
  }


  // resets the form on clicking the reset button
  resetForm(): void {
    this.courseForm.reset();
  }
  // sets the dropdownlist values on intialization
  ngOnInit() {
    // form controls validation specicified in the class for the Reactive Forms
    this.courseForm = this.fb.group({
      // custom validator added to formcontrol
      username: [null, [Validators.required, this.threeNumbers, Validators.maxLength(3)]],
      email: [null, [Validators.required, Validators.pattern('([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})')]],
      address: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      select: [null, [Validators.required]]
    });
    this.dropDownArr = this.dropdown.getData();
    // this.personDetail = {
    //   name: '',
    //   email: '',
    //   address: '',
    //   chosenCourse: ''
    // };
    this.personDetail = this.fieldData.getPersonData();
    console.log(this.courseForm);
  }

  // threeNumbers(control: FormControl) {
  //   if (control.value && /[0-9][0-9][0-9]/.test(control.value) && control.value.length < 3) {
  //     return { 'greater than 3 numbers': true };
  //   }
  //   return null;
  // }

  // custom validator which makes input valid only if the user enters 3 digit numbers only
  threeNumbers(control: FormControl) {
    if (control.value && /^\d+$/.test(control.value) && control.value.length === 3) {
      return null;
    }
    return { 'error': true };
  }
}
