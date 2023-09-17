// "use client";
// import { useSession  } from "next-auth/react";
// import { getSession } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import UserInfo from "@/components/UserInfo";

async function getPost(){
  const session = await getServerSession(authOptions)
  // const {email} = session.user.email
  if (session) {
    // console.log(session,"from post page")
    // console.log(session.user.email,"from post page")
    const data = { 'email': session.user.email };
    // console.log(data);
  const response = await fetch("http://localhost:3000/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    });
  const posts = await response.json();
  console.log(typeof posts);
  return posts
}
}

export default async function PostData() {
  const data = await getPost()
  console.log(typeof data,data,"in dashboard");
return (
  <ul>
  {Object.entries(data.post).map(([key, value]) => (
    <li key={key}>
      {key}: {value.toString()}
    </li>
  ))}
</ul>
)
}

