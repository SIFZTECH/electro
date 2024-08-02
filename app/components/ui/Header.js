import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="px-3 sm:px-6 py-6 flex sm:flex-row flex-col gap-y-6 justify-between items-center">
      <Link href="/">
        <Image src={"/logo.jpeg"} height={100} width={100} alt="Logo" />
      </Link>
      <div className="flex items-center gap-3">
        <Link
          className="btn-primary bg-transparent text-color-primary border border-color-primary"
          href="/register-warranty"
        >
          Register Warranty
        </Link>

        <Link className="btn-primary" href="/login">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Header;
