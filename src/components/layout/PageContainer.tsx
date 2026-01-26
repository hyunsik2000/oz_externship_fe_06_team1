import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function PageContainer({ children, className = "" }: Props) {
  return (
    <main
      className={[
        "flex-1 min-w-0 min-h-0 overflow-auto bg-grey-100",
        "pl-[17.5px] pr-[41.5px] pt-[65px] pb-[62px]",
        className,
      ].join(" ")}
    >

      <div className="w-full overflow-x-auto">
        <section
          className={[
            "w-[1600px] min-w-[1600px] shrink-0", 
            "min-h-[873px]",
            "mr-auto", 
            "bg-white border border-[var(--color-grey-300)]",
            "rounded-[8px] shadow-sm",
          ].join(" ")}
        >
          {children}
        </section>
      </div>
    </main>
  );
}

