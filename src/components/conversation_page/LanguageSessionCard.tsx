import { Button } from "../ui/button"
import { Download } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface SessionCard {
    title: string,
    description: string,
    duration: number,
    proficiency: string,
    formality: string,
    scenario: string
}

export default function LanguageSessionCard({title, description, duration, proficiency, formality, scenario}: SessionCard) {
    return (
        <div className="bg-background col-span-6 lg:col-span-4 xl:col-span-3 flex flex-col items-center justify-center">
            <h2 className="bg-blue-800">{title}</h2>
            <p>{duration} mins - {proficiency} - {formality}</p>
            <Dialog>
                <DialogTrigger  className="button">
                    Feedback
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                        {description} <br /> {scenario}
                        </DialogDescription>
                        <div className="flex justify-between">
                            <Button>Copy as Markdown</Button>
                            <Button>Export to PDF</Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Button>
                <Download /> Audio
            </Button>
        </div>
    )
}

// inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90