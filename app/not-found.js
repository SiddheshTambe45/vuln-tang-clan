// app/not-found.js
export default function NotFound() {
  const fakeFlag = `flag{${Math.random().toString(36).substring(2, 15)}}`;

  return (
    <div className="w-full flex flex-col items-center justify-start p-4 bg-black min-h-[500px] relative">
      <h1 className="text-4xl mb-4 text-red-400">404 - Page Not Found</h1>
      <p className="mb-2 text-red-400">But you found this... weird.</p>

      {/* 😈 Decoy Flag */}
      <p className="text-sm text-gray-600 z-10">
        <code>{fakeFlag}</code>
      </p>

      {/* 😈 Real Flag, hidden in plain sight */}
      <p className="text-sm text-black absolute top-[400px]">
        <code>{"flag{404_not_found_but_you_found_this}"}</code>
      </p>
    </div>
  );
}
