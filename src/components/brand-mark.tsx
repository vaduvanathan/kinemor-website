import Image from "next/image";

export function BrandMark() {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className="brand-mark"
      height={24}
      priority
      src="/kinemor-mark.svg"
      width={24}
    />
  );
}
