const avatars = [
  "https://t4.ftcdn.net/jpg/04/44/09/95/360_F_444099592_Ah2dYbsDIIuN7u9Uj9yR1ew19aBkJQYU.jpg", 
  "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png", 
  "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png",
  "https://static.vecteezy.com/system/resources/previews/004/842/368/original/hipster-fox-avatar-vector.jpg",
  "https://w7.pngwing.com/pngs/867/134/png-transparent-giant-panda-dog-cat-avatar-fox-animal-tag-mammal-animals-carnivoran-thumbnail.png",
  "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Cat-512.png",
  "https://icons.iconarchive.com/icons/iconarchive/incognito-animals/512/Bird-Twitter-Avatar-icon.png",
  "https://wp-glogin.com/wp-content/uploads/2021/07/Google-Profile-Avatars-for-WordPress-05-768x513.jpg",
  "https://ghk.h-cdn.co/assets/18/01/980x490/landscape-1515012538-alexa-commands-13-entertain-cat.jpg",
  "https://t3.ftcdn.net/jpg/06/82/92/94/360_F_682929481_y4bDRl116dIrpohhuvX45h5ibCBTRf2o.jpg"
];

export const generateAvatar = () => {

  let randomAvatarIndex = Math.ceil(Math.random()*avatars.length-1);

  if(randomAvatarIndex<=0) randomAvatarIndex =0;

  return avatars[randomAvatarIndex];

}


