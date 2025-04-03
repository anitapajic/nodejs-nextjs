"use client"
import { Content } from "@/app/content";
import  Button from "@/components/button/Button";
import { Input } from "@/components/input/Input";
import { showToast } from "@/helpers/showToast";
import { NewContact } from "@/models/contactModel";
import { createOrUpdateContact, getContactbyId } from "@/services/contactService";
import { useRouter, useSearchParams  } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";


export default function AddContactPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const contactId = searchParams.get("id");
    const [contact, setContact] = useState<NewContact>({
        name: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        if (contactId) {
            const fetchContact = async () => {
                try {
                    const response = await (await getContactbyId(contactId)).json();
                    setContact({ name: response.name, email: response.email, phone: response.phone });
                } catch (error) {
                    showToast("Error fetching contact");
                    console.error("Error fetching contact:", error);
                }
            };
            fetchContact();
        }
    }, [contactId]);
    
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const url = contactId
            ? `${process.env.NEXT_PUBLIC_DOMAIN}/contacts/${contactId}`
            : `${process.env.NEXT_PUBLIC_DOMAIN}/contacts`;

        const method = contactId ? "PUT" : "POST";

        const response = await createOrUpdateContact(contact, url, method);

        if(response.ok){
            router.push('/contacts');
        }else{
            showToast("Error submiting contact");
        }
        
    };

    return(
        <Content>
            <section className="mt-[7rem] w-[90%] md:w-[30rem] mx-auto my-[5rem] border-gray-500 bg-white/10 rounded-md p-6">
                <h2 className="pb-7 text-center text-2xl">Contact Form</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-100">Full name</label>
                        <Input 
                            id="name"
                            type="name"
                            placeholder="Enter name"
                            onChange={(e) => setContact({ ...contact, name: e.target.value })}
                            className="w-full mt-1"
                            value={contact.name}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-100">Email Address</label>
                        <Input 
                            id="email"
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => setContact({ ...contact, email: e.target.value })}
                            className="w-full mt-1"
                            value={contact.email}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-100">Phone number</label>
                        <Input 
                            id="phone"
                            type="phone"
                            placeholder="Enter phone number"
                            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                            className="w-full mt-1"
                            value={contact.phone}
                        />
                    </div>
                    <Button type="submit" onClick={handleSubmit} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300">
                        {contactId ? "Update Contact" : "Add new contact"}                    
                    </Button>
                </form>
            </section>
        </Content>
    )
}