import { childrenProps } from "@/app/types";
import StateDatasContext from "@/contexts/datasContexts/datasContexts";
import ActionContexts from "@/contexts/actionsContext/actionContexts";

export default function ContextsProvider({ children }: childrenProps) {
    return (
        <ActionContexts>
            <StateDatasContext>
                {children}
            </StateDatasContext>
        </ActionContexts>
    );
}