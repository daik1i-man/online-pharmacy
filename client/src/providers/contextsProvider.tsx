import { childrenProps } from "@/app/types";
import DatasContextsComponent from "@/contexts/datasContexts/datasContexts";

export default function ContextsProvider({ children }: childrenProps) {
    return (
        <DatasContextsComponent>
            {children}
        </DatasContextsComponent>
    );
}