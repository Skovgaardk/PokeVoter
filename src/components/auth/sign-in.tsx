import { signIn } from "@/app/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/game"});
      }}
    >
      <button type="submit">Signin with GitHub</button>
    </form>
  );
}
