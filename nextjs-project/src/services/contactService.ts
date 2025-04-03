import { NewContact } from "@/models/contactModel"

export const getContacts = async (currentPage: number, itemsPerPage: number) => {
    return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/contacts?page=${currentPage}&limit=${itemsPerPage}`, {
        credentials: 'include',
        method: 'GET'
    });
}

export const getContactbyId = async (contactId: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/contacts/${contactId}`, {
        credentials: 'include',
        method: 'GET'
    });
}

export const createOrUpdateContact = async (contact: NewContact, url: string, method: string) => {
    return fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(contact)
    });
}

export const deleteContact = async (id: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/contacts/${id}`, {
        method: "DELETE",
        credentials: "include",
    });
}