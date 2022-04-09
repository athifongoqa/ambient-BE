/* eslint-disable no-underscore-dangle */
/* global jest, it, describe, expect */

const mockingoose = require('mockingoose');
const ShowModel = require('../../models/show.model');
const {
  getShow,
  getShows,
  createShow,
  updateShow,
  deleteShow,
} = require('../../controllers/shows');

const showInput = {
  _id: '1234567890abcdef12345678',
  creator_id: '12345678-90ab-cdef-1234-567890abcdef',
  name: 'Test Show Name',
  description: 'Test show description',
  type: 'test type',
  date_scheduled: '2020-01-01T20:00:00.000Z',
};

const showsPayload = [
  {
    _id: '1234567890abcdef12345678',
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
    _id: '987654321fedcba987654321',
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

describe('Shows routes', () => {
  it('Get single show', async () => {
    // Arrange
    const req = {
      params: {
        id: showInput._id,
      },
    };

    let response;
    let responseCode = 200;

    const reply = {
      send: jest.fn().mockImplementation((res) => {
        response = res;
      }),
      status: jest.fn().mockImplementation(function (code) {
        responseCode = code;
        return this;
      }),
    };

    mockingoose(ShowModel).toReturn(
      req.params.id === showInput._id ? showInput : undefined,
      'findOne',
    );

    // Act
    await getShow(req, reply);
    // console.log(response);

    // Assert
    expect(response).toHaveProperty('name', 'Test Show Name');
    expect(responseCode).toBe(200);
    expect(response).toBeInstanceOf(Object);
    expect(reply.send).toBeCalledTimes(1);
  });

  it('Get single show with invalid id', async () => {
    // Arrange
    const req = {
      params: {
        id: '123',
      },
    };

    let response;
    let responseCode = 200;

    const reply = {
      send: jest.fn().mockImplementation((res) => {
        response = res;
      }),
      status: jest.fn().mockImplementation(function (code) {
        responseCode = code;
        return this;
      }),
    };

    mockingoose(ShowModel).toReturn(
      req.params.id === showInput._id ? showInput : undefined,
      'findOne',
    );

    // Act
    await getShow(req, reply);
    // console.log(response);

    // Assert
    expect(response).not.toHaveProperty('name');
    expect(responseCode).toBe(404);
    expect(response).toBeInstanceOf(Object);
    expect(reply.send).toBeCalledTimes(1);
  });

  it('Get all shows', async () => {
    // Arrange
    const req = {};

    let response;

    const reply = {
      send: jest.fn().mockImplementation((res) => {
        response = res;
      }),
    };

    mockingoose(ShowModel).toReturn(showsPayload, 'find');

    // Act
    await getShows(req, reply);

    // Assert
    expect(response).toHaveLength(2);
    expect(response[0]).toHaveProperty('name', 'Test Show Name');
    expect(response[1]).toHaveProperty('name', 'Test Show Name 2');
    expect(response).toBeInstanceOf(Array);
    expect(reply.send).toBeCalledTimes(1);
  });

  it('Create a show', async () => {
    // Arrange
    const newShow = { name: showInput.name, creator_id: showInput.creator_id };

    const req = {
      body: newShow,
    };

    let responseCode;
    let response;

    const reply = {
      code: jest.fn().mockImplementation(function (code) {
        responseCode = code;
        return this;
      }),
      send: jest.fn().mockImplementation((res) => {
        response = res;
      }),
    };

    mockingoose(ShowModel).toReturn(showInput, 'save');

    // Act
    await createShow(req, reply);

    // Assert
    expect(responseCode).toBe(201);
    expect(response).toHaveProperty('name', 'Test Show Name');
    expect(response).toBeInstanceOf(Object);
    expect(reply.send).toBeCalledTimes(1);
  });

  it('Update a show', async () => {
    // Arrange
    const req = {
      params: {
        id: showInput._id,
      },
      body: { name: 'Test Show Name Updated' },
    };

    let response;

    const reply = {
      send: jest.fn().mockImplementation((res) => {
        response = {
          name: req.body.name,
          ...res,
        };
      }),
    };

    mockingoose(ShowModel).toReturn(showInput, 'findOneAndUpdate');

    // Act
    await updateShow(req, reply);

    // Assert
    expect(response).toHaveProperty('name', 'Test Show Name Updated');
    expect(response).toBeInstanceOf(Object);
    expect(reply.send).toBeCalledTimes(1);
  });

  it('Delete a show', async () => {
    // Arrange
    const req = {
      params: {
        id: showInput._id,
      },
    };

    let response;

    const reply = {
      send: jest.fn().mockImplementation((res) => {
        response = res;
      }),
    };

    mockingoose(ShowModel).toReturn(showInput, 'findOneAndRemove');

    // Act
    await deleteShow(req, reply);

    // Assert
    expect(response).toHaveProperty('message', 'Show deleted');
    expect(response).toBeInstanceOf(Object);
    expect(reply.send).toBeCalledTimes(1);
  });
});
