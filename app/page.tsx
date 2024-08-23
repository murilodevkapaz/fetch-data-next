"use client";
import { useMemo, useState } from "react";
import DataTable from "./components/Table";
import { User } from "./@types/User";
import Modal from "./components/Modal";

export default function Home() {
  const [data, setData] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      alert(error);
    }
  };

  const filteredData = useMemo(
    () =>
      data.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      ),
    [data, search]
  );

  return (
    <main className="relative p-5 gap-3 flex flex-col">
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"></div>

      <button type="button" className="btn btn-primary max-w-32" onClick={fetchData}>
        Fetch Users
      </button>

      {filteredData.length > 0 && (
        <div className="flex flex-col gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="filter by users"
            className="rounded-sm placeholder:pl-1 text-black max-w-md"
          />
          <DataTable data={filteredData} handleSelect={setSelectedUser} />
        </div>
      )}
      <Modal selectedUser={selectedUser} />
    </main>
  );
}
