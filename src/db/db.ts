import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyC8Iz7G61-mWevUOUK1hSnsAoJTfLetbSw',
  authDomain: 'personal-web-26017.firebaseapp.com',
  projectId: 'personal-web-26017',
  storageBucket: 'personal-web-26017.appspot.com',
  messagingSenderId: '1044326542003',
  appId: '1:1044326542003:web:30b4c812b1157ab24f5ec6',
  measurementId: 'G-12MYHDPL2G',
};

const firebase = initializeApp(FIREBASE_CONFIG);
const firestore = getFirestore(firebase);
const db = collection(firestore, 'personas');

export async function getAll(): Promise<any> {
  const docs = await getDocs(db);
  return docs.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function add(data: any): Promise<any> {
  const newPerson = await addDoc(db, data);
  return {
    id: newPerson.id,
    ...data,
  };
}

export async function deletePerson(id: string): Promise<any> {
  await deleteDoc(doc(db, id));
}

export async function updatePerson(id: string, data: any): Promise<any> {
  await setDoc(doc(db, id), data);
}
