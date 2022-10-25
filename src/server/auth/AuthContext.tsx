import { createClient, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

console.log(process.env.SUPABASE_URL);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export interface AuthType {
  user: User | null;
  signUp: (
    email: string,
    password: string,
    fname: string,
    lname: string
  ) => Promise<void | string>;
  signIn: (email: string, password: string) => Promise<void | string>;
  signOut: () => Promise<void | string>;
}

const AuthContext = createContext({} as AuthType);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // get session data if exists active session
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setLoading(false);
    // listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // cleanup useEffect hook
    return listener?.unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    fname: string,
    lname: string
  ) => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) return error.message;
    setUser(user);
    await supabase.from("User").insert([{ email, fname, lname }]);
  };

  const signIn = async (email: string, password: string) => {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) return error.message;
    setUser(user);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) return error.message;
    setUser(null);
  };

  const value = { user, signUp, signIn, signOut };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
