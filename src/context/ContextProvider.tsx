import { NameProvider } from "./NameContext";
import { GroupProvider } from "./GroupContext";
import { ChatProvider } from "./ChatContext";
import { CheckboxProvider } from "./CheckboxesContext";
import { MockupProvider } from "./MockupContext";
import { DebateProvider } from "./DebateContext";





export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
        <NameProvider>
          <GroupProvider>
            <ChatProvider>
              <CheckboxProvider>
                <MockupProvider>
                  <DebateProvider>
                    {children}
                  </DebateProvider>
                </MockupProvider>
              </CheckboxProvider>
            </ChatProvider>
          </GroupProvider>
        </NameProvider>
  );
};
