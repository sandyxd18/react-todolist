import { Button } from "../ui/button";

export default function UserDeleteConfirmation({ onClose, onSave }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-800/50 backdrop-blur-3xl">
      <div className="w-full max-w-sm p-6 space-y-4 bg-white rounded-2xl">
        <div>
          <h2 className="text-2xl font-semibold text-primary">Delete User</h2>
          <p>Delete this user can be delete their task!</p>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            variant="secondary"
            className="bg-slate-200 hover:bg-slate-300"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            className="text-white bg-danger hover:bg-red-700"
          >
            Delete User
          </Button>
        </div>
      </div>
    </div>
  );
}
