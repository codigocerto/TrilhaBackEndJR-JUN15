import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCeY5CGMyV-m7pRRNDxxdOEJhKtoLL6uEg',
  authDomain: 'solutionsdev-a0d06.firebaseapp.com',
  projectId: 'solutionsdev-a0d06',
  storageBucket: 'solutionsdev-a0d06.appspot.com',
  messagingSenderId: '961264709465',
  appId: '1:961264709465:web:758173bc4c2fa7aa7b2648',
  measurementId: 'G-TDTYL6CSE8',
};

// Initialize Firebase
export const appFireBase = initializeApp(firebaseConfig);
