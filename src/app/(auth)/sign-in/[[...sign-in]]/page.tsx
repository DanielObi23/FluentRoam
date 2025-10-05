import { SignIn } from "@clerk/nextjs";

//TODO: Make sign in and sign up to be intercepted routes

export default function SignInPage() {
  return (
    <div>
      <SignIn />
    </div>
  );
}
