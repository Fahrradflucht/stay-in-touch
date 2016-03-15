'use strict';
(function(){

  class ContactsComponent {
    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.contacts = [];

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('contact');
      });

    }

    $onInit() {
      this.$http.get('/api/contacts').then(response => {
        this.contacts = response.data;
        this.socket.syncUpdates('contact', this.contacts);

      });
    }

    addContact() {
      if (this.newContact) {
        this.$http.post('/api/contacts', {
          name: this.newContact.name,
          idealContactFrequency: this.newContact.idealContactFrequency,
          minimumContactFrequency: this.newContact.minimumContactFrequency
        });
        this.newContact = {};
      }
    }

    deleteContact(contact) {
      this.$http.delete('/api/contacts/' + contact._id);
    }

    addInteraction(contact) {
      if (this.newInteraction) {
        this.$http.post('/api/contacts/' + contact._id + '/interactions', {
          note: this.newInteraction.note,
          date: Date.now()
        });
        this.newInteraction = {};
      }
    }

    deleteInteraction(contact, interaction) {
      this.$http.delete('/api/contacts/' + contact._id + '/interactions/' + interaction._id);
    }
  }


angular.module('stayInTouchApp')
.component('contacts', {
  templateUrl: 'app/contacts/contacts.html',
  controller: ContactsComponent
});

})();
