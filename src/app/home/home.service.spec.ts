//https://blog.angulartraining.com/how-to-write-unit-tests-for-angular-code-that-uses-the-httpclient-429fa782eb15
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { config } from '../configs/config';
import { StudentFilter, StudentsList } from './home.model';
import { HomeService } from './home.service';

describe('HomeService', () => {
    const mockResponse = {
        "page": 1,
        "length": 32,
        "pageSize": 10,
        "data": [
            {
                "id": 1,
                "name": "Student Name 1",
                "citizenNumber": "1234",
                "nationality": "pt",
                "contacts": "9122222",
                "responsible": "asasas",
                "musicality": 0,
                "comments": "x y z",
                "cluster": "Figueira da Foz Adultos"
            },
            {
                "id": 2,
                "name": "Student Name 2",
                "citizenNumber": "citizen_card_2",
                "nationality": "Portugal",
                "contacts": "contacts2",
                "responsible": "",
                "musicality": 1,
                "comments": "comments 2",
                "cluster": "Coimbra: Adultos"
            }
        ]
    };

    let injector: TestBed;
    let httpClient: HttpClient;

    let httpMock: HttpTestingController;
    let homeService: HomeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HomeService
            ]
        });

        // Inject the http service and test controller for each test
        injector = getTestBed();
        // httpClient = TestBed.get(HttpClient);
        httpMock = TestBed.get(HttpTestingController);
        homeService = TestBed.get(HomeService);
    });

    afterEach(() => {
        httpMock.verify();
    });

    // xit('should return an Observable<StudentsList>', inject([HomeService, XHRBackend], (homeService, mockBackend) => {


    //     mockBackend.connections.subscribe((connection) => {
    //         connection.mockRespond(new Response(new ResponseOptions({
    //             body: JSON.stringify(mockResponse)
    //           })));
    //     });
    //     const filter = new StudentFilter();
    //     filter.cluster = 1;
    //     filter.page = 1
    //     filter.pageSize = 10;

    //     homeService.getStudents(filter).subscribe((data) => {
    //         console.log('>>>DATA', data);
    //         expect(data).toBe(false);
    //     });
    //     // const req = httpMock.expectOne(`http://replace.with.api/anything/1`, 'call to api');
    //     // expect(req.request.method).toBe('GET');
    // }));


    it('should not immediately connect to the server', () => {
        httpMock.expectNone({});
    });

    it('should return an Observable<StudentsList>', () => {
        const filter = new StudentFilter();
        filter.cluster = 1;
        filter.page = 1
        filter.pageSize = 10;

        let studentsList = mockResponse;
        // call the service
        homeService.getStudents(filter).subscribe((data) => {
            expect(data).toBe(mockResponse);
        });

        // set the expectations for the HttpClient mock
        const req = httpMock.expectOne(`${config.serverUrl}/students?cluster=1&length=0&musicality&page=1&pageSize=10`);

        expect(req.request.method).toBe("GET");
        expect(req.cancelled).toBeFalsy();
        expect(req.request.responseType).toEqual('json');

        // set the fake data to be returned by the mock
        req.flush(mockResponse);
    });

    //inject an instance of the HttpTestingController in our test
    it('should return an Observable<StudentsList> method 2', inject(
        [HttpTestingController, HomeService],
        (httpMock: HttpTestingController, service: HomeService) => {

            service.getStudents(new StudentFilter()).subscribe((data: StudentsList) => {
                expect(data).toEqual(mockResponse);
            });

            const req = httpMock.expectOne(`${config.serverUrl}/students?cluster=1&length=0&musicality&page=0&pageSize=0`);

            expect(req.request.method).toBe("GET");
            expect(req.cancelled).toBeFalsy();
            expect(req.request.responseType).toEqual('json');

            req.flush(mockResponse);
        }));
});