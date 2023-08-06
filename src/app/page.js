// 'use client'
import Image from "next/image"
import Navbar from "./components/Navbar"
import Link from "next/link"

async function getData() {
  const res = await fetch("http://www.omdbapi.com/?apikey=2f146ce1&s=diary")

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Home() {
  const data = await getData()
  return (
    <>
      <Navbar/>
      <div className="text-4xl font-serif font-bold text-center bg-zinc-900 text-white py-5">Movies</div>
      <div className="grid grid-cols-4 gap-5 px-32 bg-zinc-900">
      {data.Search.map((value)=>{
        return (
          <Link key={value.imdbID} href={`/movie/[id]?id=${value.imdbID}`}
          className="flex items-center justify-center">
            <div className="bg-white rounded-md">
              <Image 
                className="rounded-t-md bg-sky-500 flex items-center"
                src={value.Poster}
                width={220}
                height={220}
                alt="Movie Image"
              />
              <div className="py-1 text-center text-slate-800 font-semibold">{value.Title.slice(-22)}</div>
            </div>
          </Link>
        )
      })}
    </div>
    </>
  );
}
