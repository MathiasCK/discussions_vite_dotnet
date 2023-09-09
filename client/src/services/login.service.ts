import { User, actions } from "../state";

export const login = async (email: string): Promise<void> => {
  const response = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const { status } = response;
    const message = await response.text();
    alert(`${status} : ${message}`);
    return;
  }

  const user: User = await response.json();
  actions.setUser(user);
};
