export default class UserInfo{

  constructor({nameSelector, descriptionSelector, avatarSelector}){

    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo(){

    return {name:this._name.textContent, description:this._description.textContent}
  }

  setFullUserInfo({name, about, avatar}){

    this._name.textContent = name;
    this._description.textContent = about;
    this._avatar.src = avatar;
  }

  setTextUserInfo({name, about}){

    this._name.textContent = name;
    this._description.textContent = about;
  }

  setAvatar(avatar){

    this._avatar.src = avatar;
  }

}
