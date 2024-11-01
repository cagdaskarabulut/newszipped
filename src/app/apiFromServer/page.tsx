import { headers } from "next/headers";

export default async function APIFromServer() {
  const resp = await fetch(process.env.URL + "/api/whoAmI/name", {
    method: "GET",
    headers: headers(),
  }).then((res) => res.json());

  return (
    <div>
      <div>
        API Route From <span className="font-bold underline">Server</span>
      </div>
      <div>Name: {resp?.name}</div>
    </div>
  );
}
