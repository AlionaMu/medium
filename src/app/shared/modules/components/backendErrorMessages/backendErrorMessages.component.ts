import { BackendErrorsInterface } from './../../../types/backendErrors.interface';
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'mc-backend-errors-messages',
  templateUrl: './backendErrorMessages.component.html',
  styleUrls: ['./backendErrorMessages.component.scss']
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface | null = {} as BackendErrorsInterface | null

  public errorMessages: (string| null)[]  = []

  ngOnInit(): void {
    if (this.backendErrorsProps) {
    this.errorMessages = Object.keys(this.backendErrorsProps).map(
      (name: string) => {
        if (this.backendErrorsProps) {
          const messages = this.backendErrorsProps[name].join(', ')

          return `${name} ${messages}`
        } else { return null}

      }
    )}
  }
}
