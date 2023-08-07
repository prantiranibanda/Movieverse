"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import React from "react";

async function getData(id) {
  const res = await fetch(`http://www.omdbapi.com/?apikey=2f146ce1&i=${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Movie() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const data = await getData(id);

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="bg-zinc-700 flex rounded-md border border-zinc-600">
        <Image
          className="rounded-l-md border-r-2 border-gray-950"
          src={data.Poster}
          width={300}
          height={300}
          alt="Movie Image"
        />
        <div className="flex w-[600px] p-6 items-center">
          <div>
            <h1 className="text-3xl font-bold text-zinc-50 pb-3">
              {data.Title} #{data.Year}
            </h1>
            <p className="text-justify text-lg pb-2 font-semibold text-zinc-400">
              <span className=" text-zinc-50">Plot :</span> {data.Plot}
            </p>
            <p className="text-justify text-lg pb-2 font-semibold text-zinc-400">
              <span className=" text-zinc-50">Genre :</span> {data.Genre}
            </p>
            <p className="text-justify text-lg pb-2 font-semibold text-zinc-400">
              <span className=" text-zinc-50">Actors :</span> {data.Actors}
            </p>
            <p className="text-justify text-2xl py-2 font-semibold text-[#f7f73e]">
              <span className=" text-red-500">IMDB :</span> {data.imdbRating}
            </p>
            <p className="flex text-justify text-sm pt-12 font-semibold text-zinc-400 space-x-4">
              <span className=" text-zinc-50">Language :</span> {data.Language}{" "}
              <span className=" text-zinc-50">Country :</span> {data.Country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
