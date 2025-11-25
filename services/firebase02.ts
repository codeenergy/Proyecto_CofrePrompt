import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, Auth } from "firebase/auth";
import { User } from '../types';

// Configuración de Firebase usando variables de entorno
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

// Solo inicializar Firebase si hay una API key válida
const isFirebaseConfigured = import.meta.env.VITE_FIREBASE_API_KEY &&
                             import.meta.env.VITE_FIREBASE_API_KEY !== "demo-api-key";

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (error) {
    console.warn("Firebase initialization failed:", error);
  }
}

const googleProvider = auth ? new GoogleAuthProvider() : null;

export { auth };

export const signInWithGoogle = async (): Promise<User> => {
  if (!auth || !googleProvider) {
    // Mock user para desarrollo sin Firebase
    const mockUser: User = {
      uid: 'demo-user-' + Date.now(),
      displayName: 'Usuario Demo',
      email: 'demo@cofreprompt.com',
      photoURL: 'https://ui-avatars.com/api/?name=Usuario+Demo&background=6366f1&color=fff'
    };
    console.log("Firebase no configurado. Usando usuario demo.");
    return mockUser;
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return {
      uid: result.user.uid,
      displayName: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL
    };
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  if (!auth) return;
  await signOut(auth);
};
