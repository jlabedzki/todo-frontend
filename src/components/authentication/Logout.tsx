import { Button } from "@mui/material";
import { useContext } from "react";
import { userStateContext } from "../providers/UserStateProvider";

export default function Logout() {
  const { logout } = useContext(userStateContext);

  return (
    <Button variant="outlined" onClick={() => logout()}>
      Logout
    </Button>
  );
}
