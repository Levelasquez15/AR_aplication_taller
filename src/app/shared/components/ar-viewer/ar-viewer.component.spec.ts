import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ArViewerComponent } from './ar-viewer.component';

describe('ArViewerComponent', () => {
  let component: ArViewerComponent;
  let fixture: ComponentFixture<ArViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArViewerComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
