import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { User, Prompt } from "../types";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCJ4aZq_7AX98lMEDb-t9UBPrtCG0CHHkI",
  authDomain: "cofreprompt.firebaseapp.com",
  projectId: "cofreprompt",
  storageBucket: "cofreprompt.firebasestorage.app",
  messagingSenderId: "887253905394",
  appId: "1:887253905394:web:9a4e38ec6d5b713c23456b",
  measurementId: "G-2T1P0Y3D2T"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

// --- AUTENTICACIÓN ---

export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    return {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    };
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

// Escuchar cambios en el estado de autenticación
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      callback({
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL
      });
    } else {
      callback(null);
    }
  });
};

// --- BASE DE DATOS (PROMPTS) ---

// Guardar un nuevo prompt
export const savePromptToDb = async (promptData: any) => {
  try {
    const promptWithTimestamp = {
      ...promptData,
      createdAt: Timestamp.now() // Usar timestamp de Firestore
    };
    const docRef = await addDoc(collection(db, "prompts"), promptWithTimestamp);
    console.log("Prompt guardado con ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error añadiendo documento: ", e);
    throw e;
  }
};

// Obtener todos los prompts
export const getPromptsFromDb = async (): Promise<Prompt[]> => {
  try {
    const q = query(collection(db, "prompts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const prompts: Prompt[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      prompts.push({
        id: doc.id,
        ...data,
        // Convertir Timestamp a string ISO para compatibilidad
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
      } as Prompt);
    });

    return prompts;
  } catch (e) {
    console.error("Error obteniendo documentos: ", e);
    return [];
  }
};