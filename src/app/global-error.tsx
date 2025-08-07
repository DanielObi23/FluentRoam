"use client"

import { Button } from "@/components/ui/button"
// works only in production mode, and needs html and body tags to render
export default function GlobalError() {
    return (
        <html>
            <body>
                <div>
                    <h1>Error occured in root folder</h1>
                    <Button onClick={window.location.reload}>Reload the page</Button>
                </div>
            </body>
        </html>
    )
}