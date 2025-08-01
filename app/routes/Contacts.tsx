import { useState } from "react";
import { Button } from "~/components/Button";

export default function Contacts() {
  //
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  //
  const [contacts, setContacts] = useState<any[]>([]);

  //
  return (
    <div className="p-4">
      <div className="text-2xl font-bold mb-4">Contacts List</div>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          className="bg-pink-300 text-black p-2 block"
          placeholder="Enter contact name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="tel"
          name="phone"
          className="bg-pink-300 text-black p-2 block"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            if (name && phone)
              setContacts([
                ...contacts,
                {
                  name,
                  phone,
                },
              ]);
            setName("");
            setPhone("");
          }}
        >
          Save
        </Button>
      </div>

      <div className="mt-4 p-4">{JSON.stringify(contacts)}</div>
    </div>
  );
}
