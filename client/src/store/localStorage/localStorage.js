// localStorage is used for now as user authentication and backend database 
// are in development

export default class LocalStorage {
  constructor() {
    if (!window.localStorage) return;

    this.byId = JSON.parse(localStorage.getItem('byId'));
    this.byTag = JSON.parse(localStorage.getItem('byTag'));
    this.allIds = JSON.parse(localStorage.getItem('allIds'));
  }

  setById(byId) {
    localStorage.setItem('byId', JSON.stringify(byId));
  }

  setByTag(byTag) {
    localStorage.setItem('byTag', JSON.stringify(byTag));
  }

  setAllIds(allIds) {
    localStorage.setItem('allIds', JSON.stringify(allIds));
  }
};