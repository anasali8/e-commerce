import { Injectable } from '@angular/core';
import { BlobOptions } from 'buffer';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationServiceService {

  constructor(private confirmationService: ConfirmationService) { }

  confirm(message: string) : Promise<boolean>{
    return new Promise((resolve, reject)=>{
      this.confirmationService.confirm({
        message: message,
        header:'Are you sure to leave?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel:'Yes',
        rejectLabel:'No',
        accept: () => {
          resolve (true);
        },
        reject: () => {
          resolve (false);
        }
      });
    });
  }

}



