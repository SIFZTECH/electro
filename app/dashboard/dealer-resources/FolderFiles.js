import Image from "next/image";
import Link from "next/link";
import { PiFoldersThin } from "react-icons/pi";

const FolderFiles = ({ data }) => {
  return (
    <div>
      {/* <h1 className="heading-h1 mt-12">NCM Moscow</h1> */}

      <div className="folders grid grid-cols-2 md:grid-cols-5 2xl:grid-cols-5 gap-4 flex-wrap mt-12">
        {data.map((item) => (
          <Link
            href={`/dashboard/dealer-resources/${item.id}`}
            key={item.id}
            className="folder flex flex-col items-center flex-wrap"
          >
            {/* <PiFoldersThin size="100" color="#27272a" /> */}
            <Image
              src="/icons8-folder.svg"
              height={60}
              width={60}
              alt="Icon of"
            />
            <span className="text-sm font-medium">{item.folder_name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FolderFiles;
