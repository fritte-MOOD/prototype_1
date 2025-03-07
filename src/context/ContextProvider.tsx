import { DarkModeProvider } from "./DarkModeContext";
import { NameProvider } from "./NameContext";

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
      <DarkModeProvider>
        <NameProvider>
          {children}
        </NameProvider>
      </DarkModeProvider>
  );
};
