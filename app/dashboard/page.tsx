"use client";
import React from 'react'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, Search, Download, Upload, Trash2, Edit, Mail, Phone, Building2, MapPin, LogOut, Linkedin as LinkedIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  linkedInUrl?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  // Check for mobile view on mount and window resize
  React.useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/login");
  };

  const handleAddContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newContact = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      address: formData.get("address") as string,
      linkedInUrl: formData.get("linkedInUrl") as string,
    };
    setContacts([...contacts, newContact]);
    (e.target as HTMLFormElement).reset();
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Company", "Address", "LinkedIn URL"];
    const csvContent = [
      headers.join(","),
      ...contacts.map(contact => 
        [contact.name, contact.email, contact.phone, contact.company, contact.address, contact.linkedInUrl].join(",")
      )
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target?.result as string;
        const lines = csvData.split("\n").slice(1);
        const newContacts = lines.map(line => {
          const [name, email, phone, company, address, linkedInUrl] = line.split(",");
          return { id: Date.now().toString(), name, email, phone, company, address, linkedInUrl };
        });
        setContacts([...contacts, ...newContacts]);
      };
      reader.readAsText(file);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    Object.values(contact).some(value =>
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
              <Button variant="outline" onClick={handleLogout} size={isMobileView ? "icon" : "default"}>
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
                  <Button className="gap-2" size={isMobileView ? "sm" : "default"}>
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
                    <div>
                      <Label htmlFor="linkedInUrl">LinkedIn Profile URL</Label>
                      <Input id="linkedInUrl" name="linkedInUrl" type="url" />
                    </div>
                    <Button type="submit" className="w-full">Add Contact</Button>
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

              <div className="relative">
                <Input
                  type="file"
                  accept=".csv"
                  onChange={handleImportCSV}
                  className="hidden"
                  id="csvInput"
                />
                <Button 
                  variant="outline" 
                  onClick={() => document.getElementById("csvInput")?.click()}
                  size={isMobileView ? "sm" : "default"}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {!isMobileView && "Import"}
                </Button>
              </div>
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
                <Card key={contact.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{contact.name}</h3>
                      <div className="flex gap-1">
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
                          onClick={() => setContacts(contacts.filter(c => c.id !== contact.id))}
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
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        {contact.company}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {contact.address}
                      </div>
                      {contact.linkedInUrl && (
                        <a
                          href={contact.linkedInUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-2"
                        >
                          <LinkedIn className="h-4 w-4" />
                          LinkedIn Profile
                        </a>
                      )}
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
                      <TableHead>Company</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>LinkedIn</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">{contact.name}</TableCell>
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
                            <Building2 className="h-4 w-4" />
                            {contact.company}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {contact.address}
                          </div>
                        </TableCell>
                        <TableCell>
                          {contact.linkedInUrl && (
                            <a
                              href={contact.linkedInUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center gap-2"
                            >
                              <LinkedIn className="h-4 w-4" />
                              Profile
                            </a>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
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
                              onClick={() => setContacts(contacts.filter(c => c.id !== contact.id))}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredContacts.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground">
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

      <Dialog open={!!editingContact} onOpenChange={() => setEditingContact(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
          </DialogHeader>
          {editingContact && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const updatedContact = {
                  ...editingContact,
                  name: formData.get("name") as string,
                  email: formData.get("email") as string,
                  phone: formData.get("phone") as string,
                  company: formData.get("company") as string,
                  address: formData.get("address") as string,
                  linkedInUrl: formData.get("linkedInUrl") as string,
                };
                setContacts(contacts.map(c => c.id === editingContact.id ? updatedContact : c));
                setEditingContact(null);
              }}
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
              <div>
                <Label htmlFor="edit-linkedInUrl">LinkedIn Profile URL</Label>
                <Input
                  id="edit-linkedInUrl"
                  name="linkedInUrl"
                  type="url"
                  defaultValue={editingContact.linkedInUrl}
                />
              </div>
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}