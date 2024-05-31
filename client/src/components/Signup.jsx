import { supabase } from "../supabase/supabaseClient";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signup() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    auth?.setLoggedIn(true);

    navigate("/homescreen");
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-4">
        <div>
          <p className="text-center mb-4 font-bold text-2xl font-mono">
            Sign In
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
                onClick={(e) => signIn(e)}
                className="m-auto border-2 border-black p-2 rounded-md"
              />
            </div>
          </form>
        </div>

        <div className="mt-4 place-content-center">
          Already have an Account?{" "}
          <Link to="/login" className="text-teal-800">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
}
