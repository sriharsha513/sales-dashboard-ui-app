import { TestBed } from '@angular/core/testing';

import { EventPipelineService } from './event-pipeline.service';

describe('EventPipelineService', () => {
  let service: EventPipelineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventPipelineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
