"use client";

import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h1>Root Folder</h1>
      <ul>
        <li>
          <Link href="test/folder1">folder1</Link>
        </li>
        <li>
          <Link href="test/folder2">folder2</Link>
        </li>
        <li>
          <Link href="test/folder3">folder3</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
