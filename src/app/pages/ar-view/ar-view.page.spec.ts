import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../shared/components/components.module';
import { ArTargetService } from '../../services/ar-target.service';
import { ArViewPage } from './ar-view.page';

describe('ArViewPage', () => {
  let component: ArViewPage;
  let fixture: ComponentFixture<ArViewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArViewPage],
      imports: [IonicModule.forRoot(), ComponentsModule],
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
