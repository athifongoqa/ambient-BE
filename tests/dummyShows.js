const showInput = {
  creator_id: '12345678-90ab-cdef-1234-567890abcdef',
  name: 'Test Show Name',
  description: 'Test show description',
  date_created: '2020-01-01T20:00:00.000Z',
  date_scheduled: '2020-01-01T20:00:00.000Z',
};

const showsPayload = [
  {
    creator_id: '12345678-90ab-cdef-1234-567890abcdef',
    name: 'Test Show Name',
    description: 'Test show description',
    type: 'test type',
    date_created: '2020-01-01T20:00:00.000Z',
    date_scheduled: '2020-01-01T20:00:00.000Z',
    date_ended: '2020-01-01T21:00:00.000Z',
    participants_id: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
  },
  {
    creator_id: 'fedcba98-7654-3210-fedc-ba9876543210',
    name: 'Test Show Name 2',
    description: 'Test show description 2',
    type: 'test type 2',
    date_created: '2020-01-01T20:00:00.000Z',
    date_scheduled: '2020-02-02T20:00:00.000Z',
    date_ended: '2020-02-02T22:00:00.000Z',
    participants_id: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
  },
];

module.exports = {
  showInput,
  showsPayload,
};
