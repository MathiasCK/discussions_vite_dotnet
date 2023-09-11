import { actions } from "../state";
import { fetcher } from "../utils/fetcher";

export const login = async (email: string): Promise<void> => {
  const { user, token } = await fetcher("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  localStorage.setItem("token", token);
  actions.setUser(user);
};
