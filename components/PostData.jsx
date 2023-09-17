// "use client";
// import { useSession  } from "next-auth/react";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


const PostData = ({ posts }) => {

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts}
      </ul>
    </div>
  );
};

export async function getServerSideProps(context) {
  const ss= await getServerSession(authOptions)

  const session = await getServerSession(context.req, context.res,authOptions);
  // const ss=JSON.stringify(session, null, 2)
  console.log(ss);
  if (session){
    const email = session.user.email;
    console.log(email, "from session");
  }
  const response = await fetch("https://congenial-capybara-grx69vqpxw62p9w7-3000.app.github.dev/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
  });
  const posts = await response.json();
  console.log(posts)
  // Pass data to component as props
  return {
    props: {
      posts,
    },
  };
}

export default PostData;