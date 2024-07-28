import Image from "next/image";
import Link from "next/link";

const Folders = ({ data, page }) => {
  return (
    <div>
      <div className="folders grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-4 flex-wrap mt-12">
        {data.map((item) => {
          return (
            <Link
              href={`/dashboard/${page}/${item.id}`}
              key={item.id}
              className="folder flex flex-col items-center flex-wrap"
            >
              <Image
                src="/icons8-folder.svg"
                height={100}
                width={100}
                alt="Icon of"
              />
              <span className="text-sm font-medium">{item.folder_name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Folders;
