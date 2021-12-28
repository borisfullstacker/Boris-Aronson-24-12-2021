import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private toastr: ToastrService) { }


  toastSuccess(msg?:string,title?:string ){
    if(!msg) msg ='success'
    this.toastr.success(msg,title);
    
  }
  toastError(msg?:string,title?:string){
    if(!title) title = 'Error'
    if(!msg) msg = 'Something went wrong please try later'
    this.toastr.error(msg,title);

  }
}
