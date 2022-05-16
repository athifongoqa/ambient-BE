const showInput = {
  creator_id: '1234567890abcdef12345678',
  name: 'Test Show Name',
  description: 'Test show description',
  date_created: '2020-01-01T20:00:00.000Z',
  date_scheduled: '2020-01-01T20:00:00.000Z',
};

const showsPayload = [
  {
    _id: '1234567890abcdef01234567',
    creator_id: '1234567890abcdef12345678',
    name: 'Test Show Name',
    description: 'Test show description',
    type: 'test type',
    date_created: '2020-01-01T20:00:00.000Z',
    date_scheduled: '2020-01-01T20:00:00.000Z',
    date_ended: '2020-01-01T21:00:00.000Z',
    participants_id: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
  },
  {
    _id: 'fedcba0987654321fedcba09',
    creator_id: '1234567890abcdef12345678',
    name: 'Test Show Name 2',
    description: 'Test show description 2',
    type: 'test type 2',
    date_created: '2020-01-01T20:00:00.000Z',
    date_scheduled: '2020-02-02T20:00:00.000Z',
    date_ended: '2020-02-02T22:00:00.000Z',
    participants_id: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
  },
];

const adminUser = {
  username: 'athi',
  displayName: 'Athi',
  email: 'dummy12.dummy@code.berlin',
  avatar: 'img.ip/464558.jpg',
};

module.exports = {
  showInput,
  showsPayload,
  adminUser,
};
