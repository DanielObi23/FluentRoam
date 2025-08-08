import Navigation from "@/components/app_layout/Navigation";
import { Button } from "@/components/ui/button";
import { userSessions } from "@/dummy_data";

export default async function Page({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const sessionList = userSessions.filter((session) => session.session_id === id)
    const session = sessionList[0]
    return (
        <div className="w-full h-screen">
            <Navigation page="feedback" />
            <h1 className="text-2xl font-semibold text-center mt-5">Title: {session.title}</h1>
            <p className="text-center">Role Scenario: {session.role_scenario}</p>
            <p className="text-center">{session.feedback}</p>
            <p className="text-end">{session.created_at}</p>
            <div>
                <Button>
                    Download Audio
                </Button>
                <Button>
                    Export Markdown
                </Button>
                <Button>
                    Export PDF
                </Button>
                <Button>
                    Export Vocab in CSV
                </Button>
            </div>
        </div>
    )
}