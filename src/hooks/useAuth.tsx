import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { 
  User as FirebaseUser, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  sendEmailVerification
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, additionalData?: any) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle redirect result for Google Sign-In
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log("Google Sign-In successful:", result.user);
          // User will be handled by onAuthStateChanged
        }
      } catch (error: any) {
        console.error("Google Sign-In redirect error:", error);
        if (error.code === 'auth/unauthorized-domain') {
          alert('Domain not authorized. Please add your domain to Firebase authorized domains.');
        }
      }
    };

    handleRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          // For now, create a simple user object from Firebase user
          const dbUser: User = {
            id: Date.now(), // Temporary ID
            email: firebaseUser.email || "",
            firstName: firebaseUser.displayName?.split(" ")[0] || "User",
            lastName: firebaseUser.displayName?.split(" ")[1] || "",
            firebaseUid: firebaseUser.uid,
            emailVerified: firebaseUser.emailVerified,
            createdAt: new Date(),
            phone: "",
            address: ""
          };
          setUser(dbUser);
        } catch (error: any) {
          console.error("Error creating user:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmail = async (email: string, password: string, additionalData?: any) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (result.user) {
        await sendEmailVerification(result.user);
        
        // Create user in database
        if (additionalData) {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: result.user.email,
              firstName: additionalData.firstName,
              lastName: additionalData.lastName,
              phone: additionalData.phone,
              address: additionalData.address,
              firebaseUid: result.user.uid,
              emailVerified: false
            })
          });
          
          if (!response.ok) {
            console.warn('Failed to create user in database');
          }
        }
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      await signInWithRedirect(auth, provider);
    } catch (error: any) {
      console.error("Google Sign-In error:", error);
      if (error.code === 'auth/unauthorized-domain') {
        throw new Error('Domain not authorized. Please add your domain to Firebase authorized domains.');
      }
      throw error;
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}