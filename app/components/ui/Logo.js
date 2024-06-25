import { useUser } from "@/app/_features/authentication/useUser";
import { BASE_URL_IMAGE } from "@/app/lib/utils";
import Image from "next/image";

const Logo = () => {
  const { user, isLoading } = useUser();

  return (
    <div className="flex items-center gap-3">
      <Image
        src={user?.logo ? `${BASE_URL_IMAGE}${user.logo}` : "/logo.svg"}
        height={40}
        width={40}
        alt="Logo"
      />
      {!isLoading && user && (
        <div className="flex flex-col gap-1 text-[1.35rem] font-serif font-semibold leading-5">
          <span>{user?.company_name || "Leon"} Cycle</span>
          <span>Dealer Portal</span>
        </div>
      )}
      {/*  */}
    </div>
  );
};

export default Logo;
