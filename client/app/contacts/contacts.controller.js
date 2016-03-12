'use strict';
(function(){

class ContactsComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('stayInTouchApp')
  .component('contacts', {
    templateUrl: 'app/contacts/contacts.html',
    controller: ContactsComponent
  });

})();
