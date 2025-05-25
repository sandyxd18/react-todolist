import { Button } from "../ui/button";
import { useNavigate } from "react-router";

export default function UserOption({ userId, onRequestDelete }) {
  const navigate = useNavigate();

  const handleResetPasswordClick = () => {
    navigate(`/user/${userId}/reset-password`);
  };

  return (
    <div className="w-40 p-2 space-y-2 bg-white border rounded-xl border-primary">
      <Button className="w-full" onClick={handleResetPasswordClick}>
        Reset Password
      </Button>
      <Button
        className="w-full bg-danger hover:bg-red-700"
        onClick={() => onRequestDelete(userId)}
      >
        Delete
      </Button>
    </div>
  );
}
