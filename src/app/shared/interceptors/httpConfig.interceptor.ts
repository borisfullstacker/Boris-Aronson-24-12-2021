import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError, finalize } from "rxjs/operators";
import { StateStoreService } from "../services/state-store.service";
import { ModalService } from "../services/modal-service.service";


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(private appState:StateStoreService, private modalService:ModalService) { }
  
  
    intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
        this.appState.loaderEmitter.next(true)



        return next.handle(request).pipe(
            finalize(() => {
               this.appState.loaderEmitter.next(false)
            }),
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if(event.status === 200 && event.body !== null){
                        //do stuff
                    }else{
                        this.modalService.toastError()
                    }
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                this.modalService.toastError()
                return throwError(error);
            })
        );
    }
}
