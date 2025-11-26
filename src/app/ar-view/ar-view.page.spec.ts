import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ArViewPage } from './ar-view.page';
import { ArTargetService } from '../services/ar-target.service';

describe('ArViewPage', () => {
  let component: ArViewPage;
  let fixture: ComponentFixture<ArViewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArViewPage],
      imports: [IonicModule.forRoot()],
      providers: [ArTargetService]
    }).compileComponents();

    fixture = TestBed.createComponent(ArViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
