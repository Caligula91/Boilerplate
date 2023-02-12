const { describe, it } = require('mocha');
const request = require('supertest');
const { expect } = require('chai');
const app = require('../../app');
const { createUser } = require('../helpers/user');

describe('Get Profile', () => {
  it('GET /user/logged-user Should successfully return my profile', async () => {
    const { user, token } = await createUser();

    const res = await request(app)
      .get('/api/v1/user/logged-user')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const { results } = res.body;
    expect(results.password).to.equal(undefined);
    expect(results._id.toString()).to.equal(user._id.toString());
  });
});
