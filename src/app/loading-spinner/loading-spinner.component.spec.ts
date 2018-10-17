import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinnerComponent } from './loading-spinner.component';
import { By } from '@angular/platform-browser';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create empty component', () => {
    expect(component).toBeTruthy();
    expect(component.visible).toBe(false);
    expect(fixture.debugElement.query(By.css('.spinnerContainer'))).toBeFalsy();
  });
  
  it('should create component with spinner', () => {
    component.visible = true;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.visible).toBe(true);
    expect(fixture.debugElement.query(By.css('.spinnerContainer'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.spinnerImage'))).toBeTruthy();
  });

  it('should create component with a div and an image (alternative)', () => {
    component.visible = true;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.visible).toBe(true);
    expect(fixture.nativeElement.querySelector('div')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('img')).toBeTruthy();
  });
});
