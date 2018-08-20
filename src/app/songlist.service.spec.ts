import { TestBed, inject } from '@angular/core/testing';

import { SonglistService } from './songlist.service';

describe('SonglistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SonglistService]
    });
  });

  it('should be created', inject([SonglistService], (service: SonglistService) => {
    expect(service).toBeTruthy();
  }));
});
