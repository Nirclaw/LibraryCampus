import { AutProvider } from "./auth/context/AutProvider";
import { AppRouter } from "./router/AppRouter";

export const HeroesApp = () => {
  return (
    <>
      <AutProvider>
        <AppRouter />
      </AutProvider>
    </>
  );
};
