export function AmbassadorNotFound() {
  return (
    <div className="mt-16 py-16 px-10 w-screen max-w-sm rounded-xl flex flex-col bg-white items-center text-center">
      <h1>Not Found</h1>
      <br />
      <p>This page cannot be found. Maybe the page url was changed.</p>
      <br />
      <button
        className="w-full"
        onClick={() => {
          window.open("https://innerengineering.sadhguru.org");
        }}
      >
        Go to Inner Engineering
      </button>
    </div>
  );
}
