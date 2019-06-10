import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'textCut'})

export class TextCut implements PipeTransform {
    

    transform(value: string): string {
        if (!value) {
             return value;
        }
        return value.slice(0, 20) + '...';
    }

}
