export const SignupEmail = ({ newUser }: { newUser: User }) => {
  return (
    <div>
      <h1>
        Welcome, {newUser.firstName} {newUser.lastName}!
      </h1>
      <h2>Your login ID is: {newUser.id}</h2>
      <p>Use it to Login on your SharkPool account.</p>
    </div>
  );
};
