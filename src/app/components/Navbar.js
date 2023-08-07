import React from "react";

export default function Navbar({ text, setText, check, setCheck, search, setSearch}) {
  return (
    <div className="flex items-center justify-between p-4 border-b-2 border-zinc-800 bg-black text-white text-lg">
      <div className="">Movieverse</div>
      <div className="flex items-center">
        <span className="material-symbols-outlined text-zinc-500 px-1">
          search
        </span>
        <textarea
          className="bg-zinc-800 rounded-md text-sm p-2 placeholder:italic placeholder:text-zinc-500"
          onChange={(event) => {
            setText(event.target.value);
            if(text.includes(" ")){
              setCheck(true);
              setSearch(text);
              setText("");
            }
            else{
              setCheck(false);
            }
          }}
          rows="1"
          cols="50"
          placeholder="Search movie here..."
          value={text}
        ></textarea>
      </div>
    </div>
  );
}
