import { Contact } from "@/models/contactModel";
import {BsFillTrashFill} from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";

interface SingleContactProps {
    contact: Contact;
    onDelete: (id: string) => void;
}

export const SingleContact: React.FC<SingleContactProps> = ({ contact, onDelete }) => {
    return (
        <tr className="bg-stone-800 text-center h-[3rem] font-semibold font-sans">
            <td className="p-2 rounded-bl-lg">{contact.name}</td>
            <td className="p-2">{contact.email}</td>
            <td className="p-2">{contact.phone}</td>
            <td className="flex items-center justify-center gap-4 text-xl mt-[1rem] rounded-br-lg">
                <Link href={`/contacts/addContact?id=${contact._id}`}>
                    <span className="hover:cursor-pointer hover:text-indigo-500">
                        <AiFillEdit />
                    </span>
                </Link>
                <span data-testid={`delete-button-${contact._id}`} className="hover:cursor-pointer hover:text-indigo-500" onClick={() => onDelete(contact._id)}>
                    <BsFillTrashFill />
                </span>
            </td>
        </tr>
    );
    
}