import { TestBed } from '@angular/core/testing';

import { NoteCreationService } from './note-creation.service';

describe('NoteCreationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoteCreationService = TestBed.get(NoteCreationService);
    expect(service).toBeTruthy();
  });
});
