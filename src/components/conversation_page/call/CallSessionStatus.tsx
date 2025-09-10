import { useCallSessionStore } from "@/store";

export default function CallSessionStatus() {
  const clock = useCallSessionStore((state) => state.clock);
  const callStatus = useCallSessionStore((state) => state.callStatus);

  return (
    <div className="flex w-full items-center justify-between gap-2 self-start font-semibold">
      <div className="flex items-center gap-2">
        <div className="bg-primary rounded-xl px-3 py-2 text-center">
          {clock}
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2 animate-pulse rounded-full bg-red-700"></div>
          {callStatus}
        </div>
      </div>
    </div>
  );
}
