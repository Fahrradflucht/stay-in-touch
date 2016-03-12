'use strict';

var app = require('../..');
import request from 'supertest';

var newContact;

describe('Contact API:', function() {

  describe('GET /api/contacts', function() {
    var contacts;

    beforeEach(function(done) {
      request(app)
        .get('/api/contacts')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          contacts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      contacts.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/contacts', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/contacts')
        .send({
          name: 'New Contact',
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newContact = res.body;
          done();
        });
    });

    it('should respond with the newly created contact', function() {
      newContact.name.should.equal('New Contact');
    });

  });

  describe('GET /api/contacts/:id', function() {
    var contact;

    beforeEach(function(done) {
      request(app)
        .get('/api/contacts/' + newContact._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          contact = res.body;
          done();
        });
    });

    afterEach(function() {
      contact = {};
    });

    it('should respond with the requested contact', function() {
      contact.name.should.equal('New Contact');
    });

  });

  describe('PUT /api/contacts/:id', function() {
    var updatedContact;

    beforeEach(function(done) {
      request(app)
        .put('/api/contacts/' + newContact._id)
        .send({
          name: 'Updated Contact',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedContact = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedContact = {};
    });

    it('should respond with the updated contact', function() {
      updatedContact.name.should.equal('Updated Contact');
    });

  });

  describe('DELETE /api/contacts/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/contacts/' + newContact._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when contact does not exist', function(done) {
      request(app)
        .delete('/api/contacts/' + newContact._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
