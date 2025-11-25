import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { User, Prompt } from "../types";

// --- PEGA TU CONFIGURACIÓN AQUÍ ---
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

// --- BASE DE DATOS (PROMPTS) ---

// Guardar un nuevo prompt
export const savePromptToDb = async (promptData: any) => {
  try {
    const docRef = await addDoc(collection(db, "prompts"), promptData);
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
    // Ordenar por fecha de creación descendente
    const q = query(collection(db, "prompts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const prompts: Prompt[] = [];
    querySnapshot.forEach((doc) => {
      prompts.push({ id: doc.id, ...doc.data() } as Prompt);
    });
    
    return prompts;
  } catch (e) {
    console.error("Error obteniendo documentos: ", e);
    return [];
  }
};