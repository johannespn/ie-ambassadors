import { useCallback, useEffect } from "react";

export type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  onVisibilityChange: (isVisible: boolean) => void;
};

export function Modal({
  children,
  title,
  isOpen,
  onVisibilityChange,
}: ModalProps) {
  const escFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onVisibilityChange(false);
      }
    },
    [onVisibilityChange]
  );
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 bg-gray-600 bg-opacity-80 overflow-y-auto h-full w-full`}
    >
      <div className="relative top-20 mx-auto w-96 rounded-md bg-white">
        <div className="py-5 px-8 text-white bg-blue-700 rounded-t-md text-lg">
          <p>{title}</p>
        </div>
        <div className="p-7">{children}</div>
      </div>
    </div>
  );
}
