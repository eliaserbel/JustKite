import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>JustKite</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="addspot">Add KiteSpot</NavLink>
          <NavLink to="login">Login</NavLink>
          <NavLink to="signup">Signup</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
