'use strict';
(function(){

  class ContactsComponent {
    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.contacts = [];
      this.expanded = [];
      this.datepicker = {
        open: false
      };
      this.statusLabels = {
        "Unknown": "label-default",
        "Alright": "label-success",
        "Not Ideal": "label-warning",
        "Warning": "label-danger"
      };

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
      if (contact.newInteraction) {
        this.$http.post('/api/contacts/' + contact._id + '/interactions', {
          note: contact.newInteraction.note,
          date: contact.newInteraction.date
        });
        contact.newInteraction = {};
      }
    }

    deleteInteraction(contact, interaction) {
      this.$http.delete('/api/contacts/' + contact._id + '/interactions/' + interaction._id);
    }

    toggleExpanded(contact) {
      if (this.expanded.includes(contact._id)) {
        this.expanded.splice(this.expanded.indexOf(contact._id), 1);
      } else {
        this.expanded.push(contact._id);
      }
    }

    daysSinceLastInteraction(contact) {
      if (contact.interactions.length>0) {
        let date = new Date(contact.interactions[contact.interactions.length-1].date);
        let today = new Date();
        return (today-date)/1000/60/60/24;
      }
    }

    getStatus(contact) {
      if (contact.interactions.length>0) {
        let dayDiff = this.daysSinceLastInteraction(contact);
        if (dayDiff<contact.idealContactFrequency){
          return "Alright";
        } else if (dayDiff<contact.minimumContactFrequency){
          return "Not Ideal";
        } else {
          return "Warning";
        }
      } else {
      return "Unknown"
      }
    }

  }


angular.module('stayInTouchApp')
.component('contacts', {
  templateUrl: 'app/contacts/contacts.html',
  controller: ContactsComponent
});

})();
