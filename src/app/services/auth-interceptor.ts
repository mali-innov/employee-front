import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const storage: any | null = sessionStorage.getItem('TOKEN');
        const accessToken = JSON.parse(storage);
        let authReq = req;
        if (accessToken !== null) {
            authReq = authReq.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
        }

        return next.handle(authReq);
    }
}
