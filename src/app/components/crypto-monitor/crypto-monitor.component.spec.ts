import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoMonitorComponent } from './crypto-monitor.component';

describe('CryptoMonitorComponent', () => {
  let component: CryptoMonitorComponent;
  let fixture: ComponentFixture<CryptoMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoMonitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
