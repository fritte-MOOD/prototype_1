import { NameProvider } from "./NameContext";
import { GroupProvider } from "./GroupContext";
import { ChatProvider } from "./ChatContext";


export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
        <NameProvider>
          <GroupProvider>
            <ChatProvider>
              {children}
            </ChatProvider>
          </GroupProvider>
        </NameProvider>
  );
};
