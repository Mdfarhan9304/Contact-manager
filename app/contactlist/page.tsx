"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  PlusCircle,
  Search,
  Download,
  Upload,
  Trash2,
  Edit,
  Mail,
  Phone,
  Building2,
  MapPin,
  LogOut,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };
 
  useEffect(() => {
    const fetchData = async () => {
      const user = localStorage.getItem("user");
      try {
        if (!user) {
          router.replace("/login");
          return;
        }
    
        setIsAuthenticated(true);

        const token = localStorage.getItem("user");
        const res = await axios.get("/api/contact", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(JSON.stringify(res.data) + " Ye rha data");
        setContacts(res.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchData();
  }, [router,  contacts]);








useEffect(() => {
  const fetchSearchResults = async () => {
    if (searchTerm.length === 0) {
    
      const token = localStorage.getItem("user");
      try {
        const res = await axios.get("/api/contact/search", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContacts(res.data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
      return;
    }

   
    setLoading(true);
    const token = localStorage.getItem("user");

    try {
      const res = await axios.get(`/api/search?q=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(res.data);
    } catch (err) {
      console.error("Error searching contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  const delayDebounceFn = setTimeout(() => {
    fetchSearchResults();
  }, 500); 
  return () => clearTimeout(delayDebounceFn); 
}, [searchTerm]);


const handleUpdateContact = (contactId: string) => async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);
  const updatedContact = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    company: formData.get("company") as string,
    address: formData.get("address") as string,
  };

  const token = localStorage.getItem("user");

  try {
    const { data } = await axios.patch(`/api/contact/${contactId}`, updatedContact, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Updated data: " + JSON.stringify(data));

    setContacts((prevContacts) =>
      prevContacts.map((contact) => (contact._id === contactId ? data : contact))
    );

    console.log("Contact updated successfully!");
  } catch (error) {
    console.error("Error updating contact:", error);
  }
};

 

 

  const handleAddContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const newContact = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      address: formData.get("address") as string,
    };

    const token = localStorage.getItem("user");

    try {
      const { data } = await axios.post("/api/contact", newContact, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Post data" + JSON.stringify(data));

      setContacts((prevContacts) => [...prevContacts, data]);
      console.log("Contact added successfully!");

      form.reset();
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Company", "Address"];
    const csvContent = [
      headers.join(","),
      ...contacts.map((contact) =>
        [
          contact.name,
          contact.email,
          contact.phone,
          contact.company,
          contact.address,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };



  const handleDeleteContact = async (contactId: string) => {
    try {
      await axios.delete(`/api/contact/${contactId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      });

      setContacts(contacts.filter((c) => c._id !== contactId));
      setDeletingContact(null);
    } catch (error: any) {
      console.error(
        "Error:",
        error.response?.data?.error || "Failed to delete contact"
      );
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    Object.values(contact).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold">Contact Manager</h1>
            <div className="flex items-center gap-2 sm:gap-4">
              <ModeToggle />
              <Button
                variant="outline"
                onClick={handleLogout}
                size={isMobileView ? "icon" : "default"}
              >
                <LogOut className="h-4 w-4" />
                {!isMobileView && <span className="ml-2">Logout</span>}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="gap-2"
                    size={isMobileView ? "sm" : "default"}
                  >
                    <PlusCircle className="h-4 w-4" />
                    {!isMobileView && "Add Contact"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Contact</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddContact} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" required />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" name="company" required />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" name="address" required />
                    </div>
                    <Button type="submit" className="w-full">
                      Add Contact
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                onClick={handleExportCSV}
                size={isMobileView ? "sm" : "default"}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                {!isMobileView && "Export"}
              </Button>

          
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
         
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {isMobileView ? (
            <div className="space-y-4">
              {filteredContacts.map((contact) => (
                <Card key={contact._id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{contact.name}</h3>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setViewingContact(contact)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingContact(contact)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeletingContact(contact)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {contact.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {contact.phone}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredContacts.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  No contacts found
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-lg border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map((contact) => (
                      <TableRow key={contact._id}>
                        <TableCell className="font-medium">
                          {contact.name}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {contact.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {contact.phone}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setViewingContact(contact)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingContact(contact)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeletingContact(contact)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredContacts.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-center text-muted-foreground"
                        >
                          No contacts found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Edit Contact Dialog */}
      <Dialog
        open={!!editingContact}
        onOpenChange={() => setEditingContact(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
          </DialogHeader>
          {editingContact && (
            <form
            onSubmit={handleUpdateContact(editingContact._id)}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  defaultValue={editingContact.name}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  defaultValue={editingContact.email}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  name="phone"
                  defaultValue={editingContact.phone}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-company">Company</Label>
                <Input
                  id="edit-company"
                  name="company"
                  defaultValue={editingContact.company}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-address">Address</Label>
                <Input
                  id="edit-address"
                  name="address"
                  defaultValue={editingContact.address}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* View Contact Dialog */}
      <Dialog
        open={!!viewingContact}
        onOpenChange={() => setViewingContact(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
          </DialogHeader>
          {viewingContact && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Name:</span>
                  {viewingContact.name}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {viewingContact.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {viewingContact.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  {viewingContact.company}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {viewingContact.address}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deletingContact}
        onOpenChange={() => setDeletingContact(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Contact</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this contact? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setDeletingContact(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                deletingContact && handleDeleteContact(deletingContact._id)
              }
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
