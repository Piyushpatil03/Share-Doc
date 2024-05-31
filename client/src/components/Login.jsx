import { supabase } from "../supabase/supabaseClient";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    console.log("data - ", data);
    console.log("error -", error);

    auth?.setLoggedIn(true);
    navigate("/homescreen");

  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-4">
        <div>
          <p className="text-center mb-4 font-bold text-2xl font-mono">
            Log In
          </p>
          <form>
            <div>
              <div className="mb-2">
                <label>Enter your Email</label>
              </div>
              <div className="mb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 border-black p-2 rounded-md"
                />
              </div>
            </div>

            <div>
              <div className="mb-2">
                <label>Enter Password</label>
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2 border-black p-2 rounded-md"
                />
              </div>
            </div>

            <div className="mt-6">
              <input
                type="submit"
                value="Submit"
                onClick={(e) => loginUser(e)}
                className="m-auto border-2 border-black p-2 rounded-md"
              />
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;
