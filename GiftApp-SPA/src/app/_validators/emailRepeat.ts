
import { Directive, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

function emailRepeatCheckValidator(emailList: string[]) {
    return (c: FormControl) => {
        const email = c.value;
        for (let i = 0; i <  emailList.length; i++) {
            if (email === emailList[i]) {
                return {
                    EmailRepeatCheck: email
                };
            }
        }
        return null;
    }
  }

@Directive({
    selector: '[appEmailRepeatCheck][ngModel]]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => EmailRepeatDirective),
        multi: true
    }
    ]
})

export class EmailRepeatDirective implements OnInit {

    @Input() emailList: string[];

    validator: Function;

    ngOnInit(): void {
        this.validator = emailRepeatCheckValidator(this.emailList);
    }
    validate(c: FormControl) {
        return this.validator(c);
    }

}

