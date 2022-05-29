import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { TableListComponent } from './table-list.component';

describe('TableListComponent', () => {
  let component: TableListComponent<{ id: string }>;
  let fixture: ComponentFixture<TableListComponent<{ id: string }>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListComponent ],
      imports: [
        MatTableModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
