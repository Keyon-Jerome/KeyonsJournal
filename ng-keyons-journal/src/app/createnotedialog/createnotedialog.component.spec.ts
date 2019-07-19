import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenotedialogComponent } from './createnotedialog.component';

describe('CreatenotedialogComponent', () => {
  let component: CreatenotedialogComponent;
  let fixture: ComponentFixture<CreatenotedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatenotedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenotedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
