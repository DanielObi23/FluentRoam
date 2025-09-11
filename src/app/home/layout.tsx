import Main from "@/components/tags/Main";

export default function HomeLayout({
  children,
  conversationHistory,
  storyHistory,
}: {
  children: React.ReactNode;
  conversationHistory: React.ReactNode;
  storyHistory: React.ReactNode;
}) {
  return (
    <Main page="HomePage" className="flex">
      <h1 className="sr-only">FluentRoam Home Page</h1>

      <section className="dark:bg-primary/10 bg-primary-800/30 hidden h-full w-1/3 justify-center rounded-xl p-3 lg:flex 2xl:w-1/4 2xl:items-center">
        {children}
      </section>

      <section className="w-full space-y-5 px-4 py-3 lg:w-2/3 2xl:w-3/4">
        <div className="dark:bg-primary/10 bg-primary-800/30 flex flex-col items-center justify-center rounded-xl p-3">
          <h2 className="font-ui mb-2.5 text-center text-xl font-semibold md:text-3xl">
            Conversation History
          </h2>
          {conversationHistory}
        </div>

        <div className="dark:bg-primary/10 bg-primary-800/30 flex flex-col items-center justify-center rounded-xl p-3">
          <h2 className="font-ui mb-2.5 text-center text-xl font-semibold md:text-3xl">
            Story History
          </h2>
          {storyHistory}
        </div>
      </section>
    </Main>
  );
}
