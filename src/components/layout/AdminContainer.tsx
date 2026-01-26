import type { ReactNode } from "react";

type Props = {
  title: string;
  children?: ReactNode;
  className?: string;
};

export default function AdminContainer({
  title,
  children,
  className = "",
}: Props) {
  return (

    <div
      className={[
        "min-w-0",
        "pl-[17.5px] pr-[41.5px] pt-[65px] pb-[62px]",
        "overflow-x-auto", 
        className,
      ].join(" ")}
    >
      <section
        className={[
          "w-[1600px] min-w-[1600px] shrink-0", 
          "min-h-[873px]",
          "bg-white border border-[var(--color-grey-300)]",
          "rounded-none", 
          "shadow-sm box-border",
        ].join(" ")}
      >
        <div className="p-6 font-semibold text-grey-900">{title}</div>
        {children}
      </section>
    </div>
  );
}
