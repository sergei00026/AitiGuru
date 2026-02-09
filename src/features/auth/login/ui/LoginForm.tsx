import { useState } from 'react';
import {useAuthStore} from "../../../../entities/user/model/store.ts";

export function LoginForm() {
  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login(username, password);
      }}
    >
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button disabled={loading}>Login</button>
    </form>
  );
}
