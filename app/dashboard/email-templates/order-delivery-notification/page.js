"use client";

import { useState } from "react";
import RichTextEditor from "../RichTextEditor";

const template = `<div>
    <p>Hello {USER_FIRST_NAME} {USER_LAST_NAME},</p>
    <p>An account has been created for you.</p>
    <p>Please use the following info to login to your dashboard:</p>
    <p>
      Dashboard URL: <a href="{DASHBOARD_URL}" style="color: #3498db;">{DASHBOARD_URL}</a><br />
      Email: {USER_LOGIN_EMAIL}<br />
      Password: {USER_LOGIN_PASSWORD}
    </p>
    <p>{SIGNATURE}</p>
</div>
`;

const availableVariables = [
  "{USER_FIRST_NAME}",
  "{USER_LAST_NAME}",
  "{DASHBOARD_URL}",
  "{USER_LOGIN_EMAIL}",
  "{USER_LOGIN_PASSWORD}",
  "{LOGO_URL}",
  "{SIGNATURE}",
  "{RECIPIENTS_EMAIL_ADDRESS}",
];

export default function EditorPage() {
  const [editorContent, setEditorContent] = useState(template);

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const handleSubmit = () => {
    // Handle email sending logic here
    console.log(editorContent);
  };

  return (
    <div className="email-editor">
      <div className="bg-gray-900 text-white p-8 text-center text-2xl font-serif font-semibold">
        <h1>Order Delivery Notification</h1>
      </div>
      <RichTextEditor value={editorContent} onChange={handleEditorChange} />
      <div className="my-4">
        <h2 className="font-semibold">Available variables:</h2>
        <ul className="list-disc list-inside">
          {availableVariables.map((variable) => (
            <li key={variable} className="text-gray-600">
              {variable}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleSubmit}
        className="btn-primary bg-[#facc15] hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </div>
  );
}
