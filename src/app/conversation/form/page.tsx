import LanguageSessionForm from "@/components/LanguageSessionForm";
import Navigation from "@/components/Navigation";

export default function ConversationForm() {
    return (
        <div className="h-screen flex flex-col w-full bg-background">
            <Navigation page="Conversation"/>
            <LanguageSessionForm />
        </div>
    )
}