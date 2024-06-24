import Image from "next/image";
import { useUser } from "../../_features/authentication/useUser";
import { BASE_URL_IMAGE } from "@/app/lib/utils";

const User = () => {
  const { user } = useUser();

  return (
    <div className="bg-gray-50 mt-6 md:mt-0 flex gap-3 items-center rounded-xl font-sans py-4 px-3 flex-wrap max-w-full">
      <div className="h-[40px] w-[40px] rounded-full relative">
        <Image
          fill
          src={
            user.profile ? ` ${BASE_URL_IMAGE}${user.profile}` : "/default.jpg"
          }
          alt="User name"
          className="rounded-full"
        />
      </div>

      <div className="flex flex-col leading-5 text-black">
        <span className="name font-bold text-wrap">
          {user.firstname} {user.lastname}
        </span>
        <span className="email text-wrap">{user.email}</span>
      </div>
    </div>
  );
};

export default User;
