import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image src={"/logo.jpeg"} height={130} width={130} alt="Logo" />
    </Link>
  );
};

export default Logo;
