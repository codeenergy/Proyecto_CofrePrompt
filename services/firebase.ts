import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, where, doc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
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
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString()
      } as Prompt);
    });

    return prompts;
  } catch (e) {
    console.error("Error obteniendo documentos: ", e);
    return [];
  }
};

// Obtener prompts de un usuario específico
export const getUserPromptsFromDb = async (userId: string): Promise<Prompt[]> => {
  try {
    const q = query(
      collection(db, "prompts"),
      where("authorId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    const prompts: Prompt[] = [];
    querySnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      prompts.push({
        id: docSnapshot.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString()
      } as Prompt);
    });

    return prompts;
  } catch (e) {
    console.error("Error obteniendo prompts del usuario: ", e);
    return [];
  }
};

// Actualizar un prompt
export const updatePromptInDb = async (promptId: string, updates: Partial<Prompt>) => {
  try {
    const promptRef = doc(db, "prompts", promptId);
    const updateData = {
      ...updates,
      updatedAt: Timestamp.now()
    };
    await updateDoc(promptRef, updateData);
    console.log("Prompt actualizado con ID: ", promptId);
    return true;
  } catch (e) {
    console.error("Error actualizando documento: ", e);
    throw e;
  }
};

// Eliminar un prompt
export const deletePromptFromDb = async (promptId: string) => {
  try {
    const promptRef = doc(db, "prompts", promptId);
    await deleteDoc(promptRef);
    console.log("Prompt eliminado con ID: ", promptId);
    return true;
  } catch (e) {
    console.error("Error eliminando documento: ", e);
    throw e;
  }
};

// Incrementar likes de un prompt
export const toggleLikePrompt = async (promptId: string, currentLikes: number, isLiked: boolean) => {
  try {
    const promptRef = doc(db, "prompts", promptId);
    const newLikes = isLiked ? currentLikes - 1 : currentLikes + 1;
    await updateDoc(promptRef, { likes: newLikes });
    return newLikes;
  } catch (e) {
    console.error("Error actualizando likes: ", e);
    throw e;
  }
};

// Incrementar vistas de un prompt
export const incrementPromptViews = async (promptId: string, currentViews: number) => {
  try {
    const promptRef = doc(db, "prompts", promptId);
    await updateDoc(promptRef, { views: currentViews + 1 });
    return currentViews + 1;
  } catch (e) {
    console.error("Error incrementando vistas: ", e);
    throw e;
  }
};

// --- GESTIÓN DE USUARIOS ---

// Guardar/actualizar datos de usuario
export const saveUserData = async (userId: string, userData: Partial<User>) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, userData);
    console.log("Datos de usuario actualizados");
    return true;
  } catch (e) {
    // Si el documento no existe, crearlo
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        ...userData,
        createdAt: Timestamp.now()
      });
      return true;
    } catch (error) {
      console.error("Error guardando datos de usuario: ", error);
      throw error;
    }
  }
};

// Obtener datos de usuario
export const getUserData = async (userId: string): Promise<User | null> => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDocs(query(collection(db, "users"), where("uid", "==", userId)));

    if (userSnap.empty) {
      return null;
    }

    const userData = userSnap.docs[0].data();
    return userData as User;
  } catch (e) {
    console.error("Error obteniendo datos de usuario: ", e);
    return null;
  }
};

// Agregar prompt a favoritos
export const addToFavorites = async (userId: string, promptId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    const userData = await getUserData(userId);

    const currentFavorites = userData?.favoritePrompts || [];
    if (!currentFavorites.includes(promptId)) {
      await updateDoc(userRef, {
        favoritePrompts: [...currentFavorites, promptId]
      });
    }
    return true;
  } catch (e) {
    console.error("Error agregando a favoritos: ", e);
    throw e;
  }
};

// Eliminar prompt de favoritos
export const removeFromFavorites = async (userId: string, promptId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    const userData = await getUserData(userId);

    const currentFavorites = userData?.favoritePrompts || [];
    await updateDoc(userRef, {
      favoritePrompts: currentFavorites.filter(id => id !== promptId)
    });
    return true;
  } catch (e) {
    console.error("Error eliminando de favoritos: ", e);
    throw e;
  }
};