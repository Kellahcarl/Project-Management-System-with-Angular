import { TestBed } from '@angular/core/testing';

import { ProjectAPIService } from './project-api.service';

describe('ProjectAPIService', () => {
  let service: ProjectAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
