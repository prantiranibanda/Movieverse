'use client'
import React, { useState, use } from "react";
import Navbar from "./components/Navbar";
import Link from "next/link";

async function getData(search) {
  const res = await fetch(`http://www.omdbapi.com/?apikey=2f146ce1&s=${search}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Home() {
  const [text, setText] = useState("");
  const [check, setCheck] = useState(true);
  const [search, setSearch] = useState("diary");
  let data;
  if(check){
    data = use(getData(search));
  }
  return (
    <div className="min-h-screen bg-zinc-900">
      <Navbar text={text} setText={setText} check={check} setCheck={setCheck} search={search} setSearch={setSearch}/>
      <div className="text-4xl font-serif font-bold text-center bg-zinc-900 text-white py-5">
        Movies
      </div>
      <div className="grid grid-cols-4 gap-10 bg-zinc-900 border border-zinc-700 mx-20 py-10">
        {(data)?data.Search.map((value) => {
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
        }):"Not found"}
      </div>
      <div className="mx-20 py-3 flex justify-between">
        <button className="flex items-center bg-zinc-600 py-2 pr-4 pl-2 rounded-md text-zinc-400 font-medium">
          <span className="material-symbols-outlined">chevron_left</span>
          <span>Previous</span>
        </button>
        <button className="flex items-center bg-zinc-600 py-2 pl-4 pr-2 rounded-md text-zinc-400 font-medium">
          <span>Next</span>
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
