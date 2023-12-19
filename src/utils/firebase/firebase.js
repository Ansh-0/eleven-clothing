import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAW_PD9sq7i5lSuBRxd3lT9BT6ueOkRO28',
	authDomain: 'eleven-store.firebaseapp.com',
	projectId: 'eleven-store',
	storageBucket: 'eleven-store.appspot.com',
	messagingSenderId: '378000346533',
	appId: '1:378000346533:web:31115c79d8bf121665ec4c',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});
	await batch.commit();
	console.log('done');
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);
	const querySnapshot = await getDocs(q);

	const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const { title, items } = docSnapshot.data();
		acc[title.toLowerCase()] = items;
		return acc;
	}, {});

	return categoryMap;
};

export const createUserDocument = async (user, additionalInfo = {}) => {
	if (!user) return;
	const userDocReference = doc(db, 'users', user.uid);
	const userSnapshot = await getDoc(userDocReference);
	if (!userSnapshot.exists()) {
		const { displayName, email } = user;
		const createdAt = new Date();
		try {
			await setDoc(userDocReference, {
				displayName,
				email,
				createdAt,
				...additionalInfo,
			});
		} catch (error) {
			console.log('There is an error creating the user', error.message);
		}
	}
	return userDocReference;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => {
	signOut(auth);
};

export const onAuthStateChangedListener = (callback) => {
	onAuthStateChanged(auth, callback);
};
