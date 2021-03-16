import * as firebase from 'firebase';
import config from '../firebase.json';
import 'firebase/firestore';

const app = firebase.initializeApp(config);

const Auth = app.auth();

export const signin = async ({ email, password }) => {
  const { user } = await Auth.signInWithEmailAndPassword(email, password);
  return user;
};

const uploadImage = async uri => {
  if (uri.startsWith('https')) {
    return uri;
  }

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const user = Auth.currentUser;
  const ref = app.storage().ref(`/profile/${user.uid}/photo.png`);
  const snapshot = await ref.put(blob, { contentType: 'image/png' });
  blob.close();

  return await snapshot.ref.getDownloadURL();
};

export const signup = async ({ name, email, password, photo }) => {
  const { user } = await Auth.createUserWithEmailAndPassword(email, password);
  const photoURL = await uploadImage(photo);
  await user.updateProfile({ displayName: name, photoURL });
  return user;
};

export const getCurrentUser = () => {
  const { uid, displayName, email, photoURL } = Auth.currentUser;
  return { uid, name: displayName, email, photo: photoURL };
};

export const updateUserInfo = async photo => {
  const photoURL = await uploadImage(photo);
  Auth.currentUser.updateProfile({ photoURL });
  return photoURL;
};

export const signout = async () => {
  await Auth.signOut();
  return {};
};

export const DB = firebase.firestore();

export const createChannel = async ({ title, desc }) => {
  const newChannelRef = DB.collection('channels').doc();
  const id = newChannelRef.id;
  const newChannel = {
    id,
    title,
    description: desc,
    createdAt: Date.now(),
  };
  await newChannelRef.set(newChannel);
  return id;
};

export const createMessage = async ({ channelId, message }) => {
  return await DB.collection('channels')
    .doc(channelId)
    .collection('messages')
    .doc(message._id)
    .set({
      ...message,
      createdAt: Date.now(),
    });
};
