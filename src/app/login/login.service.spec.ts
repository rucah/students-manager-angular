import { TestBed, inject, flush } from "@angular/core/testing";
import { LoginService } from "./login.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { config } from "../configs/config";

fdescribe('LoginService', () => {
    fdescribe('With TestBed option', () => {
        let loginSvc: LoginService;
        let httpTestingController: HttpTestingController;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ HttpClientTestingModule ],
                providers: [
                    LoginService,
                ]
            });

            httpTestingController = TestBed.get(HttpTestingController);
            loginSvc = TestBed.get(LoginService);
        });

        afterEach(() => {
            // Guarantees thar we only get exactly what is expected
            httpTestingController.verify();
        });
       
        it('should not immediately connect to the server', () => {
            httpTestingController.expectNone(`${config.serverUrl}/login/user/pass`);
        });
    
        it('should call login service with', () => {
            const mockResponse = { "login":true,"username":"user","password":"pass" };
            loginSvc.login('user', 'pass').subscribe((data) => {
                expect(data).toEqual(mockResponse);
            });

            const req = httpTestingController.expectOne(`${config.serverUrl}/login/user/pass`);
            // Tells what send back
            req.flush(mockResponse);
        });
    });

    fdescribe('With inject option', () => {
        beforeEach(() => {
            // Shallow integration
            TestBed.configureTestingModule({
                imports: [ HttpClientTestingModule ],
                providers: [
                    LoginService,
                ]
            });
        });

        it('should call login service', 
            inject([LoginService, HttpTestingController], (loginSvc: LoginService, httpTestingController: HttpTestingController) => {

            const mockResponse = { "login":true,"username":"user","password":"pass" };
            loginSvc.login('user', 'pass').subscribe((data) => {
                expect(data).toEqual(mockResponse);
            });

            const req = httpTestingController.expectOne(`${config.serverUrl}/login/user/pass`);
            // Tells what send back
            req.flush(mockResponse);// Guarantees thar we only get exactly what is expected
            httpTestingController.verify();
        }));
    });
});