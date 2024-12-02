import { signOut } from "@/app/auth";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
      className="w-fit flex"
    >
      <button
        type="submit"
        className="flex items-center space-x-2"
      >
        <svg
          className="h-5 w-5 group-hover:fill-red-600 dark:fill-gray-600  transition-colors duration-200"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M19 21H5C3.89543 21 3 20.1046 3 19V15H5V19H19V5H5V9H3V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM11 16V13H3V11H11V8L16 12L11 16Z"></path>
        </svg>

        <span className="text-sm front-medium">Sign out</span>
      </button>
    </form>
  );
}
