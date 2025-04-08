"use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function ProfilePage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");
//   const [user, setUser] = useState(null);
//   const [cookieUser, setCookieUser] = useState(null);
//   const [redirected, setRedirected] = useState(false); // 👈 add this flag

//   useEffect(() => {
//     const cookieUsername = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("username="));
//     const cookieId = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("id="));

//     if (cookieUsername) {
//       setCookieUser(decodeURIComponent(cookieUsername.split("=")[1]));
//     }

//     if (!id && cookieId && !redirected) {
//       const userId = decodeURIComponent(cookieId.split("=")[1]);
//       setRedirected(true); // prevent infinite loop
//       router.push(`/profile?id=${userId}`);
//       return;
//     }

//     if (id) {
//       fetch(`/api/user?id=${id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.success) {
//             setUser(data.user);
//           }
//         })
//         .catch((err) => console.error("Error fetching user:", err));
//     }
//   }, [id, router, redirected]);

//   if (!cookieUser) {
//     return (
//       <main className="p-6 max-w-xl mx-auto">
//         <h1 className="text-2xl font-bold text-red-600">Unauthorized</h1>
//         <p>You must be logged in to view this page.</p>
//       </main>
//     );
//   }

//   if (!user) {
//     return (
//       <main className="p-6 max-w-xl mx-auto">
//         <h1 className="text-2xl font-bold">Loading...</h1>
//       </main>
//     );
//   }

//   return (
//     <main className="p-6 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold">👤 Profile</h1>
//       <p className="mt-2">
//         Viewing profile for user ID <strong>{user.id}</strong>:{" "}
//         <strong>{user.username}</strong>
//       </p>
//       <p className="text-sm text-gray-500 mt-1">
//         (You're logged in as <code>{cookieUser}</code>, but we didn’t verify it.
//         You can change the ID in the URL to view other profiles!)
//       </p>
//     </main>
//   );
// }

import { Suspense } from "react";
import ProfileClient from "./ProfileClient";

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="p-6">Loading profile...</div>}>
      <ProfileClient />
    </Suspense>
  );
}
