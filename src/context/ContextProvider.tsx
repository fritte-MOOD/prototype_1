import { NameProvider } from "./NameContext";
import { GroupProvider } from "./GroupContext";


export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
        <NameProvider>
          <GroupProvider>
            {children}
          </GroupProvider>
        </NameProvider>
  );
};
