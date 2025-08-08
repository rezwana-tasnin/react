import { useMemo, useState } from "react";
import { Button } from "~/components/Button";

export default function Contacts() {
  //
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [index, setIndex] = useState(-1);
  const [search, setSearch] = useState("");

  //
  const [contacts, setContacts] = useState<any[]>([
    {
      name: "Zwana Tasnin",
      phone: "+8801643257731",
    },
    {
      name: "Rezwana Tasnin",
      phone: "+8801643257731",
    },
    {
      name: "RK Anik",
      phone: "+8801568015679",
    },
    {
      name: "Anik",
      phone: "+8801568015679",
    },
  ]);

  const loopedContacts = useMemo(() => {
    return contacts
      .filter((contact) => {
        return (
          contact.name.toLowerCase().includes(search.toLowerCase()) ||
          contact.phone.includes(search)
        );
      })
      .sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
  }, [search, contacts]);

  //
  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="text-xl font-bold mb-4">Contacts</div>

      {/* <div className="space-y-4 bg-rose-800 p-4 rounded-md mt-4">
        <input
          type="text"
          name="name"
          className="bg-rose-900 p-2 block w-full placeholder:text-neutral-300 border-0 outline-0 text-white rounded-md"
          placeholder="Enter contact name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="tel"
          name="phone"
          className="bg-rose-900 p-2 block w-full placeholder:text-neutral-300 border-0 outline-0 text-white rounded-md"
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

      <div className="space-y-4 bg-rose-800 p-4 rounded-md mt-4 ">
        <input
          type="text"
          name="name"
          className="bg-rose-900 p-2 placeholder:text-neutral-300 rounded-md w-full"
          placeholder="Enter contact name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="tel"
          name="phone"
          className="bg-rose-900 p-2 placeholder:text-neutral-300 rounded-md w-full"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <div className="flex justify-end">
          <Button
            onClick={() => {
              if (name && phone) {
                if (index > -1) {
                  setContacts((old) => {
                    const contacts = [...old];
                    contacts.splice(index, 1, { name, phone });
                    return contacts;
                  });
                  setName("");
                  setPhone("");
                  setIndex(-1);
                } else {
                  setContacts([
                    ...contacts,
                    {
                      name,
                      phone,
                    },
                  ]);
                  setName("");
                  setPhone("");
                }
              }
            }}
          >
            {index > -1 ? "Update" : "Save"}
          </Button>
        </div>
      </div>
      <div>
        <input
          className="w-full p-2 mt-4 rounded-md placeholder:text-neutral-300 bg-rose-800"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      {/* <div className="mt-4 p-4">{JSON.stringify(contacts)}</div> */}
      {/* <ul className="mt-4 space-y-1 bg-rose-800 rounded-md py-2">
        {loopedContacts.map((contact, index) => {
          return (
            <li
              key={index}
              className="flex items-center gap-4 hover:bg-rose-900 px-2 py-1"
            >
              <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center font-bold text-rose-900">
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

      <ul className="mt-4 bg-rose-800 rounded-md">
        {loopedContacts.map((contact, index) => {
          return (
            <li
              key={index}
              className="hover:bg-rose-900 rounded-md p-2 flex gap-4 items-center"
            >
              <div className="bg-rose-400 h-9 w-9 rounded-full flex items-center justify-center flex-none">
                {contact.name[0]}
              </div>
              <div>
                <div className="font-bold">{contact.name}</div>
                <div className="text-neutral-300 text-sm">{contact.phone}</div>
              </div>
              <div className="flex-1 flex justify-end gap-1">
                <a
                  href={`tel:${contact.phone}`}
                  className="w-6 h-6 bg-rose-950 rounded text-xs flex items-center justify-center"
                >
                  📞
                </a>
                <button
                  className="w-6 h-6 bg-rose-950 rounded text-xs cursor-pointer"
                  onClick={() => {
                    setName(contact.name);
                    setPhone(contact.phone);
                    setIndex(index);
                  }}
                >
                  ✏️
                </button>
                <button
                  className="w-6 h-6 bg-rose-950 rounded text-xs cursor-pointer"
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
        })}
      </ul>
    </div>
  );
}
