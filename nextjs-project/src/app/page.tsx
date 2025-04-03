"use client"
import Link from "next/link";
import { Content } from "./content";
import { Card } from "@/components/card/Card";
import { useUser } from "@/contexts/UserContext";

export default function Home() {
  const {user} = useUser();

      return (
          <Content>
            <div className="font-sans bg-transparent">
              <section className="bg-indigo-600 text-white text-center py-15 sm:py-28 md:py-24 lg:py-28">
                <div className="container mx-auto">
                  <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mt-5 sm:mb-6">Welcome to My Contacts App</h1>
                  <p className="text-base sm:text-lg mb-6 sm:mb-8">Manage and organize your contacts easily with My Contacts.</p>

                  <Link href={user ? "/contacts" : "/signup"}>
                      <span className="bg-white text-indigo-600 py-3 px-8 rounded-lg text-md sm:text-xl hover:bg-gray-300">
                        Get Started
                      </span>
                  </Link>
                </div>
              </section>
              
              <section className="text-center py-16 sm:py-20 md:py-20 lg:py-20">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-8 sm:mb-12">Key Features</h2>
                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                  <Card className="bg-zinc-800 w-72 sm:w-80 md:w-96">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4">Easy Contact Management</h3>
                      <p className="text-gray-100">Store and organize all your contacts in one place.</p>
                    </div>
                  </Card>
                  <Card className="bg-zinc-800 w-72 sm:w-80 md:w-96">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4">Secure Sync</h3>
                      <p className="text-gray-100">Sync your contacts across multiple devices securely.</p>
                    </div>
                  </Card>
                  <Card className="bg-zinc-800 w-72 sm:w-80 md:w-96">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4">Search & Filter</h3>
                      <p className="text-gray-100">Find contacts quickly with powerful search and filtering options.</p>
                    </div>
                  </Card>
                </div>
              </section>
            </div>
          </Content>   
      );
}
