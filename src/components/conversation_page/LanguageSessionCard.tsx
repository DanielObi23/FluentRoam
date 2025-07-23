export default function LanguageSessionCard() {
    return (
        <div className="border-b border-border hover:bg-muted/50 transition-colors p-4">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="font-medium">Ordering Food at a Restaurant</h3>
                    <div className="text-sm text-muted-foreground mt-1">
                        B1 • Casual • Yesterday 2:30 PM
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        Good progress with food vocabulary! Work on using 'me gustaría'...
                    </p>
                </div>
                <div className="text-sm font-medium ml-4">15 min</div>
            </div>
        </div>
    )
}