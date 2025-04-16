import { NameProvider } from "./NameContext";
import { GroupProvider } from "./GroupContext";
import { ChatProvider } from "./ChatContext";
import { CheckboxProvider } from "./CheckboxesContext";




export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
        <NameProvider>
          <GroupProvider>
            <ChatProvider>
              <CheckboxProvider>
                {children}{/* Your app's components go here */}
              </CheckboxProvider>
            </ChatProvider>
          </GroupProvider>
        </NameProvider>
  );
};
