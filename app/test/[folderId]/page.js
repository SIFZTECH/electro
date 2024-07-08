"use client";

import { useRouter } from "next/router";
import Link from "next/link";

const getFolderContents = (path) => {
  const folders = {
    "": ["folder1", "folder2", "folder3"],
    folder1: ["subfolder1", "subfolder2"],
    "folder1/subfolder1": ["subsubfolder1"],
    folder2: ["subfolder3", "subfolder4"],
    folder3: [],
  };
  return folders[path] || [];
};

const Folder = ({ params }) => {
  const path = params.folder ? params.folder.join("/") : "";
  const contents = getFolderContents(path);

  return (
    <div>
      <h1>Contents of {path || "root"}</h1>
      <ul>
        {contents.map((subfolder, index) => (
          <li key={index}>
            <Link href={`${path ? path + "/" : ""}${subfolder}`}>
              {subfolder}
            </Link>
          </li>
        ))}
      </ul>
      {path && <button onClick={() => window.history.back()}>Go Back</button>}
    </div>
  );
};

export default Folder;
