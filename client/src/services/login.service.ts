import { actions } from "../state";
import { User } from "../types";
import { fetcher } from "../utils/fetcher";

export const login = async (email: string): Promise<void> => {
  const user: User = await fetcher("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  actions.setUser(user);
};
