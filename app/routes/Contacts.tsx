import { useEffect, useMemo, useState } from "react";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";

export default function Contacts() {
  //
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [index, setIndex] = useState(-1);
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("contacts") || "[]") || [];
    }
    return [];
  });

  const loopedContacts = useMemo(() => {
    return contacts
      .filter((contact) => {
        return (
          contact.name.toLowerCase().includes(search.toLowerCase()) ||
          contact.phone.includes(search) ||
          contact.email?.toLowerCase().includes(search.toLowerCase())
        );
      })
      .sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
  }, [search, contacts]);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  //
  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="text-xl font-bold mb-4">Contacts</div>

      {/* <div className="space-y-4 bg-neutral-800 p-4 rounded-md mt-4">
        <input
          type="text"
          name="name"
          className="bg-neutral-900 p-2 block w-full placeholder:text-neutral-300 border-0 outline-0 text-white rounded-md"
          placeholder="Enter contact name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="tel"
          name="phone"
          className="bg-neutral-900 p-2 block w-full placeholder:text-neutral-300 border-0 outline-0 text-white rounded-md"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <div className="flex justify-end">
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
      </div> */}

      <div className="space-y-4 bg-neutral-800 p-4 rounded-md mt-4">
        <Input
          name="name"
          placeholder="Enter contact name"
          value={name}
          onChange={setName}
        />
        <Input
          type="tel"
          name="phone"
          placeholder="Enter phone number"
          value={phone}
          onChange={setPhone}
        />
        <Input
          type="email"
          name="email"
          placeholder="Enter email address"
          value={email}
          onChange={setEmail}
        />

        <div className="flex justify-end">
          <Button
            onClick={() => {
              if (name && phone) {
                if (index > -1) {
                  setContacts((old) => {
                    const contacts = [...old];
                    contacts.splice(index, 1, { name, phone, email });
                    return contacts;
                  });
                  setName("");
                  setPhone("");
                  setEmail("");
                  setIndex(-1);
                } else {
                  setContacts([
                    ...contacts,
                    {
                      name,
                      phone,
                      email,
                    },
                  ]);
                  setName("");
                  setPhone("");
                  setEmail("");
                }
              }
            }}
          >
            {index > -1 ? "Update" : "Save"}
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <Input placeholder="Search..." value={search} onChange={setSearch} />
      </div>
      {/* <div className="mt-4 p-4">{JSON.stringify(contacts)}</div> */}
      {/* <ul className="mt-4 space-y-1 bg-neutral-800 rounded-md py-2">
        {loopedContacts.map((contact, index) => {
          return (
            <li
              key={index}
              className="flex items-center gap-4 hover:bg-neutral-900 px-2 py-1"
            >
              <div className="w-10 h-10 bg-neutral-500 rounded-full flex items-center justify-center font-bold text-neutral-900">
                {contact.name[0]}
              </div>
              <div>
                <div className="font-bold text-white">{contact.name}</div>
                <div className="text-neutral-300 text-sm">{contact.phone}</div>
              </div>
            </li>
          );
        })}
      </ul> */}

      <ul className="mt-4 bg-neutral-800 rounded-md">
        {loopedContacts.length ? (
          loopedContacts.map((contact, index) => {
            return (
              <li
                key={index}
                className="hover:bg-neutral-900 rounded-md p-2 flex gap-4 items-center"
              >
                <div className="bg-neutral-400 h-9 w-9 rounded-full flex items-center justify-center flex-none">
                  {contact.name[0]}
                </div>
                <div>
                  <div className="font-bold">{contact.name}</div>
                  <div className="text-neutral-300 text-sm">
                    {contact.phone}
                  </div>
                  <div className="text-neutral-300 text-sm">
                    {contact.email}
                  </div>
                </div>
                <div className="flex-1 flex justify-end gap-1">
                  <a
                    href={`tel:${contact.phone}`}
                    className="w-6 h-6 bg-neutral-950 rounded text-xs flex items-center justify-center"
                  >
                    📞
                  </a>
                  <button
                    className="w-6 h-6 bg-neutral-950 rounded text-xs cursor-pointer"
                    onClick={() => {
                      setName(contact.name);
                      setPhone(contact.phone);
                      setIndex(index);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="w-6 h-6 bg-neutral-950 rounded text-xs cursor-pointer"
                    onClick={() => {
                      if (confirm("Are you sure to delete?")) {
                        console.log(contact, index);
                        setContacts((old) => {
                          const contacts = [...old];
                          contacts.splice(index, 1);
                          return contacts;
                        });
                      }
                    }}
                  >
                    ❌
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <div className="text-center p-2">
            {search ? "Not Found!" : "No contacts"}
          </div>
        )}
      </ul>
    </div>
  );
}
