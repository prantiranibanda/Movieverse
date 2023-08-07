// 'use client'
import Image from "next/image";
import Navbar from "./components/Navbar";
import Link from "next/link";

async function getData() {
  const res = await fetch("http://www.omdbapi.com/?apikey=2f146ce1&s=diary");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  return (
      <div className="min-h-screen bg-zinc-900">
        <Navbar />
        <div className="text-4xl font-serif font-bold text-center bg-zinc-900 text-white py-5">
          Movies
        </div>
        <div className="grid grid-cols-4 gap-10 bg-zinc-900 border border-zinc-700 mx-20 py-10">
          {data.Search.map((value) => {
            return (
              <Link
                key={value.imdbID}
                href={`/movie?id=${value.imdbID}`}
                className="flex items-center justify-center"
              >
                <div
                  className="bg-white rounded-md bg-cover bg-no-repeat bg-top w-[220px] h-[250px]"
                  style={{ backgroundImage: `url(${value.Poster})` }}
                >
                  {/* <img
                  className="w-72 h-56 rounded-t-md"
                  src={value.Poster}
                  alt="Movie Image"
                /> */}
                  <div className="py-1 text-center text-slate-800 font-semibold">
                    {value.Title.slice(0, 20)}...
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mx-20 mt-3 flex justify-between">
          <button className="bg-zinc-600 py-2 px-4 rounded-md text-zinc-400 font-medium">Previous</button>
          <button className="bg-zinc-600 py-2 px-4 rounded-md text-zinc-400 font-medium">Next</button>
        </div>
        <div className="bg-zinc-900 text-zinc-900">cfe</div>
      </div>
  );
}
