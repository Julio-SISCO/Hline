import { AbstractControl, ValidatorFn } from '@angular/forms';
export default class Validation {
  static match(controlName:string, checkControlName:string): ValidatorFn {
    return (controls: AbstractControl) => {
      let control:any = controls.get(controlName);
      let checkControl:any = controls.get(checkControlName);
      if (checkControl.errors && !checkControl.errors.matching) {
        return null;
      }
      if (control.value !== checkControl.value) {
        checkControl.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}