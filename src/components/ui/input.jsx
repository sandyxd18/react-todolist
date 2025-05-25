import * as React from "react";
import { cn } from "../../lib/utils";
import { Eye, EyeOff } from "lucide-react";

const Input = React.forwardRef(
  ({ className, type = "text", value, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleTogglePassword = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="relative">
        <input
          type={type === "password" && !showPassword ? "password" : "text"}
          value={value ?? ""}
          onChange={onChange}
          className={cn(
            "flex h-9 w-full rounded-lg border border-yellow-400 bg-transparent px-3 py-4 text-base transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-yellow-700 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute transform -translate-y-1/2 right-3 top-1/2"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
