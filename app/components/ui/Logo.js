import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <Image
        src={"/NCM_Logo_inverted.png"}
        height={100}
        width={100}
        alt="NCM Logo"
      />
    </div>
  );
};

export default Logo;
