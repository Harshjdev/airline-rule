function AdminLogin({ setIsAdmin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      localStorage.setItem("adminAuth", "true");
      setIsAdmin(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}