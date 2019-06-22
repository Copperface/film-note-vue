export default class LocalStorageHelper {
  constructor(name) {
    this.name = name;
  }

  //получение информации из LocalStorage
  getData() {
    return JSON.parse(localStorage.getItem(this.name)) || [];
  }

  //запись информации в LocalStorage
  setData(data) {
    localStorage.setItem(this.name, JSON.stringify(data));
  }
}
