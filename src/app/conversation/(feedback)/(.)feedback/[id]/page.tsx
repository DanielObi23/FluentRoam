export default function Page({params}: {params: Promise<{id: string}>}) {
    return (
        <div>
            Hello world intercepting route
        </div>
    )
}