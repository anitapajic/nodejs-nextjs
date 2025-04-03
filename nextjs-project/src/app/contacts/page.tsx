"use client"
import Link from "next/link";
import { Content } from "../content";
import { useEffect, useState } from "react";
import { Contact } from "@/models/contactModel";
import { SingleContact } from "@/components/contact/SingleContact";
import { PiArrowFatLineRightBold  , PiArrowFatLineLeftBold   } from "react-icons/pi";
import { RiContactsLine } from "react-icons/ri";
import { MdOutlinePersonAdd  } from "react-icons/md";
import { showToast } from "@/helpers/showToast";
import { deleteContact, getContacts } from "@/services/contactService";

export default function ContactsPage(){
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const itemsPerPage = 2;

    useEffect(() => {
        const fetchContacts = async () => {
            try{
                const response = await (await getContacts(currentPage, itemsPerPage)).json();
                setContacts(response.contacts);
                setTotalPages(response.totalPages);
            } catch (e) {
                showToast("Error fetching contacts");
                console.log("Error fetching contacts: ", e);
            }
        };
        fetchContacts();
    }, [currentPage]);

    const handleDeleteContact = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this contact?")) return;
        try {
            const response = await deleteContact(id);

            if (response.ok) {
                setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
                if (contacts.length === 1 && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                }
            } else {
                showToast("Failed to delete contact");
                console.error("Failed to delete contact");
            }
        } catch (error) {
            showToast("Error deleting contact");
            console.error("Error deleting contact:", error);
        }
    };

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <Content>
            <div className="w-[90%] lg:w-[70%] mx-auto my-[5rem]">
                <section className="mt-[2rem] overflow-hidden rounded-lg shadow-lg">
                    <section className="flex items-center text-center px-4">
                        <div className="flex-1 flex justify-center items-center">
                            <h1 className="ml-[2rem] font-sans font-semibold text-3xl py-4 uppercase text-white">
                                My Contact List
                            </h1>
                            <RiContactsLine className="text-3xl ml-3" />
                        </div>

                        <Link href="/contacts/addContact">
                            <MdOutlinePersonAdd className="text-white text-5xl cursor-pointer  hover:scale-110 transition-transform duration-200 hover:text-indigo-400 p-2 rounded-md" />
                        </Link>
                    </section>
                    <table className="bg-transparent w-full mt-5 rounded-lg overflow-hidden font-sans">
                        <thead className="bg-transparent">
                            <tr className="h-[3rem]">
                                <th className="px-4 py-2 bg-indigo-500/80 text-white rounded-l-lg shadow-inner">NAME</th>
                                <th className="px-4 py-2 bg-indigo-500/80 text-white  shadow-inner">EMAIL</th>
                                <th className="px-4 py-2 bg-indigo-500/80 text-white  shadow-inner">PHONE NUMBER</th>
                                <th className="px-4 py-2 bg-indigo-500/80 text-white rounded-r-lg shadow-inner">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.length > 0 ? (
                                contacts.map((item) => (
                                    <SingleContact key={item._id} contact={item} onDelete={handleDeleteContact} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="font-sans font-semibold text-xl text-center py-4">
                                        No contacts available.
                                    </td>
                                </tr>
                            )}
                       </tbody>   
                    </table>
                </section>
             
                {/* Pagination Controls */}
                <section className="flex justify-center mt-[5rem] items-center text-center">
                    <div>
                        {totalPages > 1 && (
                            <button
                            className="font-sans text-2xl text-white font-bold cursor-pointer hover:text-indigo-400 hover:scale-110 transition-transform duration-200"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            data-testid="previous"
                            >
                                <PiArrowFatLineLeftBold/>
                            </button>
                        )}
                        {contacts.length > 0 && (
                            <span className="font-sans mx-6 text-md">Page {currentPage} of {totalPages}</span>
                        )}
                        {totalPages > 1 && (
                            <button
                                className="text-2xl font-sans text-white font-bold hover:text-indigo-400 hover:scale-110 transition-transform duration-200"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                data-testid="next"
                            >
                                <PiArrowFatLineRightBold/>
                            </button>
                        )}
                    </div>        
                </section>                
            </div>
        </Content>
    );   
}