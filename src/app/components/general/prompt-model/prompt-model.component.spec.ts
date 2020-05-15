import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptModelComponent } from './prompt-model.component';

describe('PromptModelComponent', () => {
  let component: PromptModelComponent;
  let fixture: ComponentFixture<PromptModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromptModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromptModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
