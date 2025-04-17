import { NameProvider } from "./NameContext";
import { GroupProvider } from "./GroupContext";
import { ChatProvider } from "./ChatContext";
import { CheckboxProvider } from "./CheckboxesContext";
import { MockupProvider } from "./MockupContext";





export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
        <NameProvider>
          <GroupProvider>
            <ChatProvider>
              <CheckboxProvider>
                <MockupProvider>
                  {children}
                </MockupProvider>
              </CheckboxProvider>
            </ChatProvider>
          </GroupProvider>
        </NameProvider>
  );
};
