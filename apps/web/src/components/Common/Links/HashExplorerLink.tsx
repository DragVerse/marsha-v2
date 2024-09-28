import { POLYGONSCAN_URL } from "@dragverse/constants";
import Link from "next/link";
import type { ReactElement } from "react";

const HashExplorerLink = ({
  hash,
  children
}: {
  hash: string;
  children: ReactElement;
}) => {
  return (
    <Link
      href={`${POLYGONSCAN_URL}/tx/${hash}`}
      rel="noreferer noreferrer"
      target="_blank"
    >
      {children}
    </Link>
  );
};

export default HashExplorerLink;
