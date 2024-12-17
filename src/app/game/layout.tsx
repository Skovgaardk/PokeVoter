import Sidenav from "@/components/ui/sidenav";

export default async function GameLayout(
  props: Readonly<{ children: React.ReactNode }>
) {
  return (
    <div className="flex">
      <div className="flex-1">
        <div className="fixed h-full">
          <Sidenav />
        </div>
        <div className="flex flex-col items-center ml-44">
          <div className="flex flex-col items-center">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
