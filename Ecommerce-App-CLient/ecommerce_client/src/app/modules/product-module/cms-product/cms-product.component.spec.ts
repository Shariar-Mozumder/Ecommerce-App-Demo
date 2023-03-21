import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsProductComponent } from './cms-product.component';

describe('CmsProductComponent', () => {
  let component: CmsProductComponent;
  let fixture: ComponentFixture<CmsProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
