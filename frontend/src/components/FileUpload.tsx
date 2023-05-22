import React, { ChangeEventHandler, useRef } from "react";

interface FileUploadProps {
  children: React.ReactNode;
  onChange: ChangeEventHandler<HTMLInputElement>;
  accept?: string;
  className?: string;
}

export function FileUpload({
  children,
  onChange,
  accept,
  className,
}: FileUploadProps) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  function clickHiddenInput() {
    hiddenFileInput?.current?.click();
  }

  return (
    <div onClick={clickHiddenInput} className={className}>
      <input
        type="file"
        accept={accept}
        className="hidden"
        ref={hiddenFileInput}
        onChange={onChange}
      />
      {children}
    </div>
  );
}
